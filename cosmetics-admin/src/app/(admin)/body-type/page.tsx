"use client";
import { BodyType } from "@/types/bodyType";
import { useState } from "react";
import BodyTypeTable from "./_components/BodyTypeTable";
import BodyTypeAddFrom from "./_components/BodyTypeAddForm";

const page = () => {
  const [open, setOpen] = useState(false);
  const [editBodyType, setEditBodyType] = useState<BodyType | null>(null);
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Body Type</h1>
      <BodyTypeTable
        onAdd={() => {
          setEditBodyType(null);
          setOpen(true);
        }}
        onEdit={(bodyType) => {
          setEditBodyType(bodyType);
          setOpen(true);
        }}
      />
      <BodyTypeAddFrom open={open} setOpen={setOpen} editBodyType={editBodyType} />
    </div>
  );
};

export default page;
