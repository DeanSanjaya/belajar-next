"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CodeBlock } from "@/components/code-block";
import { 
  Sparkles, 
  ArrowLeft, 
  Zap, 
  Send, 
  CheckCircle2, 
  Clock,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useState, useOptimistic, useTransition } from "react";

type Message = {
  id: string;
  text: string;
  sending?: boolean;
};

export default function OptimisticUpdatesLesson() {
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
          <Sparkles className="text-amber-500" />
          Optimistic Updates
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Membangun UI yang terasa instan dan responsif dengan hook <code>useOptimistic</code> dari React 19.
        </p>

        <section className="space-y-12">
          {/* Section 1: What is useOptimistic? */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap size={24} className="text-amber-500" />
              1. The &quot;Zero Latency&quot; UX
            </h2>
            <p className="text-muted-foreground mb-6">
              Optimistic UI adalah pola di mana aplikasi langsung memperbarui tampilan sebelum data benar-benar tersimpan di server. 
              Jika request gagal, aplikasi akan mengembalikan tampilan ke kondisi semula secara otomatis.
            </p>
            
            <CodeBlock 
              filename="components/Chat.tsx"
              language="tsx"
              code={`const [optimisticMessages, addOptimisticMessage] = useOptimistic(
  messages,
  (state, newMessage: string) => [
    ...state,
    { id: Date.now().toString(), text: newMessage, sending: true }
  ]
);

async function action(formData: FormData) {
  const message = formData.get("message") as string;
  addOptimisticMessage(message); // UI langsung update!
  await sendMessage(message); // Request ke server (lama)
}`}
            />
          </div>

          {/* Section 2: Interactive Demo */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Interactive Demo: Instant Chat</h2>
            <p className="text-muted-foreground mb-8">
              Bandingkan sensasi mengirim pesan dengan dan tanpa Optimistic UI. Kami mensimulasikan delay server selama 2 detik.
            </p>
            <ChatDemo />
          </div>

          {/* Section 3: Why it matters */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 size={24} className="text-green-500" />
              2. Key Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                <h4 className="font-bold mb-2">Perceived Performance</h4>
                <p className="text-sm text-muted-foreground">User merasa aplikasi sangat cepat karena feedback diberikan seketika setelah tombol ditekan.</p>
              </div>
              <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                <h4 className="font-bold mb-2">Automatic Rollback</h4>
                <p className="text-sm text-muted-foreground">React 19 menangani pembatalan state jika Server Action error, Anda tidak perlu menulis logika undo manual.</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex gap-4">
            <AlertCircle className="text-amber-500 shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-amber-500 mb-1">Use with Server Actions</h3>
              <p className="text-sm text-muted-foreground">
                Hook ini dirancang khusus untuk bekerja bersama Server Actions. Ia akan menjaga state &quot;optimis&quot; selama durasi eksekusi server action.
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Halo! Selamat belajar Next.js." }
  ]);
  const [isPending, startTransition] = useTransition();

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      { id: Date.now().toString(), text: newMessage, sending: true }
    ]
  );

  async function sendMessage(formData: FormData) {
    const text = formData.get("message") as string;
    if (!text) return;

    startTransition(async () => {
      addOptimisticMessage(text);
      
      // Simulasi server delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessages(prev => [...prev, { id: Date.now().toString(), text }]);
    });
  }

  return (
    <div className="border rounded-3xl overflow-hidden bg-card shadow-xl flex flex-col h-[500px]">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white">
            <MessageSquare size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold">Optimistic Room</h4>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] text-muted-foreground uppercase font-bold">Server Sync Active</span>
            </div>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-bold">React 19 Feature</div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence initial={false}>
          {optimisticMessages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.id === "1" ? "justify-start" : "justify-end"}`}
            >
              <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm relative group ${
                msg.id === "1" 
                  ? "bg-muted text-foreground rounded-tl-none" 
                  : msg.sending 
                    ? "bg-amber-500/20 text-amber-700 border border-amber-500/30 rounded-tr-none italic" 
                    : "bg-amber-500 text-white shadow-lg shadow-amber-500/20 rounded-tr-none"
              }`}>
                {msg.text}
                {msg.sending && (
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2">
                    <Clock size={12} className="text-amber-500 animate-spin" />
                  </div>
                )}
                {msg.sending && (
                  <div className="mt-1 text-[8px] opacity-50 font-bold uppercase tracking-widest">Sending...</div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Chat Input */}
      <form action={sendMessage} className="p-4 border-t bg-muted/10">
        <div className="flex gap-2">
          <input 
            name="message"
            placeholder="Ketik pesan..."
            className="flex-1 bg-background border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            autoComplete="off"
          />
          <button 
            type="submit"
            className="bg-amber-500 text-white p-2 rounded-xl hover:bg-amber-600 transition-all active:scale-95 shadow-lg shadow-amber-500/20"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-center gap-4 text-[9px] text-muted-foreground uppercase font-bold tracking-widest">
           <div className="flex items-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-amber-500/30" />
             Optimistic State
           </div>
           <div className="flex items-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
             Persisted State
           </div>
        </div>
      </form>

      <div className="p-2 border-t bg-black text-[9px] text-zinc-500 font-mono text-center">
        CONSOLE: {isPending ? ">>> SERVER ACTION IN PROGRESS (2000ms delay)" : ">>> IDLE"}
      </div>
    </div>
  );
}
