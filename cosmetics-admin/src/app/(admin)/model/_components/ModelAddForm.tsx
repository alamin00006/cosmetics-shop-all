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

import { useGetBrandsQuery } from "@/redux/api/brandsApi";
import {
  useCreateModelMutation,
  useUpdateModelMutation,
} from "@/redux/api/model.api";

import {
  Model,
  FuelType,
  CreateModelDto,
} from "@/types/model.types";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  editModel?: Model | null;
}

/* ==============================
   Static Body Types (Temporary)
================================ */
const BODY_TYPES = [
  "Sedan",
  "SUV",
  "MPV",
  "Coupe",
  "Hatchback",
  "Wagon",
];

export default function ModelAddForm({
  open,
  setOpen,
  editModel,
}: Props) {
  const [createModel] = useCreateModelMutation();
  const [updateModel] = useUpdateModelMutation();
  const { data: brands } = useGetBrandsQuery({ page: 1, limit: 1000 });

  const [formData, setFormData] = useState<{
    brandId: string;
    modelName: string;
    fuelType: FuelType;
    bodyType: string;
  }>({
    brandId: "",
    modelName: "",
    fuelType: "PETROL",
    bodyType: "",
  });

  /* ==============================
     Prefill Edit Data
  ============================== */
  useEffect(() => {
    if (editModel) {
      setFormData({
        brandId: String(editModel.brandId),
        modelName: editModel.modelName,
        fuelType: editModel.fuelType,
        bodyType: editModel.bodyType,
      });
    } else {
      setFormData({
        brandId: "",
        modelName: "",
        fuelType: "PETROL",
        bodyType: "",
      });
    }
  }, [editModel]);

  /* ==============================
     Submit
  ============================== */
  const handleSubmit = async () => {
    if (!formData.brandId) {
      toast.error("Brand is required");
      return;
    }

    if (!formData.modelName.trim()) {
      toast.error("Model name is required");
      return;
    }

    if (!formData.bodyType) {
      toast.error("Body type is required");
      return;
    }

    try {
      const payload: CreateModelDto = {
        brandId: Number(formData.brandId),
        modelName: formData.modelName.trim(),
        fuelType: formData.fuelType,
        bodyType: formData.bodyType,
      };

      if (editModel) {
        await updateModel({
          id: editModel.id,
          data: payload,
        }).unwrap();
        toast.success("Model updated successfully");
      } else {
        await createModel(payload).unwrap();
        toast.success("Model created successfully");
      }

      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:w-[450px]">
        <SheetHeader>
          <SheetTitle>
            {editModel ? "Edit Model" : "Add Model"}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">

             {/* ================= Model Name ================= */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Model Name
            </label>

            <Input
              placeholder="Enter model name"
              value={formData.modelName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  modelName: e.target.value,
                })
              }
            />
          </div>

          {/* ================= Brand ================= */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Brand
            </label>

            <select
              className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.brandId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  brandId: e.target.value,
                })
              }
            >
              <option value="">Select Brand</option>
              {brands?.data.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

        

          {/* ================= Fuel Type ================= */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Fuel Type
            </label>

            <select
              className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.fuelType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fuelType: e.target.value as FuelType,
                })
              }
            >
              <option value="PETROL">PETROL</option>
              <option value="DIESEL">DIESEL</option>
              <option value="HYBRID">HYBRID</option>
              <option value="ELECTRIC">ELECTRIC</option>
            </select>
          </div>

          {/* ================= Body Type ================= */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Body Type
            </label>

            <select
              className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.bodyType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bodyType: e.target.value,
                })
              }
            >
              <option value="">Select Body Type</option>
              {BODY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* ================= Submit ================= */}
          <Button onClick={handleSubmit} className="w-full">
            {editModel ? "Update Model" : "Save Model"}
          </Button>

        </div>
      </SheetContent>
    </Sheet>
  );
}
