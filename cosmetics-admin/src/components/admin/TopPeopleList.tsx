"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Person {
  id: number;
  name: string;
  phone: string;
  orders: number;
  image: string;
}

interface TopPeopleListProps {
  title: string;
  people: Person[];
  type: "deliveryman" | "customer";
}

export function TopPeopleList({ title, people, type }: TopPeopleListProps) {
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
          {people.map((person) => (
            <div
              key={person.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-muted text-lg">
                  {person.image}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{person.name}</p>
                <p className="text-xs text-muted-foreground truncate">{person.phone}</p>
              </div>
              <Badge
                variant="secondary"
                className={
                  type === "deliveryman"
                    ? "bg-info/10 text-info hover:bg-info/20"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }
              >
                Orders : {person.orders}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
