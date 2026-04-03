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
import { BodyType } from "@/types/bodyType";
import {
  useCreateBodyTypeMutation,
  useUpdateBodyTypeMutation,
} from "@/redux/api/bodyTypesApi";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  editBodyType?: BodyType | null;
}

/* ==============================
   STATIC IMAGE URL (for backend for now)
================================ */
const STATIC_IMAGE_URL = "https://via.placeholder.com/100x100.png?text=BodyType";

export default function BodyTypeAddFrom({ open, setOpen, editBodyType }: Props) {
  const [createBodyType, { isLoading: creating }] = useCreateBodyTypeMutation();
  const [updateBodyType, { isLoading: updating }] = useUpdateBodyTypeMutation();

  const [formData, setFormData] = useState({ type: "" });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<{
    type?: string;
  }>({});

  /* ==============================
     Prefill Edit Data
  ============================== */
  useEffect(() => {
    if (editBodyType) {
      setFormData({
        type: editBodyType.type || "",
      });

      setImagePreview(editBodyType.icon || null);
    } else {
      setFormData({ type: "" });
      setImagePreview(null);
    }
  }, [editBodyType]);

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

    if (!formData.type.trim()) {
      newErrors.type = "Body type is required";
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
      type: formData.type.trim(),
      icon: STATIC_IMAGE_URL,
    };
    console.log(payload);

    try {
      if (editBodyType) {
        await updateBodyType({
          id: editBodyType.id,
          data: payload,
        }).unwrap();

        toast.success("Body type updated successfully");
      } else {
        console.log("create");

        await createBodyType(payload).unwrap();
        toast.success("Body type created successfully");
      }

      setOpen(false);

      // ✅ reset form after success
      setFormData({ type: "" });
    } catch (err: any) {
      console.log("API ERROR:", err);
      toast.error(err?.data?.message || "Failed to save Body Type");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:w-[450px]">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">
            {editBodyType ? "Edit Body Type" : "Add Body Type"}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-7 mt-8">
          {/* ================= Body Type ================= */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">
              Body Type
            </label>

            <Input
              placeholder="Enter Body Type"
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value,
                })
              }
              className="h-11 rounded-lg border border-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-primary"
            />

            {errors.type && (
              <p className="text-sm text-red-500">{errors.type}</p>
            )}
          </div>

          {/* ================= Icon Upload ================= */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">
              Icon
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
            {editBodyType
              ? updating
                ? "Updating..."
                : "Update Body Type"
              : creating
                ? "Saving..."
                : "Save Body Type"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
