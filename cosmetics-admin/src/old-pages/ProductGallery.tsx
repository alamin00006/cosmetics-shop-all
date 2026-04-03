"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Images } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    name: "Fresh Green Peas",
    image: "/placeholder.svg",
    category: "Dairy & Eggs",
    subCategory: "Dairy & Eggs",
    isOrganic: "No",
    isVegan: "Yes",
    unit: "Kg",
    variations: [] as string[],
    tags: [] as string[],
    description:
      "This pea is most commonly the small spherical seed or the seed-pod of the pod fruit Pisum sativum.",
  },
  {
    id: 2,
    name: "Marie Frozen Meal",
    image: "/placeholder.svg",
    category: "Frozen",
    subCategory: "Frozen Meals",
    isOrganic: "No",
    isVegan: "No",
    unit: "Pack",
    variations: [] as string[],
    tags: [] as string[],
    description:
      "Enjoy the delicious flavors of home-cooked meals with Marie Frozen Meal.",
  },
  {
    id: 3,
    name: "Boneless Chicken",
    image: "/placeholder.svg",
    category: "Meat",
    subCategory: "Chicken",
    isOrganic: "No",
    isVegan: "No",
    unit: "Kg",
    variations: [] as string[],
    tags: [] as string[],
    description:
      "Premium, fresh boneless chicken breast and thigh cuts, ready to cook.",
  },
  {
    id: 4,
    name: "Chicken Tender Vegan",
    image: "/placeholder.svg",
    category: "Health",
    subCategory: "Vegan",
    isOrganic: "Yes",
    isVegan: "Yes",
    unit: "Pack",
    variations: [] as string[],
    tags: [] as string[],
    description:
      "Indulge in our Chicken Tender Vegan, a delicious plant-based alternative.",
  },
  {
    id: 5,
    name: "OZ Tub Light Butter",
    image: "/placeholder.svg",
    category: "Dairy & Eggs",
    subCategory: "Butter",
    isOrganic: "No",
    isVegan: "No",
    unit: "Pcs",
    variations: [] as string[],
    tags: [] as string[],
    description: "Enjoy the rich, creamy taste of OZ Tub Light Butter.",
  },
];

const ProductGallery = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Images className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold">Product Gallery</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Select>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All stores" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stores</SelectItem>
            <SelectItem value="eorange">Eorange</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All category</SelectItem>
            <SelectItem value="bakery">Bakery</SelectItem>
            <SelectItem value="dairy">Dairy & Eggs</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Ex: search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
          <Button className="gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {galleryItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                <div className="w-full lg:w-32 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <Button variant="outline" size="sm" className="w-fit">
                      Use This Product Info
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        General Information
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex gap-2">
                          <span className="text-muted-foreground">
                            Category:
                          </span>
                          <span className="text-primary">{item.category}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-muted-foreground">
                            Sub Category:
                          </span>
                          <span className="text-primary">
                            {item.subCategory}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-muted-foreground">
                            Is Organic:
                          </span>
                          <span>{item.isOrganic}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-muted-foreground">
                            Is Vegan:
                          </span>
                          <span>{item.isVegan}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-muted-foreground">Unit:</span>
                          <span>{item.unit}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        Available Variations
                      </h4>
                      <p className="text-sm text-muted-foreground italic">
                        {item.variations.length > 0
                          ? item.variations.join(", ")
                          : "—"}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        Tags
                      </h4>
                      <p className="text-sm text-muted-foreground italic">
                        {item.tags.length > 0 ? item.tags.join(", ") : "—"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Description:
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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

export default ProductGallery;
