"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/code-block";
import { Info, AlertCircle, CheckCircle2, ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RoutingLesson() {
  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto w-full">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">Routing Fundamentals</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Next.js uses a file-system based router where folders are used to define routes.
        </p>

        <section className="space-y-6">
          <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex gap-4">
            <Info className="text-blue-500 shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-blue-500 mb-1">Key Concept: App Router</h3>
              <p className="text-sm text-muted-foreground">
                In the `app` directory, every folder represents a route segment that maps to a URL segment.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">1. Basic Routes</h2>
          <p className="text-muted-foreground">
            To create a route, simply create a folder and add a `page.tsx` file inside it.
          </p>
          
          <CodeBlock 
            filename="app/about/page.tsx"
            language="tsx"
            code={`export default function AboutPage() {
  return <h1>About Us</h1>;
}`}
          />

          <h2 className="text-2xl font-bold mt-12 mb-4">2. Nested Routes</h2>
          <p className="text-muted-foreground">
            You can nest folders to create nested routes. For example, `app/dashboard/settings/page.tsx` will be accessible at `/dashboard/settings`.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="p-4 rounded-xl border bg-card">
              <span className="text-xs font-bold text-muted-foreground uppercase">Folder Structure</span>
              <pre className="mt-2 text-sm font-mono">
                app/<br />
                ├── dashboard/<br />
                │   ├── settings/<br />
                │   │   └── page.tsx<br />
                │   └── page.tsx<br />
                └── page.tsx
              </pre>
            </div>
            <div className="p-4 rounded-xl border bg-card">
              <span className="text-xs font-bold text-muted-foreground uppercase">URL Result</span>
              <ul className="mt-2 text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-500" />
                  <code>/</code>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-500" />
                  <code>/dashboard</code>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-500" />
                  <code>/dashboard/settings</code>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex gap-4">
            <AlertCircle className="text-amber-500 shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-amber-500 mb-1">Tantangan Untukmu!</h3>
              <p className="text-sm text-muted-foreground">
                Coba buat folder baru bernama `blog` di dalam direktori `app`, lalu buat file `page.tsx` di dalamnya. 
                Lihat apakah kamu bisa mengaksesnya di browser!
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Interactive Route Explorer</h2>
          <RouteExplorer />
        </section>
      </motion.div>
    </div>
  );
}

function RouteExplorer() {
  const [activePath, setActivePath] = useState("/");
  
  // structure is just for visual demo in lesson

  return (
    <div className="border rounded-2xl overflow-hidden bg-card">
      <div className="bg-muted/50 p-4 border-b flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/20" />
          <div className="w-3 h-3 rounded-full bg-amber-500/20" />
          <div className="w-3 h-3 rounded-full bg-green-500/20" />
        </div>
        <div className="flex-1 ml-4 bg-background border rounded px-3 py-1 text-xs font-mono text-muted-foreground">
          localhost:3000{activePath}
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-sm font-bold mb-4 text-muted-foreground uppercase tracking-widest">File Structure</h4>
          <div className="space-y-1 font-mono text-sm">
            <div 
              className={`p-2 rounded cursor-pointer transition-colors ${activePath === "/" ? "bg-primary/10 text-primary" : "hover:bg-accent"}`}
              onClick={() => setActivePath("/")}
            >
              📂 app/
            </div>
            <div className="ml-4 border-l pl-4 space-y-1">
              <div 
                className={`p-2 rounded cursor-pointer transition-colors ${activePath === "/dashboard" ? "bg-primary/10 text-primary" : "hover:bg-accent"}`}
                onClick={() => setActivePath("/dashboard")}
              >
                📂 dashboard/
              </div>
              <div className="ml-4 border-l pl-4 space-y-1">
                <div 
                  className={`p-2 rounded cursor-pointer transition-colors ${activePath === "/dashboard/settings" ? "bg-primary/10 text-primary" : "hover:bg-accent"}`}
                  onClick={() => setActivePath("/dashboard/settings")}
                >
                  📂 settings/
                </div>
                <div className="ml-4 text-muted-foreground/50">
                  📄 page.tsx
                </div>
              </div>
              <div className="ml-4 text-muted-foreground/50">
                📄 page.tsx
              </div>
            </div>
            <div className="ml-4 text-muted-foreground/50">
              📄 page.tsx
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-center p-8 bg-muted/30 rounded-xl border-2 border-dashed border-border">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
            <Compass size={32} />
          </div>
          <h4 className="font-bold mb-2">You are viewing:</h4>
          <code className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm mb-4">
            {activePath === "/" ? "Home Page" : activePath.split("/").pop()?.toUpperCase() + " Page"}
          </code>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Click on the folders in the structure to see how the URL changes in the address bar above.
          </p>
        </div>
      </div>
    </div>
  );
}


