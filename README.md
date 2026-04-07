# mahadevaiahrashmi.github.io

Personal portfolio website for **Rashmi Mahadevaiah** — AI/ML Engineer & Product Leader.

**Live:** https://mahadevaiahrashmi.github.io/

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS v4 (Anthropic-inspired theme)
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Hosting:** GitHub Pages (deployed via GitHub Actions)

## Preview Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open in browser
open http://localhost:3000
```

## Build for Production

```bash
npm run build
```

Output is written to `dist/`. This is what gets deployed to GitHub Pages.

## Deploy

Deployment is automatic — push to `main` and GitHub Actions builds and deploys to GitHub Pages.

To manually verify the build before pushing:

```bash
npm run build
npm run preview
```

## Project Structure

```
├── index.html          # Entry point (includes JSON-LD structured data)
├── src/
│   ├── App.tsx         # Main app component (all sections)
│   ├── main.tsx        # React entry point
│   └── index.css       # Global styles + Tailwind config
├── public/
│   └── resume.pdf      # Downloadable resume
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Pages deployment workflow
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## Sections

- **Hero** — Professional summary with ATS-optimized keywords
- **Experience** — Timeline with quantified impact metrics and linked company websites
- **Education** — IIT Madras, B.Tech Electrical Engineering
- **Technical Skills** — Categorized: AI/ML, Languages & Tools, Domain & Strategy
- **Interests** — Yoga, Running, Meditation, Trekking
- **Contact** — Email, LinkedIn, GitHub, Twitter, Instagram

## Branches

- **`main`** — Active working branch (deployed to GitHub Pages)
- **`v1`** — Backup of the original website before enhancements
