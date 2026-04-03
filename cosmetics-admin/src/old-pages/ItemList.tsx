"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
import {
  Search,
  Download,
  Pencil,
  Trash2,
  ShoppingBag,
  Plus,
} from "lucide-react";

const itemsData = [
  {
    id: 26,
    name: "Brown Bread",
    image: "/placeholder.svg",
    category: "Bakery",
    quantity: 3000,
    store: "Eorange",
    price: 156.0,
    status: true,
  },
  {
    id: 27,
    name: "Lipton Yellow Label...",
    image: "/placeholder.svg",
    category: "Baby Care",
    quantity: 2000,
    store: "Eorange",
    price: 300.0,
    status: true,
  },
  {
    id: 28,
    name: "Nutella Hazelnut Coc...",
    image: "/placeholder.svg",
    category: "Dairy & Eggs",
    quantity: 39,
    store: "Eorange",
    price: 570.0,
    status: true,
  },
  {
    id: 29,
    name: "Blue Grapes",
    image: "/placeholder.svg",
    category: "Shrimp",
    quantity: 1000,
    store: "Eorange",
    price: 100.0,
    status: true,
  },
  {
    id: 30,
    name: "Ferrero Rocher Choco...",
    image: "/placeholder.svg",
    category: "Dairy & Eggs",
    quantity: 2000,
    store: "Eorange",
    price: 390.0,
    status: true,
  },
  {
    id: 31,
    name: "Butterfly Fry Shrimp",
    image: "/placeholder.svg",
    category: "Shrimp",
    quantity: 99,
    store: "Sk General Store",
    price: 54.0,
    status: true,
  },
  {
    id: 32,
    name: "Round Wheat Bread",
    image: "/placeholder.svg",
    category: "Bread",
    quantity: 99,
    store: "Sk General Store",
    price: 4.0,
    status: true,
  },
];

const ItemList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(itemsData);

  const toggleItemStatus = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ShoppingBag className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold">Item List</h1>
        <span className="bg-muted text-muted-foreground text-sm px-2 py-0.5 rounded">
          56
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
                <SelectItem value="bakery">Bakery</SelectItem>
                <SelectItem value="dairy">Dairy & Eggs</SelectItem>
                <SelectItem value="shrimp">Shrimp</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All sub category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sub category</SelectItem>
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
              <Button className="bg-primary gap-2">Low Stock List</Button>
              <Button className="bg-primary gap-2">
                <Plus className="h-4 w-4" />
                New Product Request
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
                  <TableHead>Quantity</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
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
                      <div className="flex items-center gap-2">
                        <span>{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-primary hover:underline cursor-pointer">
                        {item.store}
                      </span>
                    </TableCell>
                    <TableCell>$ {item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Switch
                        checked={item.status}
                        onCheckedChange={() => toggleItemStatus(item.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
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
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
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

export default ItemList;
