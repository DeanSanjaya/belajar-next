"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/code-block";
import { 
  Settings, 
  ArrowLeft, 
  Image as ImageIcon, 
  Type, 
  Search,
  Zap,
  Gauge,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function OptimizationLesson() {
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
          <Settings className="text-yellow-500" />
          Optimization & Performance
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Mengoptimalkan aplikasi Next.js untuk kecepatan maksimal dan SEO yang luar biasa.
        </p>

        <section className="space-y-12">
          {/* Section 1: Image Optimization */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ImageIcon size={24} className="text-blue-500" />
              1. Image Optimization
            </h2>
            <p className="text-muted-foreground mb-6">
              Komponen <code>&lt;Image /&gt;</code> di Next.js secara otomatis menangani resizing, lazy loading, dan format modern (seperti WebP/AVIF).
            </p>
            
            <CodeBlock 
              filename="components/Banner.tsx"
              language="tsx"
              code={`import Image from 'next/image'

export default function Banner() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero Banner"
      width={1200}
      height={600}
      priority // Muat lebih awal untuk LCP
      className="rounded-xl"
    />
  )
}`}
            />
          </div>

          {/* Section 2: Font Optimization */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Type size={24} className="text-green-500" />
              2. Font Optimization
            </h2>
            <p className="text-muted-foreground mb-6">
              <code>next/font</code> mendownload font Google secara lokal saat build-time. Ini menghilangkan layout shift dan tidak ada request font ke luar.
            </p>
            
            <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20 mb-6">
              <h3 className="font-bold text-green-500 mb-1 flex items-center gap-2">
                <CheckCircle2 size={18} />
                Zero Layout Shift
              </h3>
              <p className="text-sm text-muted-foreground">
                Next.js menggunakan variabel CSS untuk memastikan browser tahu ukuran font sebelum font selesai dimuat.
              </p>
            </div>
          </div>

          {/* Section 3: Metadata API */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Search size={24} className="text-purple-500" />
              3. Metadata API (SEO)
            </h2>
            <p className="text-muted-foreground mb-6">
              Next.js mempermudah pengelolaan SEO dengan Metadata API. Cukup export objek <code>metadata</code> di <code>layout.tsx</code> atau <code>page.tsx</code>.
            </p>

            <CodeBlock 
              filename="app/page.tsx"
              language="tsx"
              code={`import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Awesome Site',
  description: 'Membangun masa depan dengan Next.js',
  openGraph: {
    images: ['/og-image.jpg'],
  },
}`}
            />
          </div>

          {/* Section 4: Interactive Demo */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Interactive Demo: Performance Analyzer</h2>
            <p className="text-muted-foreground mb-8">
              Lihat bagaimana teknik optimasi Next.js mempengaruhi skor performa secara langsung.
            </p>
            <OptimizationDemo />
          </div>

          <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 flex gap-4">
            <Gauge className="text-yellow-500 shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-yellow-500 mb-1">Core Web Vitals</h3>
              <p className="text-sm text-muted-foreground">
                Next.js dirancang untuk membantu Anda mendapatkan skor 100 di Lighthouse dengan sedikit usaha. Gunakan alat ini untuk memantau performa Anda.
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

function OptimizationDemo() {
  const [isOptimized, setIsOptimized] = useState(false);
  
  const scores = isOptimized 
    ? { lcp: "0.8s", cls: "0.01", performance: 99 }
    : { lcp: "3.2s", cls: "0.25", performance: 64 };

  return (
    <div className="border rounded-3xl overflow-hidden bg-card shadow-xl p-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 space-y-6 w-full">
          <div className="flex items-center justify-between">
            <h4 className="font-bold">Optimization Toggles</h4>
            <button 
              onClick={() => setIsOptimized(!isOptimized)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isOptimized ? 'bg-primary' : 'bg-muted'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isOptimized ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="space-y-4">
            {[
              { label: "Image Resizing & Compression", active: isOptimized },
              { label: "Font Self-Hosting", active: isOptimized },
              { label: "Automatic Code Splitting", active: true },
              { label: "Metadata & SEO Tags", active: isOptimized }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${feature.active ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                  <CheckCircle2 size={12} />
                </div>
                <span className={`text-sm ${feature.active ? 'text-foreground' : 'text-muted-foreground line-through'}`}>
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-64 aspect-square rounded-3xl bg-zinc-50 dark:bg-zinc-900 border flex flex-col items-center justify-center p-6 text-center">
          <div className="relative mb-4">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-muted/20"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="364.4"
                initial={{ strokeDashoffset: 364.4 }}
                animate={{ strokeDashoffset: 364.4 - (364.4 * scores.performance) / 100 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={isOptimized ? "text-green-500" : "text-amber-500"}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{scores.performance}</span>
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Lighthouse</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="p-2 rounded-xl bg-background border">
              <div className="text-[8px] font-bold text-muted-foreground uppercase mb-1">LCP</div>
              <div className={`text-xs font-bold ${isOptimized ? 'text-green-500' : 'text-amber-500'}`}>{scores.lcp}</div>
            </div>
            <div className="p-2 rounded-xl bg-background border">
              <div className="text-[8px] font-bold text-muted-foreground uppercase mb-1">CLS</div>
              <div className={`text-xs font-bold ${isOptimized ? 'text-green-500' : 'text-amber-500'}`}>{scores.cls}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t flex items-center gap-3">
        <Zap size={16} className="text-yellow-500" />
        <p className="text-xs text-muted-foreground">
          {isOptimized 
            ? "Aplikasi Anda sekarang memiliki performa tingkat dunia. Web Vitals semuanya 'Good'!" 
            : "Masih ada ruang untuk perbaikan. Aktifkan fitur Next.js untuk mempercepat halaman Anda."}
        </p>
      </div>
    </div>
  );
}
