"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/code-block";
import { 
  Share2, 
  ArrowLeft, 
  Lock, 
  Database, 
  Globe,
  Terminal,
  Cpu
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SupabaseLesson() {
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
          <Share2 className="text-green-600" />
          Supabase Ecosystem
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Membangun aplikasi full-stack dengan cepat menggunakan Firebase alternative berbasis PostgreSQL.
        </p>

        <section className="space-y-12">
          {/* Section 1: What is Supabase? */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database size={24} className="text-green-600" />
              1. PostgreSQL Database
            </h2>
            <p className="text-muted-foreground mb-6">
              Supabase memberikan database Postgres lengkap dengan API RESTful yang langsung jadi tanpa perlu menulis backend.
            </p>
            
            <CodeBlock 
              filename="lib/supabase.ts"
              language="typescript"
              code={`import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)`}
            />
          </div>

          {/* Section 2: Interactive Demo */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Interactive Demo: Realtime Updates</h2>
            <p className="text-muted-foreground mb-8">
              Simulasi bagaimana Supabase Broadcast bekerja untuk komunikasi antar client secara instan.
            </p>
            <RealtimeDemo />
          </div>

          {/* Section 3: Authentication */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lock size={24} className="text-blue-500" />
              2. Authentication & RLS
            </h2>
            <p className="text-muted-foreground mb-6">
              Row Level Security (RLS) adalah fitur terkuat Supabase. Anda bisa membatasi akses data langsung di level database berdasarkan user yang login.
            </p>
            
            <CodeBlock 
              filename="supabase/policy.sql"
              language="sql"
              code={`-- Buat policy: Hanya pemilik data yang bisa melihat datanya sendiri
CREATE POLICY "Users can view their own data"
ON profiles FOR SELECT
USING (auth.uid() = id);`}
            />
          </div>

          <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20 flex gap-4">
            <Globe className="text-green-600 shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-green-600 mb-1">Server-Side Supabase</h3>
              <p className="text-sm text-muted-foreground">
                Next.js App Router mendukung Supabase di Server Components dan Route Handlers. Gunakan <code>@supabase/ssr</code> untuk integrasi yang seamless dengan Cookies.
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

function RealtimeDemo() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        const newMsg = `Signal received at ${new Date().toLocaleTimeString()}`;
        setMessages(prev => [newMsg, ...prev].slice(0, 5));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="border rounded-3xl overflow-hidden bg-card shadow-xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Realtime Channel</h4>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${isActive ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : "bg-green-600 text-white shadow-lg shadow-green-600/20"}`}
            >
              {isActive ? "Stop Listening" : "Start Listening"}
            </button>
          </div>

          <div className="space-y-2">
            {messages.length === 0 ? (
              <div className="h-32 border-2 border-dashed rounded-2xl flex items-center justify-center text-muted-foreground text-xs italic">
                No active signals...
              </div>
            ) : (
              messages.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 rounded-xl bg-muted/50 border text-[10px] font-mono flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  {m}
                </motion.div>
              ))
            )}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <Cpu className="text-green-500 mb-4 opacity-50" size={32} />
          <h4 className="text-white font-bold mb-2">Live Sync</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Supabase menggunakan <span className="text-green-500">WebSockets</span> di bawah kap untuk sinkronisasi data antar device dalam waktu kurang dari 100ms.
          </p>
          <div className="mt-6 flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full ${isActive ? "bg-green-500/40 animate-pulse" : "bg-zinc-800"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
          <Terminal size={20} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold mb-1">CLI Command:</p>
          <code className="text-[10px] bg-black text-white p-2 rounded block">
            npx supabase init
          </code>
        </div>
      </div>
    </div>
  );
}
