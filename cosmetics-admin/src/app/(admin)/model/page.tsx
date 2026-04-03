"use client";

import React, { useState } from "react";

import ModelTable from "./_components/ModelTable";
import ModelAddForm from "./_components/ModelAddForm";
import { Model } from "@/types/model.types";

export default function ModelPage() {
  const [open, setOpen] = useState(false);
  const [editModel, setEditModel] = useState<Model | null>(null);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Model</h1>

      <ModelTable
        onAdd={() => {
          setEditModel(null);
          setOpen(true);
        }}
        onEdit={(model) => {
          setEditModel(model);
          setOpen(true);
        }}
      />

      <ModelAddForm open={open} setOpen={setOpen} editModel={editModel} />
    </div>
  );
}
