"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Store {
  id: number;
  name: string;
  image: string;
  sales?: number;
  likes?: number;
}

interface TopStoresGridProps {
  title: string;
  stores: Store[];
  type: "grid" | "list";
}

export function TopStoresGrid({ title, stores, type }: TopStoresGridProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <Button variant="link" className="text-primary p-0 h-auto">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {type === "grid" ? (
          <div className="grid grid-cols-3 gap-3">
            {stores.slice(0, 6).map((store) => (
              <div
                key={store.id}
                className="aspect-square rounded-lg bg-muted/50 flex items-center justify-center text-3xl hover:bg-muted transition-colors cursor-pointer"
              >
                {store.image}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {stores.map((store) => (
              <div
                key={store.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center text-xl">
                  {store.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{store.name}</p>
                </div>
                {store.likes !== undefined && (
                  <span className="text-sm text-destructive">
                    {store.likes} ❤️
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
