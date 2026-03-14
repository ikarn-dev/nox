import { Hero } from "@/components/ui/hero";
import dynamic from "next/dynamic";
import { Code2, Sparkles, Rocket, Zap } from "lucide-react";

const BentoGrid = dynamic(
  () => import("@/components/bento/bento-grid").then((mod) => mod.BentoGrid),
  { ssr: true }
);
const BentoCard = dynamic(
  () => import("@/components/bento/bento-grid").then((mod) => mod.BentoCard),
  { ssr: true }
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-24 bg-black">
      {/* Hero Section */}
      <Hero />

      {/* Bento Grid Section */}
      <section className="w-full relative py-24 content-auto">
        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container mx-auto px-4 mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">
            Supercharged Features
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Leverage the full power of Vercel Agent Skills, Next.js 16, and
            tailored composition patterns to build lightning-fast web
            experiences.
          </p>
        </div>

        <BentoGrid>
          <BentoCard
            title="Next.js 16 Ready"
            description="App Router enabled with default static generation and advanced caching."
            icon={<Sparkles className="w-5 h-5 text-white" />}
            headerIcon="/next.svg"
            className="md:col-span-2"
            delay={0.1}
          />
          <BentoCard
            title="Awwwards Grade"
            description="Custom Framer Motion variants, noise backgrounds, and glassmorphism UI."
            icon={<Zap className="w-5 h-5 text-white" />}
            delay={0.2}
          />
          <BentoCard
            title="Vercel Edge"
            description="Global Edge network deployment, automatic WebP optimization."
            icon={<Rocket className="w-5 h-5 text-white" />}
            headerIcon="/vercel.svg"
            delay={0.3}
          />
          <BentoCard
            title="Type-Safe Code"
            description="Strict TypeScript configuration, modular component structure based on building-components skill."
            icon={<Code2 className="w-5 h-5 text-white" />}
            headerIcon="/file.svg"
            className="md:col-span-2"
            delay={0.4}
          />
        </BentoGrid>
      </section>
    </main>
  );
}
