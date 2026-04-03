"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

interface SalesChartData {
  month: string;
  grossSale: number;
  adminCommission: number;
  deliveryCommission: number;
}

interface SalesChartProps {
  data: SalesChartData[];
  totalSales: number;
  saleCount: number;
}

const chartConfig = {
  grossSale: {
    label: "Gross Sale",
    color: "hsl(var(--success))",
  },
  adminCommission: {
    label: "Admin Commission",
    color: "hsl(var(--info))",
  },
  deliveryCommission: {
    label: "Delivery Commission",
    color: "hsl(var(--warning))",
  },
};

export function SalesChart({ data, totalSales, saleCount }: SalesChartProps) {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <p className="text-2xl font-bold">$ {totalSales.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">Gross Sale</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-success"></span>
            Sale ({saleCount})
          </span>
          <Select defaultValue="this-year">
            <SelectTrigger className="w-28 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-year">This year</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
              <SelectItem value="all-time">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGrossSale" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAdminCommission" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDeliveryCommission" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" tickLine={false} axisLine={false} />
            <YAxis className="text-xs" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="grossSale"
              stroke="hsl(var(--success))"
              fillOpacity={1}
              fill="url(#colorGrossSale)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="adminCommission"
              stroke="hsl(var(--info))"
              fillOpacity={1}
              fill="url(#colorAdminCommission)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="deliveryCommission"
              stroke="hsl(var(--warning))"
              fillOpacity={1}
              fill="url(#colorDeliveryCommission)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
        <div className="flex items-center justify-center gap-6 mt-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="h-3 w-3 rounded-full bg-success"></span>
            <span className="text-muted-foreground">Gross Sale</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="h-3 w-3 rounded-full bg-info"></span>
            <span className="text-muted-foreground">Admin Commission</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="h-3 w-3 rounded-full bg-warning"></span>
            <span className="text-muted-foreground">Delivery Commission</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
