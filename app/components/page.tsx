"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/code-block";
import {
  Layers,
  ArrowLeft,
  Cpu,
  MousePointer2,
  CheckCircle2,
  XCircle,
  Lightbulb
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ComponentsLesson() {
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
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-4">
          <Layers className="text-purple-500" />
          Components & RSC
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Memahami perbedaan mendalam antara Server Components dan Client Components di era App Router.
        </p>

        <section className="space-y-12">
          {/* Section 1: Introduction to RSC */}
          <div>
            <h2 className="text-2xl font-bold mb-4">1. React Server Components (RSC)</h2>
            <p className="text-muted-foreground mb-6">
              Secara default, semua komponen di dalam direktori `app` adalah **Server Components**. 
              Mereka dirender di server dan mengirimkan HTML minimal ke client tanpa beban JavaScript tambahan.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                <div className="flex items-center gap-2 text-green-500 mb-3">
                  <CheckCircle2 size={18} />
                  <span className="font-bold">Gunakan Server Components untuk:</span>
                </div>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Mengambil data (Data fetching) langsung dari database.</li>
                  <li>• Menyimpan data sensitif (API keys, tokens).</li>
                  <li>• Menjaga bundle JavaScript client tetap kecil.</li>
                  <li>• SEO yang lebih baik dan loading cepat.</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                <div className="flex items-center gap-2 text-red-500 mb-3">
                  <XCircle size={18} />
                  <span className="font-bold">Tidak Bisa Digunakan untuk:</span>
                </div>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Interaktivitas (onClick, onChange, dll).</li>
                  <li>• State management (useState, useReducer).</li>
                  <li>• Browser APIs (window, localStorage).</li>
                  <li>• Lifecycle effects (useEffect).</li>
                </ul>
              </div>
            </div>

            <CodeBlock 
              filename="app/components/ServerComponent.tsx"
              language="tsx"
              code={`// Ini adalah Server Component secara default
export default async function MyServerComponent() {
  const data = await fetch('https://api.example.com/data');
  const items = await data.json();

  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}`}
            />
          </div>

          {/* Section 2: Client Components */}
          <div>
            <h2 className="text-2xl font-bold mb-4">2. Client Components</h2>
            <p className="text-muted-foreground mb-6">
              Gunakan direktif <code>&quot;use client&quot;</code> di baris paling atas file untuk menandai komponen sebagai Client Component. 
              Ini memungkinkan Anda menggunakan hooks dan event listeners.
            </p>

            <CodeBlock 
              filename="components/Counter.tsx"
              language="tsx"
              code={`"use client"; // Wajib ditambahkan di paling atas

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count is: {count}
    </button>
  );
}`}
            />
          </div>

          {/* Section 3: Interactive Demo */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Interactive Demo: The Boundary</h2>
            <p className="text-muted-foreground mb-8">
              Coba berinteraksi dengan simulasi di bawah ini untuk melihat bagaimana data mengalir antara Server dan Client.
            </p>
            <ComponentBoundaryDemo />
          </div>

          <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/20 flex gap-4">
            <Lightbulb className="text-purple-500 shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-purple-500 mb-1">Tips Pro: Leaf Components</h3>
              <p className="text-sm text-muted-foreground">
                Usahakan untuk membuat Client Components se-kecil mungkin dan taruh di bagian paling &quot;ujung&quot; (leaf) 
                dari pohon komponen Anda agar sebagian besar aplikasi tetap dirender di server.
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

function ComponentBoundaryDemo() {
  const [clientCount, setClientCount] = useState(0);
  
  return (
    <div className="border rounded-3xl overflow-hidden bg-card shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Server Side Simulation */}
        <div className="p-8 border-b md:border-b-0 md:border-r bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="text-primary" size={20} />
            <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-50">Server Environment</span>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white dark:bg-black border shadow-sm">
              <h4 className="font-bold text-sm mb-2">📦 Server Component</h4>
              <p className="text-xs text-muted-foreground mb-4">
                &quot;Saya mengambil data dari database dan merendernya menjadi HTML statis.&quot;
              </p>
              <div className="p-3 rounded-lg bg-muted text-[10px] font-mono">
                &lt;div&gt;Static Data from DB&lt;/div&gt;
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="h-8 w-px bg-gradient-to-b from-primary to-transparent" />
            </div>
            
            <div className="text-center">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Passing Props down...</span>
            </div>
          </div>
        </div>

        {/* Client Side Simulation */}
        <div className="p-8 bg-white dark:bg-black">
          <div className="flex items-center gap-2 mb-6">
            <MousePointer2 className="text-purple-500" size={20} />
            <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-50">Client Environment</span>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl border-2 border-purple-500/30 bg-purple-500/5 shadow-lg shadow-purple-500/5">
              <h4 className="font-bold text-sm mb-2 text-purple-500 flex items-center gap-2">
                🖱️ Client Component
                <span className="px-1.5 py-0.5 rounded bg-purple-500 text-[8px] text-white">&quot;use client&quot;</span>
              </h4>
              <p className="text-xs text-muted-foreground mb-4">
                &quot;Saya bisa menangani klik dan menyimpan state di browser!&quot;
              </p>
              
              <div className="flex flex-col items-center gap-4">
                <button 
                  onClick={() => setClientCount(c => c + 1)}
                  className="w-full py-3 px-4 rounded-xl bg-purple-500 text-white font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-purple-500/25"
                >
                  Click Me: {clientCount}
                </button>
                <p className="text-[10px] text-muted-foreground italic">
                  React State updated in browser memory
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-muted/20 border-t text-center">
        <p className="text-xs text-muted-foreground">
          Visualisasi: Server mengirimkan <strong>HTML</strong> + <strong>Boundary Marker</strong>. Client kemudian melakukan <strong>Hydration</strong> untuk membuat komponen interaktif.
        </p>
      </div>
    </div>
  );
}
