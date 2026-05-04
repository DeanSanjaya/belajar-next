"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/code-block";
import { 
  ClipboardCheck, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  Terminal,
  FileCode
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FormsZodLesson() {
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
          <ClipboardCheck className="text-pink-500" />
          Forms & Zod Validation
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Belajar cara menangani form secara modern dengan validasi yang kuat menggunakan Zod.
        </p>

        <section className="space-y-12">
          {/* Section 1: What is Zod? */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheck size={24} className="text-pink-500" />
              1. Zod Schema Definition
            </h2>
            <p className="text-muted-foreground mb-6">
              Zod memungkinkan kita mendefinisikan skema data yang bisa divalidasi baik di Client maupun Server.
            </p>
            
            <CodeBlock 
              filename="lib/schema.ts"
              language="typescript"
              code={`import { z } from "zod";

export const UserSchema = z.object({
  username: z.string().min(3, "Minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  age: z.number().min(18, "Minimal usia 18 tahun"),
});

export type User = z.infer<typeof UserSchema>;`}
            />
          </div>

          {/* Section 2: Interactive Demo */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Interactive Demo: Real-time Validation</h2>
            <p className="text-muted-foreground mb-8">
              Coba ketik sesuatu untuk melihat bagaimana Zod memvalidasi input Anda secara langsung.
            </p>
            <FormDemo />
          </div>

          {/* Section 3: React Hook Form & Zod */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap size={24} className="text-yellow-500" />
              2. React Hook Form Integration
            </h2>
            <p className="text-muted-foreground mb-6">
              Next.js 15 seringkali menggunakan React Hook Form bersama Zod resolver untuk pengalaman terbaik.
            </p>
            
            <CodeBlock 
              filename="components/my-form.tsx"
              language="tsx"
              code={`"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, User } from "@/lib/schema";

export function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: zodResolver(UserSchema)
  });

  const onSubmit = (data: User) => {
    console.log("Valid Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      {errors.username && <span>{errors.username.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}`}
            />
          </div>

          <div className="p-6 rounded-2xl bg-pink-500/5 border border-pink-500/20 flex gap-4">
            <CheckCircle2 className="text-pink-500 shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-pink-500 mb-1">Server-Side Validation</h3>
              <p className="text-sm text-muted-foreground">
                Jangan hanya memvalidasi di Client! Gunakan skema Zod yang sama di Server Action untuk memastikan data yang masuk ke database tetap bersih dan aman.
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

function FormDemo() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validate = (val: string) => {
    setUsername(val);
    if (val.length < 3) {
      setError("Minimal 3 karakter");
    } else {
      setError(null);
    }
  };

  return (
    <div className="border rounded-3xl overflow-hidden bg-card shadow-xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => validate(e.target.value)}
              className={`w-full bg-muted/50 border rounded-xl px-4 py-3 outline-none transition-all ${error ? "border-pink-500 ring-2 ring-pink-500/10" : "border-border focus:border-primary"}`}
              placeholder="Ketik username..."
            />
            {error && (
              <p className="mt-2 text-xs text-pink-500 flex items-center gap-1 font-medium">
                <AlertCircle size={12} />
                {error}
              </p>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-muted/30 border border-border">
            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Validation Logic</h4>
            <div className="font-mono text-[10px] space-y-1">
              <div className="text-pink-500">z.string().min(3)</div>
              <div className="text-muted-foreground flex items-center gap-2">
                Status: {error ? (
                  <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-500 border border-pink-500/20">Invalid</span>
                ) : username.length > 0 ? (
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 border border-green-500/20">Valid</span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground">Empty</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-6 bg-card border rounded-2xl shadow-sm">
              <FileCode className="text-pink-500 mb-4" size={32} />
              <h4 className="font-bold mb-2">Schema Power</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Zod tidak hanya memvalidasi, tapi juga memberikan <span className="text-foreground font-semibold">Inferred Types</span> yang membuat development lebih cepat tanpa perlu menulis interface manual.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
          <Terminal size={20} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold mb-1">Quick Start:</p>
          <code className="text-[10px] bg-black text-white p-2 rounded block">
            npm install zod @hookform/resolvers react-hook-form
          </code>
        </div>
      </div>
    </div>
  );
}
