"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  Filter,
  LayoutGrid,
  Eye,
  Printer,
  ShoppingCart,
} from "lucide-react";

interface Order {
  id: number;
  orderId: string;
  orderDate: string;
  orderTime: string;
  customerName: string;
  customerPhone: string;
  store: string;
  itemQuantity: number;
  totalAmount: number;
  isPaid: boolean;
  orderStatus:
    | "Pending"
    | "Delivered"
    | "Confirmed"
    | "Processing"
    | "Cancelled";
  deliveryType: "Home Delivery" | "Take Away";
}

const ordersData: Order[] = [
  {
    id: 1,
    orderId: "100131",
    orderDate: "13 Oct 2025",
    orderTime: "09:41 AM",
    customerName: "Black Smith",
    customerPhone: "••••••••••",
    store: "Family supermarket",
    itemQuantity: 1,
    totalAmount: 827.85,
    isPaid: false,
    orderStatus: "Pending",
    deliveryType: "Home Delivery",
  },
  {
    id: 2,
    orderId: "100130",
    orderDate: "31 Jul 2025",
    orderTime: "10:43 AM",
    customerName: "Marjahan Sultana",
    customerPhone: "••••••••••",
    store: "Smart Shopping",
    itemQuantity: 1,
    totalAmount: 185.82,
    isPaid: true,
    orderStatus: "Delivered",
    deliveryType: "Home Delivery",
  },
  {
    id: 3,
    orderId: "100126",
    orderDate: "31 Jul 2025",
    orderTime: "10:26 AM",
    customerName: "Marjahan Sultana",
    customerPhone: "••••••••••",
    store: "Smart Shopping",
    itemQuantity: 1,
    totalAmount: 624.1,
    isPaid: false,
    orderStatus: "Pending",
    deliveryType: "Home Delivery",
  },
  {
    id: 4,
    orderId: "100109",
    orderDate: "05 Jul 2025",
    orderTime: "05:30 PM",
    customerName: "Black Smith",
    customerPhone: "••••••••••",
    store: "Online market",
    itemQuantity: 1,
    totalAmount: 819.5,
    isPaid: true,
    orderStatus: "Delivered",
    deliveryType: "Home Delivery",
  },
  {
    id: 5,
    orderId: "100108",
    orderDate: "05 Jul 2025",
    orderTime: "05:29 PM",
    customerName: "Black Smith",
    customerPhone: "••••••••••",
    store: "Organic Shop",
    itemQuantity: 1,
    totalAmount: 659.58,
    isPaid: true,
    orderStatus: "Delivered",
    deliveryType: "Home Delivery",
  },
  {
    id: 6,
    orderId: "100107",
    orderDate: "05 Jul 2025",
    orderTime: "05:27 PM",
    customerName: "Black Smith",
    customerPhone: "••••••••••",
    store: "Fast Market",
    itemQuantity: 1,
    totalAmount: 1610.5,
    isPaid: true,
    orderStatus: "Delivered",
    deliveryType: "Home Delivery",
  },
  {
    id: 7,
    orderId: "100104",
    orderDate: "20 Apr 2025",
    orderTime: "06:15 PM",
    customerName: "Marjahan Sultana",
    customerPhone: "••••••••••",
    store: "Organic Shop",
    itemQuantity: 3,
    totalAmount: 678.31,
    isPaid: true,
    orderStatus: "Delivered",
    deliveryType: "Home Delivery",
  },
  {
    id: 8,
    orderId: "100102",
    orderDate: "20 Apr 2025",
    orderTime: "06:13 PM",
    customerName: "Marjahan Sultana",
    customerPhone: "••••••••••",
    store: "Smart Shopping",
    itemQuantity: 1,
    totalAmount: 550.5,
    isPaid: true,
    orderStatus: "Delivered",
    deliveryType: "Home Delivery",
  },
  {
    id: 9,
    orderId: "100099",
    orderDate: "02 Jan 2024",
    orderTime: "04:54 PM",
    customerName: "Marjahan Sultana",
    customerPhone: "••••••••••",
    store: "Online market",
    itemQuantity: 1,
    totalAmount: 858.4,
    isPaid: true,
    orderStatus: "Delivered",
    deliveryType: "Home Delivery",
  },
  {
    id: 10,
    orderId: "100087",
    orderDate: "19 Oct 2023",
    orderTime: "05:00 PM",
    customerName: "Mr. Jhon parker",
    customerPhone: "8••••••••••",
    store: "Smart Shopping",
    itemQuantity: 1,
    totalAmount: 587.0,
    isPaid: true,
    orderStatus: "Delivered",
    deliveryType: "Home Delivery",
  },
  {
    id: 11,
    orderId: "100086",
    orderDate: "19 Oct 2023",
    orderTime: "04:59 PM",
    customerName: "Mr. Jhon parker",
    customerPhone: "8••••••••••",
    store: "Family supermarket",
    itemQuantity: 1,
    totalAmount: 868.0,
    isPaid: false,
    orderStatus: "Pending",
    deliveryType: "Home Delivery",
  },
  {
    id: 12,
    orderId: "100085",
    orderDate: "19 Oct 2023",
    orderTime: "04:57 PM",
    customerName: "bappy",
    customerPhone: "8••••••••••",
    store: "Family supermarket",
    itemQuantity: 1,
    totalAmount: 868.0,
    isPaid: true,
    orderStatus: "Confirmed",
    deliveryType: "Home Delivery",
  },
  {
    id: 13,
    orderId: "100084",
    orderDate: "19 Oct 2023",
    orderTime: "04:57 PM",
    customerName: "Mr. Jhon parker",
    customerPhone: "8••••••••••",
    store: "Online market",
    itemQuantity: 1,
    totalAmount: 785.6,
    isPaid: true,
    orderStatus: "Processing",
    deliveryType: "Home Delivery",
  },
  {
    id: 14,
    orderId: "100083",
    orderDate: "19 Oct 2023",
    orderTime: "04:55 PM",
    customerName: "Mr. Jhon parker",
    customerPhone: "8••••••••••",
    store: "Organic Shop",
    itemQuantity: 1,
    totalAmount: 558.0,
    isPaid: false,
    orderStatus: "Cancelled",
    deliveryType: "Home Delivery",
  },
  {
    id: 15,
    orderId: "100082",
    orderDate: "19 Oct 2023",
    orderTime: "04:52 PM",
    customerName: "bappy",
    customerPhone: "8••••••••••",
    store: "Online market",
    itemQuantity: 1,
    totalAmount: 692.8,
    isPaid: false,
    orderStatus: "Pending",
    deliveryType: "Home Delivery",
  },
];

const getStatusStyles = (status: Order["orderStatus"]) => {
  switch (status) {
    case "Pending":
      return "bg-orange-50 text-orange-600 border-orange-300";
    case "Delivered":
      return "bg-teal-50 text-teal-600 border-teal-300";
    case "Confirmed":
      return "bg-teal-50 text-teal-600 border-teal-300";
    case "Processing":
      return "bg-blue-50 text-blue-600 border-blue-300";
    case "Cancelled":
      return "bg-red-50 text-red-600 border-red-300";
    default:
      return "bg-gray-50 text-gray-600 border-gray-300";
  }
};

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Page Title */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
          All Orders
        </h1>
        <span className="px-2 py-0.5 bg-muted text-muted-foreground text-sm rounded-full">
          38
        </span>
      </div>

      {/* Orders Table Card */}
      <Card>
        <CardContent className="p-0">
          {/* Search and Actions Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 p-3 sm:p-4 border-b">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Ex: 10070"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 sm:w-48"
              />
              <Button
                size="icon"
                className="bg-primary hover:bg-primary/90 shrink-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="gap-2 flex-1 sm:flex-none"
                size="sm"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button
                variant="outline"
                className="gap-2 flex-1 sm:flex-none"
                size="sm"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              <Button
                variant="outline"
                className="gap-2 flex-1 sm:flex-none"
                size="sm"
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Columns</span>
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">SI</TableHead>
                  <TableHead>Order Id</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Customer Information</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead className="text-center">Item Quantity</TableHead>
                  <TableHead className="text-right">Total Amount</TableHead>
                  <TableHead className="text-center">Order Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordersData.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <span className="text-primary font-medium cursor-pointer hover:underline">
                        {order.orderId}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{order.orderDate}</div>
                        <div className="text-muted-foreground">
                          {order.orderTime}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div
                          className={
                            order.customerName.includes("Marjahan")
                              ? "text-primary"
                              : "text-foreground"
                          }
                        >
                          {order.customerName}
                        </div>
                        <div className="text-muted-foreground">
                          {order.customerPhone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {order.store}
                    </TableCell>
                    <TableCell className="text-center">
                      {order.itemQuantity}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="text-sm">
                        <div className="font-medium">
                          $ {order.totalAmount.toFixed(2)}
                        </div>
                        <div
                          className={
                            order.isPaid
                              ? "text-primary text-xs"
                              : "text-orange-500 text-xs"
                          }
                        >
                          {order.isPaid ? "Paid" : "Unpaid"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(order.orderStatus)}`}
                        >
                          {order.orderStatus}
                        </span>
                        <span
                          className={`text-xs ${order.deliveryType === "Take Away" ? "text-orange-500" : "text-muted-foreground"}`}
                        >
                          {order.deliveryType}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end p-3 sm:p-4 border-t">
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
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
        <div>© 2023-2024 Nigar. All rights reserved</div>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <a href="#" className="hover:text-primary">
            Profile
          </a>
          <a href="#" className="hover:text-primary">
            Home
          </a>
          <a href="#" className="hover:text-primary">
            Business Setting
          </a>
          <span className="text-primary font-medium">v 3.1</span>
        </div>
      </footer>
    </>
  );
};

export default Orders;
