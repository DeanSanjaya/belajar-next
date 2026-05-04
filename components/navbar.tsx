"use client";

import { Menu, BookOpen, X } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "./sidebar";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b bg-card/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <BookOpen size={18} />
          </div>
          <span className="font-bold text-lg tracking-tight">LearnNext</span>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            />
            
            {/* Sidebar Content */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-card z-50 lg:hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                    <BookOpen size={18} />
                  </div>
                  <span className="font-bold text-xl tracking-tight">LearnNext</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto" onClick={() => setIsOpen(false)}>
                <Sidebar isMobile={true} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
