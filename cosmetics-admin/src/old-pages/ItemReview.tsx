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
  Star,
  Eye,
  Trash2,
  MessageSquare,
} from "lucide-react";

const reviewItems = [
  {
    id: 1,
    product: "Brown Bread",
    image: "/placeholder.svg",
    customer: "John Doe",
    rating: 5,
    comment: "Excellent product! Fresh and tasty.",
    date: "2024-01-15",
    status: true,
  },
  {
    id: 2,
    product: "Lipton Yellow Label Tea",
    image: "/placeholder.svg",
    customer: "Jane Smith",
    rating: 4,
    comment: "Good quality tea, will buy again.",
    date: "2024-01-14",
    status: true,
  },
  {
    id: 3,
    product: "Nutella Hazelnut Cocoa",
    image: "/placeholder.svg",
    customer: "Mike Johnson",
    rating: 3,
    comment: "Average taste, expected better.",
    date: "2024-01-13",
    status: false,
  },
  {
    id: 4,
    product: "Blue Grapes",
    image: "/placeholder.svg",
    customer: "Sarah Wilson",
    rating: 5,
    comment: "Very fresh and sweet grapes!",
    date: "2024-01-12",
    status: true,
  },
  {
    id: 5,
    product: "Ferrero Rocher Chocolate",
    image: "/placeholder.svg",
    customer: "Tom Brown",
    rating: 4,
    comment: "Delicious as always.",
    date: "2024-01-11",
    status: true,
  },
];

const renderStars = (rating: number) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-4 w-4 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
      />
    ))}
  </div>
);

const ItemReview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [reviews, setReviews] = useState(reviewItems);
  const toggleReviewStatus = (id: number) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, status: !review.status } : review,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold">Item Reviews</h1>
        <span className="bg-muted text-muted-foreground text-sm px-2 py-0.5 rounded">
          {reviews.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{reviews.length}</p>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-500/10">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">4.2</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <Star className="h-6 w-6 text-green-500 fill-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {reviews.filter((r) => r.rating === 5).length}
                </p>
                <p className="text-sm text-muted-foreground">5 Star Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-destructive/10">
                <Star className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {reviews.filter((r) => r.rating <= 2).length}
                </p>
                <p className="text-sm text-muted-foreground">Low Ratings</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Reset
              </Button>
              <Button className="flex-1">Filter</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Input
                  placeholder="Ex : search by product or customer"
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
                  <TableHead>Product</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="max-w-xs">Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={review.image}
                          alt={review.product}
                          className="h-10 w-10 rounded-lg object-cover bg-muted"
                        />
                        <span className="font-medium">{review.product}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {review.customer}
                    </TableCell>
                    <TableCell>{renderStars(review.rating)}</TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {review.comment}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {review.date}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={review.status}
                        onCheckedChange={() => toggleReviewStatus(review.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                        >
                          <Eye className="h-4 w-4" />
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

export default ItemReview;
