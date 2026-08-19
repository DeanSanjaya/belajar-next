"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Compass, Rocket, Star, Zap, ShieldCheck, Network, Cpu, Database, ClipboardCheck, Share2, Sparkles } from "lucide-react";
import Link from "next/link";

const juniorModules = [
  {
    title: "Routing Fundamentals",
    description: "Learn how Next.js handles navigation, dynamic routes, and nested layouts.",
    icon: Compass,
    href: "/routing",
    color: "bg-blue-500",
    delay: 0.1,
  },
  {
    title: "Components & RSC",
    description: "Understand the difference between Server and Client components.",
    icon: Code2,
    href: "/components",
    color: "bg-purple-500",
    delay: 0.2,
  },
  {
    title: "Data Fetching",
    description: "Master Server Actions and efficient data patterns in React 19.",
    icon: Rocket,
    href: "/data-fetching",
    color: "bg-orange-500",
    delay: 0.3,
  },
  {
    title: "Forms & Zod",
    description: "Type-safe form handling and validation with Zod.",
    icon: ClipboardCheck,
    href: "/forms-zod",
    color: "bg-pink-500",
    delay: 0.35,
  },
];

const seniorModules = [
  {
    title: "Parallel & Intercepting Routes",
    description: "Advanced UI patterns like modals with shared layouts and dashboard slots.",
    icon: Network,
    href: "/advanced-routing",
    color: "bg-emerald-500",
    delay: 0.4,
  },
  {
    title: "Middleware & Auth",
    description: "Securing routes, handling cookies, and edge-side logic.",
    icon: ShieldCheck,
    href: "/middleware-auth",
    color: "bg-indigo-500",
    delay: 0.5,
  },
  {
    title: "Caching & Revalidation",
    description: "Deep dive into Full Route Cache, Data Cache, and ISR.",
    icon: Cpu,
    href: "/caching",
    color: "bg-rose-500",
    delay: 0.6,
  },
  {
    title: "Optimization & Tuning",
    description: "Master Image, Font, and SEO optimization for 100/100 Lighthouse score.",
    icon: Zap,
    href: "/optimization",
    color: "bg-yellow-500",
    delay: 0.7,
  },
  {
    title: "Database with Prisma",
    description: "Setting up Prisma, migrations, and type-safe database queries.",
    icon: Database,
    href: "/database",
    color: "bg-cyan-500",
    delay: 0.8,
  },
  {
    title: "Supabase Ecosystem",
    description: "Leveraging Supabase for Auth, Realtime DB, and Storage.",
    icon: Share2,
    href: "/supabase",
    color: "bg-green-600",
    delay: 0.9,
  },
];

const masteryModules = [
  {
    title: "Optimistic Updates",
    description: "Learn how to build instant-response UIs with the useOptimistic hook.",
    icon: Sparkles,
    href: "/optimistic-updates",
    color: "bg-amber-500",
    delay: 1.0,
  },
];

export default function Home() {
  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto w-full">
      <header className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Star
              size={12}
              className="fill-current"
            />
            <span>Next.js Mastery Path</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Kurikulum Belajar <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-muted-foreground">Next.js 15+</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">Pilih levelmu dan mulailah petualangan menguasai framework web paling canggih saat ini.</p>
        </motion.div>
      </header>

      {/* Junior Section */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">Level 1: Junior Fundamentals</h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {juniorModules.map((module) => (
            <ModuleCard
              key={module.title}
              {...module}
            />
          ))}
        </div>
      </section>

      {/* Senior Section */}
      <section className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-sm font-bold text-indigo-500/80 uppercase tracking-[0.2em]">Level 2: Senior Patterns</h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seniorModules.map((module) => (
            <ModuleCard
              key={module.title}
              {...module}
            />
          ))}
        </div>
      </section>

      {/* Mastery Section */}
      <section className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-sm font-bold text-amber-500/80 uppercase tracking-[0.2em]">Level 3: Expert Mastery</h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {masteryModules.map((module) => (
            <ModuleCard
              key={module.title}
              {...module}
            />
          ))}
        </div>
      </section>

      <footer className="mt-20 pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 text-muted-foreground text-sm">
        <p>© 2026 LearnNext Portal. Ayo belajar bersama!</p>
      </footer>
    </div>
  );
}

interface ModuleProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
  delay: number;
}

function ModuleCard({ title, description, icon: Icon, href, color, delay }: ModuleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <Link
        href={href}
        className="group block p-6 rounded-2xl border bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden h-full"
      >
        <div className={`absolute top-0 right-0 w-20 h-20 ${color} opacity-5 blur-3xl -mr-8 -mt-8 group-hover:opacity-10 transition-opacity`} />

        <div className="flex items-start justify-between mb-6">
          <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white shadow-lg`}>
            <Icon size={20} />
          </div>
          <ArrowRight
            size={16}
            className="text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1"
          />
        </div>

        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight">{title}</h3>
        <p className="text-muted-foreground text-xs leading-relaxed mb-6">{description}</p>

        <div className="mt-auto flex items-center gap-2 text-[10px] font-semibold text-primary/70 uppercase tracking-widest">
          <span>Explore</span>
          <div className="h-px flex-1 bg-border group-hover:bg-primary/20 transition-colors" />
        </div>
      </Link>
    </motion.div>
  );
}
