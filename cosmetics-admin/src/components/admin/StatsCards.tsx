"use client";

import { Package, ShoppingBag, Store, Users, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: Record<string, LucideIcon> = {
  package: Package,
  "shopping-bag": ShoppingBag,
  store: Store,
  users: Users,
};

interface StatsCardProps {
  label: string;
  value: number;
  subtitle: string;
  icon: string;
}

export function StatsCard({ label, value, subtitle, icon }: StatsCardProps) {
  const Icon = iconMap[icon] || Package;
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="mb-2 p-3 rounded-full bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

interface StatsCardsGridProps {
  stats: StatsCardProps[];
}

export function StatsCardsGrid({ stats }: StatsCardsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatsCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
