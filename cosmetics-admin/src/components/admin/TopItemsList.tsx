"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Item {
  id: number;
  name: string;
  image: string;
  sold?: number;
  rating?: number;
}

interface TopItemsListProps {
  title: string;
  items: Item[];
  valueType: "sold" | "rating";
}

export function TopItemsList({ title, items, valueType }: TopItemsListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <Button variant="link" className="text-primary p-0 h-auto">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center text-xl shrink-0">
                {item.image}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
              </div>
              {valueType === "sold" && item.sold !== undefined && (
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                  Sold : {item.sold}
                </Badge>
              )}
              {valueType === "rating" && item.rating !== undefined && (
                <span className="text-sm text-destructive">
                  {item.rating} ❤️
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
