// agent-notes: { ctx: "RichFeyn Smart Jar blog post content", deps: [], state: active, last: "sato@2026-04-18", key: ["extracted from BlogPost.tsx for #29 split"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function RichFeynPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        RichFeyn: Building the Smartest Kitchen
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        Automating the repetitive to make room for what matters.
      </p>

      <div className="my-12">
        <video
          controls
          className="w-full rounded-2xl shadow-lg border border-anthropic-text/10"
        >
          <source src="/blog-assets/richfeyn/Richfeyn_demo_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="text-sm opacity-50 mt-4 text-center italic">A quick demonstration of the RichFeyn Smart Jar ecosystem.</p>
      </div>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        In the fast-paced world of modern living, time is the most precious commodity. Yet, we still spend hours every month on the most repetitive of tasks: checking kitchen supplies, writing shopping lists, and hopping between multiple delivery apps.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        <strong>RichFeyn</strong> was founded with a single, powerful mission: to redefine what's possible by streamlining and automating these daily routines. Our flagship product, the <strong>Smart Jar</strong>, is the first step toward a truly autonomous kitchen.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Never Run Out Again
      </h2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        The RichFeyn Smart Jar isn't just a container; it's an intelligent inventory management system. By combining custom IoT hardware with computer vision and natural language processing, we created a device that knows exactly how much you have left and knows exactly when to get more.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-12">
        <div className="p-6 bg-anthropic-text/5 border border-anthropic-text/10 rounded-xl">
          <h3 className="font-serif text-xl mb-2">Save Time</h3>
          <p className="opacity-80">No more manual inventory checks or list-making. The system handles the "what" and "when" of your kitchen supplies.</p>
        </div>
        <div className="p-6 bg-anthropic-text/5 border border-anthropic-text/10 rounded-xl">
          <h3 className="font-serif text-xl mb-2">Zero Stress</h3>
          <p className="opacity-80">Just-in-time delivery ensures your staples arrive exactly when you need them, not when you've already run out mid-recipe.</p>
        </div>
        <div className="p-6 bg-anthropic-text/5 border border-anthropic-text/10 rounded-xl">
          <h3 className="font-serif text-xl mb-2">One-Time Setup</h3>
          <p className="opacity-80">Configure your preferred retailers and time slots once, then let the automation take over.</p>
        </div>
      </div>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        The Technology Behind the Jar
      </h2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Building a "set and forget" experience required a sophisticated tech stack. We utilized <strong>Computer Vision</strong> to accurately track inventory levels without requiring user input. Our backend uses <strong>NLP</strong> to process restocking prompts and interface with various grocery retailers autonomously.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Whether it's transforming phone camera images into professional visuals for SMEs or building cross-platform mobile apps with Python and React Native to automate household orders, RichFeyn has always been about applying cutting-edge AI to real-world problems.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        See It In Action
      </h2>
      
      <div className="my-12">
        <img
          src="/blog-assets/richfeyn.png"
          alt="RichFeyn Smart Jar"
          className="w-full rounded-2xl shadow-xl border border-anthropic-text/10"
        />
        <p className="text-sm opacity-50 mt-4 text-center italic">The RichFeyn Smart Jar: Your kitchen, automated.</p>
      </div>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        The Future of Living
      </h2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        RichFeyn is more than a smart jar company. It's a partner in simplifying and enhancing everyday life. We believe that by automating the mundane, we empower people to thrive in a fast-paced world and focus on what truly matters.
      </p>
    </>
  );
}
