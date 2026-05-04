"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/code-block";
import { 
  Zap, 
  ArrowLeft, 
  RefreshCcw, 
  Database, 
  UploadCloud, 
  CheckCircle2,
  Clock,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";

export default function DataFetchingLesson() {
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
          <Zap className="text-orange-500" />
          Data Fetching & Mutations
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Mempelajari cara mengambil data di server dan mengubah data menggunakan Server Actions.
        </p>

        <section className="space-y-12">
          {/* Section 1: Server-side Fetching */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database size={24} className="text-primary" />
              1. Server-side Fetching
            </h2>
            <p className="text-muted-foreground mb-6">
              Di Next.js App Router, Anda bisa melakukan <code>fetch</code> langsung di dalam Server Component sebagai fungsi <code>async</code>.
            </p>
            
            <CodeBlock 
              filename="app/users/page.tsx"
              language="tsx"
              code={`export default async function UsersPage() {
  // Fetching langsung di server!
  const res = await fetch('https://api.example.com/users', {
    next: { revalidate: 3600 } // Revalidate setiap jam
  });
  const users = await res.json();

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}`}
            />
          </div>

          {/* Section 2: Loading UI */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Clock size={24} className="text-blue-500" />
              2. Loading & Streaming
            </h2>
            <p className="text-muted-foreground mb-6">
              Gunakan file <code>loading.tsx</code> untuk membuat UI placeholder otomatis saat data sedang dimuat (menggunakan React Suspense di balik layar).
            </p>
            
            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex gap-4 mb-6">
              <RefreshCcw className="text-blue-500 animate-spin shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-blue-500 mb-1">Streaming</h3>
                <p className="text-sm text-muted-foreground">
                  Next.js akan mengirimkan bagian halaman yang sudah siap terlebih dahulu, sementara bagian yang berat (fetching) akan menyusul.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Server Actions */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <UploadCloud size={24} className="text-orange-500" />
              3. Server Actions (Mutations)
            </h2>
            <p className="text-muted-foreground mb-6">
              Server Actions adalah fungsi asynchronous yang dieksekusi di server. Bisa dipanggil langsung dari form atau event listener.
            </p>

            <CodeBlock 
              filename="app/actions.ts"
              language="ts"
              code={`"use server"; // Menandai file ini berisi Server Actions

export async function createTodo(formData: FormData) {
  const title = formData.get('title');
  
  // Simpan ke database
  await db.todo.create({ data: { title } });
  
  // Refresh data di client otomatis!
  revalidatePath('/todos');
}`}
            />
          </div>

          {/* Section 4: Interactive Demo */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Interactive Demo: Server Action Simulator</h2>
            <p className="text-muted-foreground mb-8">
              Simulasi bagaimana form mengirimkan data ke server dan mendapatkan respon balik secara instan.
            </p>
            <ServerActionDemo />
          </div>

          <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/20 flex gap-4">
            <AlertTriangle className="text-orange-500 shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-orange-500 mb-1">Penting: Keamanan</h3>
              <p className="text-sm text-muted-foreground">
                Karena Server Actions berjalan di server, Anda bisa melakukan validasi server-side dan cek autentikasi di dalam fungsi action tersebut.
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

function ServerActionDemo() {
  const [isPending, startTransition] = useTransition();
  const [todos, setTodos] = useState<{id: number, text: string}[]>([]);
  const [inputText, setInputText] = useState("");

  const handleAddTodo = () => {
    if (!inputText) return;
    
    startTransition(async () => {
      // Simulasi delay jaringan
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTodos(prev => [...prev, { id: Date.now(), text: inputText }]);
      setInputText("");
    });
  };

  return (
    <div className="border rounded-3xl overflow-hidden bg-card shadow-xl p-8">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Server Connection: Active</span>
        </div>

        <div className="space-y-6">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tambahkan tugas baru..."
              className="flex-1 px-4 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              disabled={isPending}
            />
            <button 
              onClick={handleAddTodo}
              disabled={isPending}
              className="px-6 py-2 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isPending ? (
                <RefreshCcw size={16} className="animate-spin" />
              ) : (
                "Add"
              )}
            </button>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Database (Mock)</h4>
            <div className="min-h-[100px] p-4 rounded-xl border border-dashed flex flex-col gap-2">
              {todos.length === 0 ? (
                <p className="text-center text-xs text-muted-foreground mt-8 italic">No data in database</p>
              ) : (
                todos.map(todo => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={todo.id} 
                    className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-sm"
                  >
                    <CheckCircle2 size={14} className="text-green-500" />
                    {todo.text}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isPending ? 'bg-orange-500 text-white' : 'bg-muted'}`}>
            <UploadCloud size={16} className={isPending ? 'animate-bounce' : ''} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-tight">Status</span>
            <span className="text-xs text-muted-foreground">{isPending ? 'Executing Server Action...' : 'Ready'}</span>
          </div>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground bg-muted/30 px-2 py-1 rounded">
          client-to-server-bridge.ts
        </div>
      </div>
    </div>
  );
}
