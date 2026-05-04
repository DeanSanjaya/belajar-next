"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/code-block";
import { 
  Network, 
  ArrowLeft, 
  Layout, 
  Layers, 
  Maximize2, 
  Monitor,
  Info,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdvancedRoutingLesson() {
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
          <Network className="text-emerald-500" />
          Advanced Routing Patterns
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Menguasai Parallel Routes dan Intercepting Routes untuk membangun UI yang kompleks seperti Dashboard dan Modals.
        </p>

        <section className="space-y-12">
          {/* Section 1: Parallel Routes */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Layout size={24} className="text-emerald-500" />
              1. Parallel Routes (`@folder`)
            </h2>
            <p className="text-muted-foreground mb-6">
              Parallel Routes memungkinkan Anda merender satu atau lebih halaman dalam layout yang sama secara bersamaan. 
              Sangat berguna untuk dashboard yang memiliki banyak slot independen.
            </p>
            
            <CodeBlock 
              filename="app/dashboard/layout.tsx"
              language="tsx"
              code={`// Props akan menerima slot sebagai argumen
export default function Layout({
  children,
  analytics, // Dari folder @analytics
  team,      // Dari folder @team
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <>
      {children}
      <div className="grid grid-cols-2">
        {analytics}
        {team}
      </div>
    </>
  )
}`}
            />
          </div>

          {/* Section 2: Intercepting Routes */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Maximize2 size={24} className="text-blue-500" />
              2. Intercepting Routes (`(.)folder`)
            </h2>
            <p className="text-muted-foreground mb-6">
              Memungkinkan Anda memuat rute di dalam layout saat ini tanpa berpindah konteks. 
              Pola klasik: Menampilkan foto dalam modal saat diklik, tapi tetap bisa diakses langsung via URL.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl border bg-card">
                <h4 className="font-bold text-sm mb-2 italic">(.) folder</h4>
                <p className="text-xs text-muted-foreground">Intercept rute di level yang sama.</p>
              </div>
              <div className="p-4 rounded-xl border bg-card">
                <h4 className="font-bold text-sm mb-2 italic">(..) folder</h4>
                <p className="text-xs text-muted-foreground">Intercept rute satu level di atas.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Interactive Demo */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Interactive Demo: The Modal Interceptor</h2>
            <p className="text-muted-foreground mb-8">
              Simulasi bagaimana rute di-intercept menjadi modal saat navigasi internal, namun tetap menjadi halaman penuh saat di-refresh.
            </p>
            <ModalInterceptorDemo />
          </div>

          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex gap-4">
            <Info className="text-emerald-500 shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-emerald-500 mb-1">Senior Tip: default.tsx</h3>
              <p className="text-sm text-muted-foreground">
                Saat menggunakan Parallel Routes, selalu siapkan file `default.tsx` untuk menangani status rute 
                saat salah satu slot tidak memiliki halaman yang cocok selama navigasi.
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

function ModalInterceptorDemo() {
  const [viewMode, setViewMode] = useState<"Gallery" | "Modal" | "FullPage">("Gallery");

  return (
    <div className="border rounded-3xl overflow-hidden bg-card shadow-xl p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <Monitor size={16} className="text-muted-foreground" />
            <span className="text-xs font-mono text-muted-foreground">
              {viewMode === "FullPage" ? "localhost:3000/photo/1" : "localhost:3000/gallery"}
            </span>
          </div>
          <div className="flex gap-2">
            {viewMode !== "Gallery" && (
              <button 
                onClick={() => setViewMode("Gallery")}
                className="text-xs font-bold px-3 py-1 rounded bg-muted hover:bg-accent transition-colors"
              >
                Reset to Gallery
              </button>
            )}
          </div>
        </div>

        <div className="relative min-h-[300px] rounded-2xl bg-zinc-50 dark:bg-zinc-900 border flex items-center justify-center overflow-hidden">
          {viewMode === "Gallery" && (
            <div className="grid grid-cols-3 gap-4 p-8">
              {[1, 2, 3].map(i => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setViewMode("Modal")}
                  className="aspect-square rounded-xl bg-emerald-500/20 border-2 border-emerald-500/30 flex items-center justify-center cursor-pointer group"
                >
                  <ExternalLink size={20} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
              <div className="col-span-3 text-center mt-4">
                <p className="text-xs text-muted-foreground">Click a photo to see <b>Intercepting Route</b> in action.</p>
              </div>
            </div>
          )}

          {viewMode === "Modal" && (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setViewMode("Gallery")} />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative bg-card w-full max-w-sm p-8 rounded-3xl shadow-2xl border-2 border-emerald-500"
              >
                <div className="flex items-center gap-2 mb-4 text-emerald-500">
                  <Layers size={18} />
                  <span className="text-xs font-bold uppercase">Intercepted Route</span>
                </div>
                <h4 className="font-bold mb-2">Photo #1 (Modal View)</h4>
                <p className="text-xs text-muted-foreground mb-6">
                  Next.js mencegat navigasi ke `/photo/1` dan menampilkannya sebagai modal di atas galeri. URL di browser tetap berubah!
                </p>
                <button 
                  onClick={() => setViewMode("FullPage")}
                  className="w-full py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold"
                >
                  Simulate Page Refresh (Full Page)
                </button>
              </motion.div>
            </div>
          )}

          {viewMode === "FullPage" && (
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="p-12 text-center"
            >
              <h4 className="text-2xl font-bold mb-2">Full Page View</h4>
              <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto">
                Karena rute ini diakses langsung (atau direfresh), Next.js merender halaman penuh bukan modal.
              </p>
              <div className="w-32 h-32 mx-auto rounded-3xl bg-emerald-500 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/40">
                <Layers size={48} />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
