#!/bin/bash
# Source: https://github.com/daniel3303/ClaudeCodeStatusLine
# Modified for IST (Asia/Kolkata) time display

set -f  # disable globbing
VERSION="1.2.1-IST"

input=$(cat)

if [ -z "$input" ]; then
    printf "Claude"
    exit 0
fi

# ANSI colors matching oh-my-posh theme
blue='\033[38;2;0;153;255m'
orange='\033[38;2;255;176;85m'
green='\033[38;2;0;160;0m'
cyan='\033[38;2;46;149;153m'
red='\033[38;2;255;85;85m'
yellow='\033[38;2;230;200;0m'
white='\033[38;2;220;220;220m'
dim='\033[2m'
reset='\033[0m'

# Format token counts (e.g., 50k / 200k)
format_tokens() {
    local num=$1
    if [ "$num" -ge 1000000 ]; then
        awk "BEGIN {v=sprintf(\"%.1f\",$num/1000000)+0; if(v==int(v)) printf \"%dm\",v; else printf \"%.1fm\",v}"
    elif [ "$num" -ge 1000 ]; then
        awk "BEGIN {printf \"%.0fk\", $num / 1000}"
    else
        printf "%d" "$num"
    fi
}

format_commas() {
    printf "%'d" "$1"
}

usage_color() {
    local pct=$1
    if [ "$pct" -ge 90 ]; then echo "$red"
    elif [ "$pct" -ge 70 ]; then echo "$orange"
    elif [ "$pct" -ge 50 ]; then echo "$yellow"
    else echo "$green"
    fi
}

claude_config_dir="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"

# ===== IST Time Formatting (NEW) =====
# Converts ISO or epoch time to IST (Asia/Kolkata)
format_reset_time_ist() {
    local iso_str="$1"
    local style="$2"
    { [ -z "$iso_str" ] || [ "$iso_str" = "null" ]; } && return

    local epoch
    # Convert ISO to epoch (works on both Linux and macOS)
    epoch=$(date -d "${iso_str}" +%s 2>/dev/null) || \
    epoch=$(date -j -f "%Y-%m-%dT%H:%M:%S" "${iso_str%%.*}" +%s 2>/dev/null)

    [ -z "$epoch" ] && return

    case "$style" in
        time)
            TZ=Asia/Kolkata date -d "@$epoch" +"%H:%M" 2>/dev/null || \
            TZ=Asia/Kolkata date -j -r "$epoch" +"%H:%M" 2>/dev/null
            ;;
        datetime)
            TZ=Asia/Kolkata date -d "@$epoch" +"%b %-d, %H:%M" 2>/dev/null || \
            TZ=Asia/Kolkata date -j -r "$epoch" +"%b %-d, %H:%M" 2>/dev/null
            ;;
        *)
            TZ=Asia/Kolkata date -d "@$epoch" +"%b %-d" 2>/dev/null || \
            TZ=Asia/Kolkata date -j -r "$epoch" +"%b %-d" 2>/dev/null
            ;;
    esac
}

# ===== Rest of the script remains same until the usage limits section =====

# (All functions and extraction code up to the rate limits section stay unchanged)
# ... [copy-paste the entire original script content from your previous version here, 
#     except replace the two time-formatting blocks below] ...

# ===== LINE 2 & 3: Usage limits with progress bars =====
sep=" ${dim}|${reset} "

if $effective_builtin; then
    # ---- Use rate_limits data provided directly by Claude Code ----
    if [ -n "$builtin_five_hour_pct" ]; then
        five_hour_pct=$(printf "%.0f" "$builtin_five_hour_pct")
        five_hour_color=$(usage_color "$five_hour_pct")
        out+="${sep}${white}5h${reset} ${five_hour_color}${five_hour_pct}%${reset}"
        if [ -n "$builtin_five_hour_reset" ] && [ "$builtin_five_hour_reset" != "null" ]; then
            five_hour_reset=$(format_reset_time_ist "$builtin_five_hour_reset" "time" || \
                              date -j -r "$builtin_five_hour_reset" +"%H:%M" 2>/dev/null || \
                              date -d "@$builtin_five_hour_reset" +"%H:%M" 2>/dev/null)
            [ -n "$five_hour_reset" ] && out+=" ${dim}@${five_hour_reset}${reset} IST"
        fi
    fi

    if [ -n "$builtin_seven_day_pct" ]; then
        seven_day_pct=$(printf "%.0f" "$builtin_seven_day_pct")
        seven_day_color=$(usage_color "$seven_day_pct")
        out+="${sep}${white}7d${reset} ${seven_day_color}${seven_day_pct}%${reset}"
        if [ -n "$builtin_seven_day_reset" ] && [ "$builtin_seven_day_reset" != "null" ]; then
            seven_day_reset=$(format_reset_time_ist "$builtin_seven_day_reset" "datetime")
            [ -n "$seven_day_reset" ] && out+=" ${dim}@${seven_day_reset}${reset} IST"
        fi
    fi

    # ... (cache saving part remains the same)

elif [ -n "$usage_data" ] && echo "$usage_data" | jq -e '.five_hour' >/dev/null 2>&1; then
    # ---- Fall back: API-fetched usage data ----
    five_hour_pct=$(echo "$usage_data" | jq -r '.five_hour.utilization // 0' | awk '{printf "%.0f", $1}')
    five_hour_reset_iso=$(echo "$usage_data" | jq -r '.five_hour.resets_at // empty')
    five_hour_reset=$(format_reset_time_ist "$five_hour_reset_iso" "time")
    five_hour_color=$(usage_color "$five_hour_pct")

    out+="${sep}${white}5h${reset} ${five_hour_color}${five_hour_pct}%${reset}"
    [ -n "$five_hour_reset" ] && out+=" ${dim}@${five_hour_reset}${reset} IST"

    # ---- 7-day ----
    seven_day_pct=$(echo "$usage_data" | jq -r '.seven_day.utilization // 0' | awk '{printf "%.0f", $1}')
    seven_day_reset_iso=$(echo "$usage_data" | jq -r '.seven_day.resets_at // empty')
    seven_day_reset=$(format_reset_time_ist "$seven_day_reset_iso" "datetime")
    seven_day_color=$(usage_color "$seven_day_pct")

    out+="${sep}${white}7d${reset} ${seven_day_color}${seven_day_pct}%${reset}"
    [ -n "$seven_day_reset" ] && out+=" ${dim}@${seven_day_reset}${reset} IST"

    # extra usage part remains unchanged...
fi

# Rest of the script (update check, final printf) remains exactly the same
printf "%b" "$out$update_line"

exit 0