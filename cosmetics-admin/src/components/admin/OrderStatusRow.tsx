"use client";

import {
  ClipboardList,
  UserCheck,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  RotateCcw,
  CreditCard,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/cnMerge";

const iconMap: Record<string, LucideIcon> = {
  "clipboard-list": ClipboardList,
  "user-check": UserCheck,
  package: Package,
  truck: Truck,
  "check-circle": CheckCircle,
  "x-circle": XCircle,
  "rotate-ccw": RotateCcw,
  "credit-card": CreditCard,
};

interface OrderStatusItem {
  label: string;
  count: number;
  color: string;
  icon: string;
}

interface OrderStatusRowProps {
  items: OrderStatusItem[];
}

export function OrderStatusRow({ items }: OrderStatusRowProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {items.map((item) => {
            const Icon = iconMap[item.icon] || ClipboardList;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
              >
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    item.color === "text-success" && "bg-success/10",
                    item.color === "text-destructive" && "bg-destructive/10",
                    item.color === "text-warning" && "bg-warning/10",
                    item.color === "text-info" && "bg-info/10",
                    item.color === "text-primary" && "bg-primary/10",
                    item.color === "text-muted-foreground" && "bg-muted",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      item.color === "text-success" && "text-success",
                      item.color === "text-destructive" && "text-destructive",
                      item.color === "text-warning" && "text-warning",
                      item.color === "text-info" && "text-info",
                      item.color === "text-primary" && "text-primary",
                      item.color === "text-muted-foreground" &&
                        "text-muted-foreground",
                    )}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground truncate">
                    {item.label}
                  </p>
                  <p
                    className={cn(
                      "text-lg font-semibold",
                      item.color === "text-success" && "text-success",
                      item.color === "text-destructive" && "text-destructive",
                      item.color === "text-warning" && "text-warning",
                      item.color === "text-info" && "text-info",
                      item.color === "text-primary" && "text-primary",
                      item.color === "text-muted-foreground" &&
                        "text-foreground",
                    )}
                  >
                    {item.count}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
