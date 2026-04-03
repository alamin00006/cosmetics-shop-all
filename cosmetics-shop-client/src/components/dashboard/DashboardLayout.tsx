"use client";

import { ReactNode } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from 'framer-motion';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Settings, 
  LogOut,
  LayoutDashboard,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { demoUser } from '@/data/demoUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Orders', href: '/dashboard/orders', icon: ShoppingBag },
  { label: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
  { label: 'Addresses', href: '/dashboard/addresses', icon: MapPin },
  { label: 'Profile Settings', href: '/dashboard/profile', icon: Settings },
];

export const DashboardLayout = ({ children, title, description }: DashboardLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{title}</span>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden sticky top-24">
                {/* User Info */}
                <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/20">
                      <AvatarImage src={demoUser.avatar} alt={demoUser.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                        {demoUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {demoUser.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{demoUser.email}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Navigation */}
                <nav className="p-4">
                  <ul className="space-y-1">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.href}>
                          <Link
                            to={item.href}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                              isActive 
                                ? "bg-primary text-primary-foreground shadow-md" 
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            )}
                          >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <Separator />

                {/* Logout */}
                <div className="p-4">
                  <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all w-full">
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </div>
              </div>
            </aside>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex overflow-x-auto gap-2 pb-4 scrollbar-hide">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-md" 
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-6">
                <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
                  {title}
                </h1>
                {description && (
                  <p className="text-muted-foreground mt-2">{description}</p>
                )}
              </div>
              {children}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
