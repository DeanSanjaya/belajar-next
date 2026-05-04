"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/code-block";
import { 
  Cpu, 
  ArrowLeft, 
  Database, 
  Zap, 
  RefreshCw, 
  Clock,
  History,
  Info
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CachingLesson() {
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
          <Cpu className="text-rose-500" />
          Caching & Revalidation
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Memahami 4 tingkat caching di Next.js: Request Memoization, Data Cache, Full Route Cache, dan Router Cache.
        </p>

        <section className="space-y-12">
          {/* Section 1: Data Cache vs Memoization */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database size={24} className="text-rose-500" />
              1. Data Cache vs Memoization
            </h2>
            <p className="text-muted-foreground mb-6">
              **Request Memoization** hanya berlaku selama satu render cycle. Sedangkan **Data Cache** tetap ada di server antar request.
            </p>
            
            <CodeBlock 
              filename="app/lib/data.ts"
              language="ts"
              code={`// fetch secara default akan masuk ke Data Cache
export async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { 
      revalidate: 60, // Cache selama 60 detik (ISR)
      tags: ['products'] // Digunakan untuk On-demand revalidation
    }
  })
  return res.json()
}`}
            />
          </div>

          {/* Section 2: Revalidation */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <RefreshCw size={24} className="text-green-500" />
              2. Revalidation (On-demand)
            </h2>
            <p className="text-muted-foreground mb-6">
              Anda bisa menghapus cache secara manual menggunakan <code>revalidatePath</code> atau <code>revalidateTag</code> di dalam Server Action.
            </p>
            
            <CodeBlock 
              filename="app/actions.ts"
              language="ts"
              code={`"use server";
import { revalidateTag } from 'next/cache'

export async function addProduct(data: FormData) {
  // Simpan data...
  
  // Hapus cache untuk semua komponen yang menggunakan tag 'products'
  revalidateTag('products')
}`}
            />
          </div>

          {/* Section 3: Interactive Demo */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Interactive Demo: Cache Visualizer</h2>
            <p className="text-muted-foreground mb-8">
              Simulasi bagaimana data diambil dari Cache (Hit) atau dari Source (Miss).
            </p>
            <CacheVisualizer />
          </div>

          <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 flex gap-4">
            <Info className="text-rose-500 shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-rose-500 mb-1">Pola Senior: Opt-out Caching</h3>
              <p className="text-sm text-muted-foreground">
                Jika Anda membutuhkan data yang benar-benar real-time (seperti harga saham), gunakan 
                <code>cache: &apos;no-store&apos;</code> atau <code>export const dynamic = &apos;force-dynamic&apos;</code>.
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

function CacheVisualizer() {
  const [cacheStatus, setCacheStatus] = useState<"Empty" | "Miss (Fetching)" | "Hit (Cached)" | "Expired">("Empty");
  const [data, setData] = useState<string | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!lastFetchTime) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [lastFetchTime]);

  const fetchData = (force = false) => {
    const now = Date.now();
    const isExpired = lastFetchTime && now - lastFetchTime > 10000; // 10 detik cache

    if (force || !data || isExpired) {
      setCacheStatus("Miss (Fetching)");
      setTimeout(() => {
        setData("Product Data #" + Math.floor(Math.random() * 1000));
        setLastFetchTime(Date.now());
        setCacheStatus("Hit (Cached)");
      }, 1000);
    } else {
      setCacheStatus("Hit (Cached)");
    }
  };

  return (
    <div className="border rounded-3xl overflow-hidden bg-card shadow-xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => fetchData()}
              className="py-3 px-6 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              <Zap size={18} />
              Fetch Data
            </button>
            <button 
              onClick={() => {
                setData(null);
                setCacheStatus("Empty");
                setLastFetchTime(null);
              }}
              className="py-3 px-6 rounded-xl bg-muted text-muted-foreground font-bold flex items-center justify-center gap-2 hover:bg-accent transition-colors"
            >
              <RefreshCw size={18} />
              Invalidate Cache
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest opacity-50">
              <span>Status</span>
              <span className={cacheStatus.includes("Miss") ? "text-rose-500" : cacheStatus.includes("Hit") ? "text-green-500" : ""}>
                {cacheStatus}
              </span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: data ? "100%" : "0%" }}
                className={`h-full ${cacheStatus.includes("Miss") ? "bg-rose-500" : "bg-green-500"}`}
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-4 -left-4 p-2 bg-rose-500 text-white rounded-lg shadow-xl z-10">
            <Database size={16} />
          </div>
          <div className="h-full min-h-37.5 p-6 rounded-2xl border-2 border-dashed border-rose-500/20 bg-rose-500/5 flex flex-col items-center justify-center text-center">
            {data ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <Clock className="mx-auto mb-2 text-rose-500" size={32} />
                <div className="font-mono text-xl font-bold mb-1">{data}</div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Served from Data Cache</p>
                {lastFetchTime && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                    <History size={10} />
                    Fetched {Math.round((now - lastFetchTime) / 1000)}s ago
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="text-muted-foreground italic text-sm">
                {cacheStatus === "Miss (Fetching)" ? "Fetching from Source..." : "Cache is empty. Click Fetch."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
