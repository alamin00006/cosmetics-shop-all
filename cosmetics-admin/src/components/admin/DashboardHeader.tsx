"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cnMerge";
import { Car } from "lucide-react";

interface DashboardHeaderProps {
  className?: string;
}

export function DashboardHeader({ className }: DashboardHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
        className,
      )}
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Car className="w-6 h-6 text-primary" />
          Nigar Fashion
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Hello Here You Can Manage Your Sera gari Orders by Zone.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Select defaultValue="all-zones">
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Select Zone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-zones">All Zones</SelectItem>
            <SelectItem value="zone-1">Zone 1</SelectItem>
            <SelectItem value="zone-2">Zone 2</SelectItem>
            <SelectItem value="zone-3">Zone 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

interface TimeFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

export function TimeFilter({
  activeFilter,
  onFilterChange,
  className,
}: TimeFilterProps) {
  const filters = ["This Year", "This Month", "This Week"];

  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-muted rounded-lg p-1",
        className,
      )}
    >
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={activeFilter === filter ? "default" : "ghost"}
          size="sm"
          className={cn(
            "text-xs h-7",
            activeFilter === filter && "bg-primary text-primary-foreground",
          )}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}
