"use client";

import React, { useState } from "react";
import BrandTable from "./_components/BrandTable";
import BrandAddForm from "./_components/BrandAddForm";
import { Brand } from "@/types/brand";

export default function page() {
  const [open, setOpen] = useState(false);
  const [editBrand, setEditBrand] = useState<Brand | null>(null);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Car Master</h1>

      <BrandTable
        onAdd={() => {
          setEditBrand(null);
          setOpen(true);
        }}
        onEdit={(brand) => {
          setEditBrand(brand);
          setOpen(true);
        }}
      />

      <BrandAddForm open={open} setOpen={setOpen} editBrand={editBrand} />
    </div>
  );
}
