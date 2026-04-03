"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Download, AlertTriangle, Plus } from "lucide-react";

const lowStockItems = [
  {
    id: 1,
    name: "Nutella Hazelnut Cocoa",
    image: "/placeholder.svg",
    category: "Dairy & Eggs",
    quantity: 5,
    store: "Eorange",
    price: 570.0,
    threshold: 50,
  },
  {
    id: 2,
    name: "Butterfly Fry Shrimp",
    image: "/placeholder.svg",
    category: "Shrimp",
    quantity: 12,
    store: "Sk General Store",
    price: 54.0,
    threshold: 30,
  },
  {
    id: 3,
    name: "Round Wheat Bread",
    image: "/placeholder.svg",
    category: "Bread",
    quantity: 8,
    store: "Sk General Store",
    price: 4.0,
    threshold: 25,
  },
  {
    id: 4,
    name: "Fresh Salmon Fillet",
    image: "/placeholder.svg",
    category: "Seafood",
    quantity: 3,
    store: "Eorange",
    price: 890.0,
    threshold: 20,
  },
  {
    id: 5,
    name: "Organic Milk 1L",
    image: "/placeholder.svg",
    category: "Dairy & Eggs",
    quantity: 15,
    store: "Eorange",
    price: 45.0,
    threshold: 40,
  },
];

const LowStockList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-6 w-6 text-destructive" />
        <h1 className="text-2xl font-semibold">Low Stock List</h1>
        <span className="bg-destructive/10 text-destructive text-sm px-2 py-0.5 rounded">
          {lowStockItems.length}
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Search data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All stores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All stores</SelectItem>
                <SelectItem value="eorange">Eorange</SelectItem>
                <SelectItem value="sk-general">Sk General Store</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Zones" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Zones</SelectItem>
                <SelectItem value="zone1">Zone 1</SelectItem>
                <SelectItem value="zone2">Zone 2</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All category</SelectItem>
                <SelectItem value="dairy">Dairy & Eggs</SelectItem>
                <SelectItem value="shrimp">Shrimp</SelectItem>
                <SelectItem value="bread">Bread</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Stock level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="critical">Critical (&lt;10)</SelectItem>
                <SelectItem value="low">Low (&lt;25)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline">Reset</Button>
            <Button className="bg-primary">Filter</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Input
                  placeholder="Ex : search item by name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <Button
                  size="icon"
                  className="absolute right-0 top-0 h-full rounded-l-none"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-16">SI</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Threshold</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 rounded-lg object-cover bg-muted"
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.category}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-semibold ${item.quantity < 10 ? "text-destructive" : "text-orange-500"}`}
                      >
                        {item.quantity}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.threshold}
                    </TableCell>
                    <TableCell>
                      <span className="text-primary hover:underline cursor-pointer">
                        {item.store}
                      </span>
                    </TableCell>
                    <TableCell>$ {item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <Button size="sm" className="gap-2">
                          <Plus className="h-4 w-4" />
                          Restock
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      <footer className="text-center text-sm text-muted-foreground py-4 border-t">
        © Nigar. 2021-2026 Nigar Fashion
        <span className="ml-4">Business setup</span>
        <span className="ml-4">Profile</span>
        <span className="ml-4">Home</span>
        <span className="ml-4 text-primary">Software Version : 3.6</span>
      </footer>
    </div>
  );
};

export default LowStockList;
