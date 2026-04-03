"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Store,
  Image as ImageIcon,
  Upload,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";

const AddStore = () => {
  const [activeTab, setActiveTab] = useState("default");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessZone, setBusinessZone] = useState("");
  const [minDeliveryTime, setMinDeliveryTime] = useState("");
  const [maxDeliveryTime, setMaxDeliveryTime] = useState("");
  const [timeUnit, setTimeUnit] = useState("minute");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("********");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tinNumber, setTinNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");

  const handleReset = () => {
    setBusinessName("");
    setBusinessAddress("");
    setBusinessZone("");
    setMinDeliveryTime("");
    setMaxDeliveryTime("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setTinNumber("");
    setExpireDate("");
  };

  return (
    <>
      {/* Page Title */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Store className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
          Add New Store
        </h1>
      </div>

      {/* Basic Information */}
      <Card className="mb-6">
        <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
          <CardTitle className="text-lg">Basic Information</CardTitle>
          <CardDescription>
            Here you setup your all business information.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-transparent border-b rounded-none w-full justify-start gap-0 h-auto p-0 overflow-x-auto">
                  <TabsTrigger
                    value="default"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap"
                  >
                    Default
                  </TabsTrigger>
                  <TabsTrigger
                    value="en"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap"
                  >
                    English(EN)
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Business name (Default){" "}
                  <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder="Business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Business address (
                  <span className="text-primary">Default</span>){" "}
                  <span className="text-destructive">*</span>{" "}
                  <span className="ml-1 text-muted-foreground">ⓘ</span>
                </label>
                <Textarea
                  placeholder="Business address"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Business zone <span className="text-destructive">*</span>
                </label>
                <Select value={businessZone} onValueChange={setBusinessZone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zone1">Zone 1</SelectItem>
                    <SelectItem value="zone2">Zone 2</SelectItem>
                    <SelectItem value="zone3">Zone 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">
                  Estimated Delivery Time ( Min & Maximum Time){" "}
                  <span className="text-destructive">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <Input
                    placeholder="Ex : 30"
                    value={minDeliveryTime}
                    onChange={(e) => setMinDeliveryTime(e.target.value)}
                  />
                  <Input
                    placeholder="Ex : 60"
                    value={maxDeliveryTime}
                    onChange={(e) => setMaxDeliveryTime(e.target.value)}
                  />
                  <Select value={timeUnit} onValueChange={setTimeUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minute">Minute</SelectItem>
                      <SelectItem value="hour">Hour</SelectItem>
                      <SelectItem value="day">Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <h3 className="font-medium text-sm sm:text-base">
                  Set Business Location on Map
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Please mark the exact business location.
                </p>
              </div>
              <Input placeholder="Search here" className="mb-2" />
              <div className="h-60 sm:h-80 bg-muted rounded-lg border flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="text-3xl sm:text-4xl mb-2">🗺️</div>
                  <p className="text-sm">Map Placeholder</p>
                  <p className="text-xs">Select Zone From The Dropdown</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* General Setup */}
      <Card className="mb-6">
        <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
          <CardTitle className="text-lg">General Setup</CardTitle>
          <CardDescription>
            Setup your all business general settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <h4 className="font-medium mb-1">Business Logo & Covers</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Format : .jpg, .jpeg, .png, .gif, .webp. Less Than 2MB
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="border rounded-lg p-4 sm:p-6">
              <h5 className="text-center font-medium mb-4">
                Business Cover <span className="text-destructive">*</span>
              </h5>
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center">
                <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50 mb-2" />
                <span className="text-primary text-sm">Add Image</span>
                <span className="text-xs text-muted-foreground">Ratio 2:1</span>
              </div>
            </div>
            <div className="border rounded-lg p-4 sm:p-6">
              <h5 className="text-center font-medium mb-4">
                Business Logo <span className="text-destructive">*</span>
              </h5>
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center">
                <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50 mb-2" />
                <span className="text-primary text-sm">Add Image</span>
                <span className="text-xs text-muted-foreground">Ratio 1:1</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Owner Info */}
      <Card className="mb-6">
        <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
          <CardTitle className="text-lg">Business Owner Info</CardTitle>
          <CardDescription>Setup your business information</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                First name <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Last name <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone <span className="text-destructive">*</span>
              </label>
              <div className="flex">
                <div className="flex items-center px-2 sm:px-3 border border-r-0 rounded-l-md bg-muted">
                  <span className="text-xs sm:text-sm">🇺🇸 +1</span>
                </div>
                <Input
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-l-none"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card className="mb-6">
        <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
          <CardTitle className="text-lg">Account Information</CardTitle>
          <CardDescription>Setup your account credentials</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email <span className="text-destructive">*</span>
              </label>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Password <span className="text-muted-foreground">ⓘ</span>{" "}
                <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm password <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="8+ characters required"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business TIN */}
      <Card className="mb-6">
        <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
          <CardTitle className="text-lg">Business TIN</CardTitle>
          <CardDescription>Setup your Business TIN</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">
                  Taxpayer Identification Number(TIN)
                </label>
                <Input
                  placeholder="Type Your Taxpayer Identification Number(TIN)"
                  value={tinNumber}
                  onChange={(e) => setTinNumber(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Expire Date
                </label>
                <Input
                  type="date"
                  placeholder="mm/dd/yyyy"
                  value={expireDate}
                  onChange={(e) => setExpireDate(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 lg:text-right">
                TIN Certificate
              </label>
              <p className="text-xs text-muted-foreground lg:text-right mb-2">
                Pdf, doc, jpg. File size : max 2 MB
              </p>
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center relative">
                <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground text-center">
                  Select a file or{" "}
                  <span className="font-medium text-foreground">
                    Drag & Drop
                  </span>{" "}
                  Here
                </p>
                <Button
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-primary"
                >
                  <span className="text-primary-foreground">✎</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mb-6">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Save className="h-4 w-4" />
          Save Information
        </Button>
      </div>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
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

export default AddStore;
