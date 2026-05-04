"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/code-block";
import { 
  Database, 
  ArrowLeft, 
  Table, 
  Terminal, 
  Zap,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DatabaseLesson() {
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
          <Database className="text-cyan-500" />
          Database with Prisma
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Belajar cara mengintegrasikan database relasional menggunakan Prisma ORM yang type-safe.
        </p>

        <section className="space-y-12">
          {/* Section 1: What is Prisma? */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Table size={24} className="text-cyan-500" />
              1. Prisma Schema
            </h2>
            <p className="text-muted-foreground mb-6">
              Prisma menggunakan file <code>schema.prisma</code> untuk mendefinisikan struktur database Anda. 
              Ini adalah &quot;Single Source of Truth&quot; untuk model data dan koneksi database.
            </p>
            
            <CodeBlock 
              filename="prisma/schema.prisma"
              language="prisma"
              code={`datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  authorId  Int
  author    User    @relation(fields: [authorId], references: [id])
}`}
            />
          </div>

          {/* Section 2: Interactive Demo */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Interactive Demo: Schema Visualizer</h2>
            <p className="text-muted-foreground mb-8">
              Pahami bagaimana Prisma menghubungkan model-model data Anda secara relasional.
            </p>
            <SchemaVisualizer />
          </div>

          {/* Section 3: Usage in Next.js */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap size={24} className="text-yellow-500" />
              2. Usage in Server Components
            </h2>
            <p className="text-muted-foreground mb-6">
              Karena Next.js memiliki Server Components, Anda bisa langsung memanggil Prisma Client 
              tanpa perlu membuat API Route terpisah.
            </p>
            
            <CodeBlock 
              filename="app/users/page.tsx"
              language="tsx"
              code={`import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    include: { posts: true }
  })

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          {user.name} - {user.posts.length} posts
        </div>
      ))}
    </div>
  )
}`}
            />
          </div>

          <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex gap-4">
            <CheckCircle2 className="text-cyan-500 shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-cyan-500 mb-1">Keunggulan Type-safety</h3>
              <p className="text-sm text-muted-foreground">
                Prisma secara otomatis men-generate TypeScript types berdasarkan schema Anda. 
                Jika Anda mencoba mengakses field yang tidak ada, IDE akan langsung memberitahu kesalahannya.
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

function SchemaVisualizer() {
  const [activeModel, setActiveModel] = useState<"User" | "Post">("User");

  return (
    <div className="border rounded-3xl overflow-hidden bg-card shadow-xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveModel("User")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${activeModel === "User" ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "bg-muted text-muted-foreground"}`}
            >
              Model User
            </button>
            <button 
              onClick={() => setActiveModel("Post")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${activeModel === "Post" ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "bg-muted text-muted-foreground"}`}
            >
              Model Post
            </button>
          </div>

          <div className="p-4 rounded-2xl border bg-muted/30 font-mono text-[10px] space-y-1">
            <div className="text-cyan-500">model {activeModel} {"{"}</div>
            {activeModel === "User" ? (
              <>
                <div className="pl-4">id <span className="text-purple-500">Int</span> @id @default(autoincrement())</div>
                <div className="pl-4">email <span className="text-purple-500">String</span> @unique</div>
                <div className="pl-4">name <span className="text-purple-500">String?</span></div>
                <div className="pl-4">posts <span className="text-purple-500">Post[]</span></div>
              </>
            ) : (
              <>
                <div className="pl-4">id <span className="text-purple-500">Int</span> @id @default(autoincrement())</div>
                <div className="pl-4">title <span className="text-purple-500">String</span></div>
                <div className="pl-4">authorId <span className="text-purple-500">Int</span></div>
                <div className="pl-4">author <span className="text-purple-500">User</span> @relation(...)</div>
              </>
            )}
            <div className="text-cyan-500">{"}"}</div>
          </div>
        </div>

        <div className="flex items-center justify-center relative">
          {/* Relation Line */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20" />
          </div>

          <div className="flex gap-8 items-center z-10">
            <div className={`p-6 rounded-2xl border-2 transition-all ${activeModel === "User" ? "border-cyan-500 bg-cyan-500/10 scale-110 shadow-xl" : "border-border bg-card opacity-50"}`}>
              <Table size={32} className="text-cyan-500 mb-2 mx-auto" />
              <span className="text-xs font-bold block text-center">USER</span>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <div className="px-2 py-1 rounded bg-muted text-[8px] font-bold">1-to-Many</div>
              <div className="w-12 h-px bg-cyan-500" />
            </div>

            <div className={`p-6 rounded-2xl border-2 transition-all ${activeModel === "Post" ? "border-cyan-500 bg-cyan-500/10 scale-110 shadow-xl" : "border-border bg-card opacity-50"}`}>
              <Table size={32} className="text-cyan-500 mb-2 mx-auto" />
              <span className="text-xs font-bold block text-center">POST</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
          <Terminal size={20} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold mb-1">Useful Command:</p>
          <code className="text-[10px] bg-black text-white p-2 rounded block">
            npx prisma migrate dev --name init
          </code>
        </div>
      </div>
    </div>
  );
}
