"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import {
  useCreateBrandMutation,
  useUpdateBrandMutation,
} from "@/redux/api/brandsApi";

import { Brand } from "@/types/brand";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  editBrand?: Brand | null;
}

/* ==============================
   STATIC IMAGE URL (for backend for now)
================================ */
const STATIC_IMAGE_URL = "https://via.placeholder.com/100x100.png?text=Brand";

export default function BrandAddForm({ open, setOpen, editBrand }: Props) {
  const [createBrand, { isLoading: creating }] = useCreateBrandMutation();
  const [updateBrand, { isLoading: updating }] = useUpdateBrandMutation();

  const [formData, setFormData] = useState({
    name: "",
    country: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<{
    name?: string;
    country?: string;
  }>({});

  /* ==============================
     Prefill Edit Data
  ============================== */
  useEffect(() => {
    if (editBrand) {
      setFormData({
        name: editBrand.name || "",
        country: editBrand.country || "",
      });

      setImagePreview(editBrand.logo || null);
    } else {
      setFormData({
        name: "",
        country: "",
      });
      setImagePreview(null);
    }
  }, [editBrand]);

  /* ==============================
     Handle Image Select
  ============================== */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  /* ==============================
     Validation
  ============================== */
  const validate = () => {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Brand name is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ==============================
     Submit Handler
  ============================== */
  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      name: formData.name.trim(),
      country: formData.country.trim(),
      logo: STATIC_IMAGE_URL,
    };
    console.log(payload);

    try {
      if (editBrand) {
        await updateBrand({
          id: editBrand.id,
          data: payload,
        }).unwrap();

        toast.success("Brand updated successfully");
      } else {
        console.log("create");

        await createBrand(payload).unwrap();
        toast.success("Brand created successfully");
      }

      setOpen(false);

      // ✅ reset form after success
      setFormData({
        name: "",
        country: "",
      });
    } catch (err: any) {
      console.log("API ERROR:", err);
      toast.error(err?.data?.message || "Failed to save brand");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:w-[450px]">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">
            {editBrand ? "Edit Brand" : "Add Brand"}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-7 mt-8">
          {/* ================= Brand Name ================= */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">
              Brand Name
            </label>

            <Input
              placeholder="Enter brand name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="h-11 rounded-lg border border-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-primary"
            />

            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* ================= Country ================= */}
          <div className="space-y-3 ">
            <label className="text-sm font-medium text-muted-foreground ">
              Country
            </label>

            <Input
              placeholder="Enter country"
              value={formData.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  country: e.target.value,
                })
              }
              className="h-11 rounded-lg border border-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-primary"
            />

            {errors.country && (
              <p className="text-sm text-red-500">{errors.country}</p>
            )}
          </div>

          {/* ================= Image Upload ================= */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">
              Brand Logo
            </label>

            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="h-11 rounded-lg border border-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-primary"
            />

            {imagePreview && (
              <div className="flex justify-center mt-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-24 w-24 object-contain rounded-lg border p-2 bg-muted"
                />
              </div>
            )}
          </div>

          {/* ================= Submit ================= */}
          <Button
            className="w-full h-11 mt-4 rounded-lg"
            onClick={handleSubmit}
            disabled={creating || updating}
          >
            {editBrand
              ? updating
                ? "Updating..."
                : "Update Brand"
              : creating
                ? "Saving..."
                : "Save Brand"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
