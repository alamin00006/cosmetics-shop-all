"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Sparkles,
  Upload,
  Tag,
  DollarSign,
  Layers,
  Info,
  Store,
} from "lucide-react";

const AddNewItem = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">
            Add New Item
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            <Upload className="h-4 w-4 mr-2" />
            Add Info From Gallery
          </Button>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            See how it works! <Info className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Main Form */}
      <div className="space-y-6">
        {/* Name & Description Section */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Name & Description */}
              <div className="lg:col-span-2 space-y-6">
                <Tabs defaultValue="default" className="w-full">
                  <TabsList className="bg-transparent border-b rounded-none w-full justify-start gap-4 h-auto p-0">
                    <TabsTrigger
                      value="default"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 pb-2"
                    >
                      Default
                    </TabsTrigger>
                    <TabsTrigger
                      value="english"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 pb-2"
                    >
                      English(EN)
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="default" className="mt-6 space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="name">
                          Name (Default){" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80 h-auto p-0"
                        >
                          <Sparkles className="h-4 w-4 mr-1" />
                          Generate
                        </Button>
                      </div>
                      <Input id="name" placeholder="New food" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="description">
                          Short description (Default){" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80 h-auto p-0"
                        >
                          <Sparkles className="h-4 w-4 mr-1" />
                          Generate
                        </Button>
                      </div>
                      <Textarea
                        id="description"
                        placeholder="Enter short description..."
                        className="min-h-30 resize-y"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="english" className="mt-6 space-y-6">
                    <div>
                      <Label htmlFor="name-en">Name (English)</Label>
                      <Input
                        id="name-en"
                        placeholder="Enter name in English"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description-en">
                        Short description (English)
                      </Label>
                      <Textarea
                        id="description-en"
                        placeholder="Enter description in English"
                        className="mt-2 min-h-30"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right: Image Uploads */}
              <div className="space-y-6">
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Item image <span className="text-xs">(Ratio 1:1)</span>
                  </Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center min-h-[160px] hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Upload Image
                    </span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">
                    Item thumbnail <span className="text-destructive">*</span>{" "}
                    <span className="text-xs">(Ratio 1:1)</span>
                  </Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center min-h-[160px] hover:border-primary/50 transition-colors cursor-pointer relative">
                    <div className="absolute top-2 right-2 w-6 h-6 bg-muted rounded flex items-center justify-center">
                      <span className="text-xs">✏️</span>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Upload Image
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Store & Category Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Store className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Store & Category Info</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Generate
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <Label>
                  Store <span className="text-destructive">*</span>
                </Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select store" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="store1">Fresh Mart</SelectItem>
                    <SelectItem value="store2">Green Grocers</SelectItem>
                    <SelectItem value="store3">Super Foods</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="flex items-center gap-1">
                  Sub category{" "}
                  <Info className="h-3 w-3 text-muted-foreground" />
                </Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select Sub Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sub1">Organic</SelectItem>
                    <SelectItem value="sub2">Imported</SelectItem>
                    <SelectItem value="sub3">Local</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Unit</Label>
                <Select defaultValue="kg">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kg</SelectItem>
                    <SelectItem value="g">g</SelectItem>
                    <SelectItem value="l">L</SelectItem>
                    <SelectItem value="ml">ml</SelectItem>
                    <SelectItem value="pcs">Pcs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <Label className="flex items-center gap-1">
                  Nutrition <Info className="h-3 w-3 text-muted-foreground" />
                </Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Type your content and press enter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="protein">Protein</SelectItem>
                    <SelectItem value="carbs">Carbohydrates</SelectItem>
                    <SelectItem value="fat">Fat</SelectItem>
                    <SelectItem value="fiber">Fiber</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="flex items-center gap-1">
                  Allergen Ingredients{" "}
                  <Info className="h-3 w-3 text-muted-foreground" />
                </Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Type your content and press enter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gluten">Gluten</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="nuts">Nuts</SelectItem>
                    <SelectItem value="soy">Soy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-8 mt-6">
              <div className="flex items-center space-x-2">
                <Checkbox id="halal" />
                <Label htmlFor="halal" className="cursor-pointer">
                  Is It Halal
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="organic" />
                <Label htmlFor="organic" className="cursor-pointer">
                  Is organic
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Tags */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Search Tags</h2>
            </div>
            <Input placeholder="Search tags" />
          </CardContent>
        </Card>

        {/* Price Information */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Price Information</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Generate
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <Label>
                  Unit Price $ <span className="text-destructive">*</span>
                </Label>
                <Input type="number" defaultValue="0" className="mt-2" />
              </div>

              <div>
                <Label>Discount type</Label>
                <Select defaultValue="percent">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percent">Percent (%)</SelectItem>
                    <SelectItem value="amount">Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="flex items-center gap-1">
                  Discount <span className="text-destructive">*</span>{" "}
                  <Info className="h-3 w-3 text-muted-foreground" />
                </Label>
                <Input type="number" defaultValue="0" className="mt-2" />
              </div>

              <div>
                <Label className="flex items-center gap-1">
                  Maximum Purchase Quantity Limit{" "}
                  <Info className="h-3 w-3 text-muted-foreground" />
                </Label>
                <Input placeholder="Ex: 10" className="mt-2" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div>
                <Label>Total stock</Label>
                <Input type="number" className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attribute */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Attribute</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Generate
              </Button>
            </div>

            <div>
              <Label>Attribute</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select attribute" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="size">Size</SelectItem>
                  <SelectItem value="color">Color</SelectItem>
                  <SelectItem value="weight">Weight</SelectItem>
                  <SelectItem value="material">Material</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pb-6">
          <Button variant="outline" size="lg">
            Reset
          </Button>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNewItem;
