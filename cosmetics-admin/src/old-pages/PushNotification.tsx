"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  Bell,
  Search,
  Download,
  Pencil,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

interface Notification {
  id: number;
  title: string;
  description: string;
  image: string | null;
  zone: string;
  target: string;
  status: boolean;
}

const notificationsData: Notification[] = [
  {
    id: 1,
    title: "Hello customer",
    description: "Get the best car for rent ...",
    image: "/placeholder.svg",
    zone: "All",
    target: "CUSTOMER",
    status: true,
  },
  {
    id: 2,
    title: "Hello customer",
    description: "We just spotted your favo ...",
    image: null,
    zone: "All",
    target: "CUSTOMER",
    status: true,
  },
  {
    id: 3,
    title: "Hello All Store",
    description: "We have a buy-one-get-one ...",
    image: "/placeholder.svg",
    zone: "All",
    target: "STORE",
    status: true,
  },
  {
    id: 4,
    title: "Hello customer",
    description: "Hello customer, Now we ...",
    image: "/placeholder.svg",
    zone: "All",
    target: "CUSTOMER",
    status: true,
  },
];

const PushNotification = () => {
  const [title, setTitle] = useState("");
  const [zone, setZone] = useState("all");
  const [sendTo, setSendTo] = useState("customer");
  const [description, setDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(notificationsData);

  const toggleStatus = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: !n.status } : n)),
    );
  };
  const handleReset = () => {
    setTitle("");
    setZone("all");
    setSendTo("customer");
    setDescription("");
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
          Notification
        </h1>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  placeholder="New notification"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Zone</label>
                  <Select value={zone} onValueChange={setZone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="zone1">Zone 1</SelectItem>
                      <SelectItem value="zone2">Zone 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Send to
                  </label>
                  <Select value={sendTo} onValueChange={setSendTo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="store">Store</SelectItem>
                      <SelectItem value="deliveryman">Delivery Man</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <Textarea
                  placeholder="Enter notification description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Image <span className="text-destructive">*</span>
                  <span className="text-primary text-xs ml-1">
                    ( Ratio 900×300 )
                  </span>
                </label>
                <div className="border-2 border-dashed border-primary/30 rounded-lg bg-primary/5 aspect-[3/1] flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-primary/40 mx-auto" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex-1">
                  Choose File
                </Button>
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  No file chosen
                </span>
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
                <Button className="bg-primary hover:bg-primary/90">
                  Send Notification
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 border-b">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Notification List</h2>
              <span className="px-2 py-0.5 bg-muted text-muted-foreground text-sm rounded-full">
                {notifications.length}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search notification"
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
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-16">SL</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Zone</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.map((notification) => (
                  <TableRow key={notification.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">
                      {notification.id}
                    </TableCell>
                    <TableCell>
                      <span className="text-primary font-medium whitespace-nowrap">
                        {notification.title}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-muted-foreground">
                      {notification.description}
                    </TableCell>
                    <TableCell>
                      {notification.image ? (
                        <img
                          src={notification.image}
                          alt="Notification"
                          className="w-20 h-12 object-cover rounded"
                        />
                      ) : (
                        <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded whitespace-nowrap">
                          No Image
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{notification.zone}</TableCell>
                    <TableCell>{notification.target}</TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={notification.status}
                        onCheckedChange={() => toggleStatus(notification.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
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
        </CardContent>
      </Card>

      <footer className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
        <div>© Nigar. 2021-2026 Nigar.</div>
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          <a href="#" className="hover:text-primary">
            Business setup
          </a>
          <span className="hidden sm:inline">•</span>
          <a href="#" className="hover:text-primary">
            Profile
          </a>
          <span className="hidden sm:inline">•</span>
          <a href="#" className="hover:text-primary">
            Home
          </a>
          <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
            v 3.6
          </span>
        </div>
      </footer>
    </>
  );
};

export default PushNotification;
