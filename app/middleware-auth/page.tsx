"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/code-block";
import { 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  Unlock, 
  ArrowRightLeft, 
  Globe,
  AlertTriangle,
  FileCode
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MiddlewareAuthLesson() {
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
          <ShieldCheck className="text-indigo-500" />
          Middleware & Authentication
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Mempelajari cara mengamankan rute, menangani sesi, dan logika di sisi Edge menggunakan Middleware.
        </p>

        <section className="space-y-12">
          {/* Section 1: What is Middleware? */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Globe size={24} className="text-blue-500" />
              1. Edge Middleware
            </h2>
            <p className="text-muted-foreground mb-6">
              Middleware memungkinkan Anda menjalankan kode sebelum request selesai. Anda bisa melakukan redirect, 
              rewrite, atau memodifikasi request/response headers.
            </p>
            
            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 mb-6">
              <h3 className="font-bold text-blue-500 mb-1">Dijalankan di Edge Runtime</h3>
              <p className="text-sm text-muted-foreground">
                Middleware berjalan sangat dekat dengan user, sehingga sangat cepat untuk melakukan pengecekan sesi sebelum halaman dirender.
              </p>
            </div>

            <CodeBlock 
              filename="middleware.ts"
              language="ts"
              code={`import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}`}
            />
          </div>

          {/* Section 2: Interactive Demo */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Interactive Demo: Middleware Simulator</h2>
            <p className="text-muted-foreground mb-8">
              Simulasi bagaimana Middleware mencegat request berdasarkan status login Anda.
            </p>
            <MiddlewareSimulator />
          </div>

          {/* Section 3: Auth Patterns */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lock size={24} className="text-indigo-500" />
              2. Authentication Patterns
            </h2>
            <p className="text-muted-foreground mb-6">
              Di Next.js 15, pola yang disarankan adalah menyimpan sesi di cookie (HTTP-only) dan 
              melakukan validasi di Server Components atau Middleware.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border bg-card">
                <h4 className="font-bold text-sm mb-2">Client-side Auth</h4>
                <p className="text-xs text-muted-foreground">
                  Gunakan `useSession` (dari library seperti NextAuth) untuk UI yang reaktif (misal: menu profil).
                </p>
              </div>
              <div className="p-4 rounded-xl border bg-card">
                <h4 className="font-bold text-sm mb-2">Server-side Auth</h4>
                <p className="text-xs text-muted-foreground">
                  Cek sesi langsung di Server Component untuk keamanan maksimal dan mencegah &quot;flicker&quot; saat loading.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex gap-4">
            <AlertTriangle className="text-amber-500 shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-amber-500 mb-1">Hati-hati: Middleware Limits</h3>
              <p className="text-sm text-muted-foreground">
                Middleware berjalan di Edge Runtime yang terbatas. Anda tidak bisa menggunakan library Node.js berat 
                (seperti file system access atau koneksi database langsung).
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

function MiddlewareSimulator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const [status, setStatus] = useState("Idle");

  const navigateTo = (path: string) => {
    setStatus("Intercepting...");
    setCurrentPath(path);
    
    setTimeout(() => {
      if (path === "/dashboard" && !isLoggedIn) {
        setCurrentPath("/login");
        setStatus("Redirected by Middleware!");
      } else {
        setStatus("Allowed");
      }
    }, 800);
  };

  return (
    <div className="border rounded-3xl overflow-hidden bg-card shadow-xl p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="p-4 rounded-2xl bg-muted/50 border">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">User Controls</h4>
            <button 
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                isLoggedIn ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
              }`}
            >
              {isLoggedIn ? <Unlock size={18} /> : <Lock size={18} />}
              {isLoggedIn ? "Logged In" : "Logged Out"}
            </button>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button 
                onClick={() => navigateTo("/")}
                className="py-2 rounded-lg bg-background border text-xs font-bold hover:bg-accent transition-colors"
              >
                Go to Home (/)
              </button>
              <button 
                onClick={() => navigateTo("/dashboard")}
                className="py-2 rounded-lg bg-background border text-xs font-bold hover:bg-accent transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl border-2 border-dashed border-indigo-500/20 bg-indigo-500/5">
            <div className="flex items-center gap-2 mb-2">
              <FileCode size={14} className="text-indigo-500" />
              <span className="text-[10px] font-bold uppercase text-indigo-500">Middleware Logic</span>
            </div>
            <pre className="text-[10px] font-mono leading-relaxed text-muted-foreground">
              {`if (path === '/dashboard' && !isLoggedIn) {\n  return redirect('/login')\n}`}
            </pre>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border relative overflow-hidden">
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${status === "Intercepting..." ? "bg-amber-500 animate-ping" : "bg-green-500"}`} />
            <span className="text-[10px] font-bold uppercase opacity-50 tracking-widest">{status}</span>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-background border shadow-lg flex items-center justify-center mb-4 mx-auto">
              {currentPath === "/dashboard" ? <Unlock className="text-green-500" /> : <Lock className="text-red-500" />}
            </div>
            <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-mono mb-2">
              localhost:3000{currentPath}
            </div>
            <p className="text-xs text-muted-foreground">
              {currentPath === "/dashboard" ? "Welcome to Dashboard!" : "Please login first."}
            </p>
          </div>

          {status === "Intercepting..." && (
            <div className="absolute inset-0 bg-indigo-500/10 backdrop-blur-sm flex items-center justify-center">
              <div className="flex items-center gap-2 bg-card p-3 rounded-xl shadow-xl border">
                <ArrowRightLeft className="text-indigo-500 animate-spin" size={20} />
                <span className="text-xs font-bold">Middleware Checking...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
