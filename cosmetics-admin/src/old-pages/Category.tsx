"use client";

import { useState } from "react";
import {
  Pencil,
  Trash2,
  Upload,
  Search,
  Download,
  ChevronDown,
  Grid3X3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const categories = [
  {
    id: 129,
    name: "Spices",
    status: true,
    featured: false,
    priority: "Normal",
  },
  {
    id: 102,
    name: "Cooking",
    status: true,
    featured: false,
    priority: "Medium",
  },
  {
    id: 101,
    name: "Household",
    status: true,
    featured: false,
    priority: "Medium",
  },
  {
    id: 12,
    name: "Fresh Produce",
    status: true,
    featured: false,
    priority: "High",
  },
  {
    id: 11,
    name: "Dairy & Eggs",
    status: true,
    featured: false,
    priority: "High",
  },
  { id: 10, name: "Meat", status: true, featured: false, priority: "High" },
  { id: 9, name: "Seafood", status: true, featured: false, priority: "High" },
  { id: 8, name: "Bakery", status: true, featured: false, priority: "High" },
  { id: 7, name: "Beverages", status: true, featured: false, priority: "High" },
  { id: 6, name: "Frozen", status: true, featured: false, priority: "High" },
];

const Category = () => {
  const [activeTab, setActiveTab] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-teal-600";
      case "Medium":
        return "text-teal-500";
      default:
        return "text-foreground";
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Grid3X3 className="h-5 w-5 text-primary" />
        <h1 className="text-lg sm:text-xl font-semibold">Add New Category</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4 sm:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-0 overflow-x-auto">
              <TabsTrigger
                value="default"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap"
              >
                Default
              </TabsTrigger>
              <TabsTrigger
                value="english"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap"
              >
                English(EN)
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <Label className="text-sm font-medium">
                  Name (Default) <span className="text-destructive">*</span>
                </Label>
                <Input placeholder="New category" className="mt-1.5" />
              </div>
              <div>
                <Label className="text-sm font-medium">Priority</Label>
                <Select defaultValue="normal">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">
                Image <span className="text-destructive">*</span>{" "}
                <span className="text-primary text-xs">( Ratio 1:1 )</span>
              </Label>
              <div className="mt-1.5 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 flex flex-col items-center justify-center min-h-[150px] sm:min-h-[180px] relative">
                <button className="absolute top-2 right-2 p-1.5 bg-muted rounded">
                  <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Upload Image
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" className="px-6 sm:px-8">
              Reset
            </Button>
            <Button className="px-6 sm:px-8 bg-primary hover:bg-primary/90">
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Category List</h2>
              <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded">
                15
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="relative">
                <Input
                  placeholder="Search categories"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pr-10"
                />
                <Button
                  size="icon"
                  className="absolute right-0 top-0 h-full rounded-l-none bg-primary hover:bg-primary/90"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">SI</TableHead>
                  <TableHead className="font-semibold">Id</TableHead>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Featured</TableHead>
                  <TableHead className="font-semibold">Priority</TableHead>
                  <TableHead className="font-semibold text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category, index) => (
                  <TableRow key={category.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{category.id}</TableCell>
                    <TableCell className="font-medium whitespace-nowrap">
                      {category.name}
                    </TableCell>
                    <TableCell>
                      <Switch checked={category.status} />
                    </TableCell>
                    <TableCell>
                      <Switch checked={category.featured} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className={getPriorityColor(category.priority)}>
                          {category.priority}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 ${getPriorityColor(category.priority)}`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
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
        </CardContent>
      </Card>
    </>
  );
};

export default Category;
