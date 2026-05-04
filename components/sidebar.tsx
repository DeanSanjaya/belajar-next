"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Route, 
  Layers, 
  Zap, 
  Settings, 
  BookOpen,
  ChevronRight,
  Network,
  ShieldCheck,
  Cpu,
  Database,
  ClipboardCheck,
  Share2,
  Sparkles
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const juniorItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Routing", href: "/routing", icon: Route },
  { name: "Components", href: "/components", icon: Layers },
  { name: "Data Fetching", href: "/data-fetching", icon: Zap },
  { name: "Forms & Zod", href: "/forms-zod", icon: ClipboardCheck },
];

const seniorItems = [
  { name: "Advanced Routing", href: "/advanced-routing", icon: Network },
  { name: "Middleware & Auth", href: "/middleware-auth", icon: ShieldCheck },
  { name: "Caching", href: "/caching", icon: Cpu },
  { name: "Optimization", href: "/optimization", icon: Settings },
  { name: "Database (Prisma)", href: "/database", icon: Database },
  { name: "Supabase", href: "/supabase", icon: Share2 },
];

const masteryItems = [
  { name: "Optimistic Updates", href: "/optimistic-updates", icon: Sparkles },
];



interface SidebarProps {
  isMobile?: boolean;
}

export function Sidebar({ isMobile }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn(
      "border-r bg-card/50 backdrop-blur-xl flex flex-col h-screen sticky top-0 overflow-y-auto transition-all",
      isMobile ? "w-full border-none bg-transparent backdrop-blur-none" : "w-64 hidden lg:flex"
    )}>
      {!isMobile && (
        <div className="p-6 pb-0">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <BookOpen size={18} />
            </div>
            <span className="font-bold text-xl tracking-tight">LearnNext</span>
          </div>
        </div>
      )}

      <div className="p-6 space-y-6">
          <div>
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 px-3">Fundamentals</h3>
            <nav className="space-y-1">
              {juniorItems.map((item) => (
                <SidebarItem key={item.name} item={item} isActive={pathname === item.href} />
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 px-3 text-indigo-500/70">Advanced Patterns</h3>
            <nav className="space-y-1">
              {seniorItems.map((item) => (
                <SidebarItem key={item.name} item={item} isActive={pathname === item.href} />
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 px-3 text-amber-500/70">Expert Mastery</h3>
            <nav className="space-y-1">
              {masteryItems.map((item) => (
                <SidebarItem key={item.name} item={item} isActive={pathname === item.href} />
              ))}
            </nav>
        </div>
      </div>

      <div className="mt-auto p-6 border-t bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold">User Learner</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Level 2 Senior</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  item: {
    name: string;
    href: string;
    icon: React.ElementType;
  };
  isActive: boolean;
}

function SidebarItem({ item, isActive }: SidebarItemProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
        isActive 
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
          : "hover:bg-accent text-muted-foreground hover:text-foreground"
      )}
    >
      <item.icon size={18} className={cn("transition-transform duration-200 group-hover:scale-110", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
      <span className="font-medium text-sm">{item.name}</span>
      {isActive && <ChevronRight size={14} className="ml-auto opacity-50" />}
    </Link>
  );
}
