"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FileSpreadsheet, CheckCircle2, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";

const exportFields = [
  { id: "name", label: "Product Name", checked: true },
  { id: "category", label: "Category", checked: true },
  { id: "price", label: "Price", checked: true },
  { id: "stock", label: "Stock Quantity", checked: true },
  { id: "description", label: "Description", checked: false },
  { id: "store", label: "Store", checked: true },
  { id: "status", label: "Status", checked: false },
  { id: "created_at", label: "Created Date", checked: false },
  { id: "updated_at", label: "Updated Date", checked: false },
  { id: "images", label: "Image URLs", checked: false },
];

const BulkExport = () => {
  const [selectedStore, setSelectedStore] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("xlsx");
  const [fields, setFields] = useState(exportFields);

  const toggleField = (id: string) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, checked: !field.checked } : field,
      ),
    );
  };
  const selectAll = () => {
    setFields(fields.map((field) => ({ ...field, checked: true })));
  };
  const deselectAll = () => {
    setFields(fields.map((field) => ({ ...field, checked: false })));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Download className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold">Bulk Export</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Filter Products
              </CardTitle>
              <CardDescription>Select which products to export</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Store</Label>
                  <Select
                    value={selectedStore}
                    onValueChange={setSelectedStore}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select store" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All stores</SelectItem>
                      <SelectItem value="eorange">Eorange</SelectItem>
                      <SelectItem value="sk-general">
                        Sk General Store
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="dairy">Dairy & Eggs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Export Format</Label>
                  <Select
                    value={selectedFormat}
                    onValueChange={setSelectedFormat}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                      <SelectItem value="csv">CSV (.csv)</SelectItem>
                      <SelectItem value="json">JSON (.json)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-medium">
                    Select Fields
                  </CardTitle>
                  <CardDescription>
                    Choose which fields to include in the export
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={selectAll}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={deselectAll}>
                    Deselect All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {fields.map((field) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={field.id}
                      checked={field.checked}
                      onCheckedChange={() => toggleField(field.id)}
                    />
                    <label
                      htmlFor={field.id}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {field.label}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              Reset
            </Button>
            <Button className="flex-1 gap-2">
              <Download className="h-4 w-4" />
              Export Products
            </Button>
          </div>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Export Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Store</span>
                <span className="font-medium">
                  {selectedStore === "all" ? "All stores" : selectedStore}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">
                  {selectedCategory === "all"
                    ? "All categories"
                    : selectedCategory}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Format</span>
                <span className="font-medium uppercase">{selectedFormat}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Fields</span>
                <span className="font-medium">
                  {fields.filter((f) => f.checked).length} selected
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Est. Products</span>
                <span className="font-medium">~156 items</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Recent Exports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                  <FileSpreadsheet className="h-8 w-8 text-green-600" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      all_products.xlsx
                    </p>
                    <p className="text-xs text-muted-foreground">
                      156 products
                    </p>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                  <FileSpreadsheet className="h-8 w-8 text-blue-600" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      eorange_dairy.csv
                    </p>
                    <p className="text-xs text-muted-foreground">42 products</p>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                  <FileSpreadsheet className="h-8 w-8 text-orange-600" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      bakery_items.json
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Processing...
                    </p>
                  </div>
                  <Clock className="h-4 w-4 text-orange-500 shrink-0 animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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

export default BulkExport;
