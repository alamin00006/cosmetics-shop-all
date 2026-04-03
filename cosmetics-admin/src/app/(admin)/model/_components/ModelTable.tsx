"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
 

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

 

import { toast } from "sonner";
import { Model } from "@/types/model.types";
import { useDeleteModelMutation, useGetModelsQuery } from "@/redux/api/model.api";
import { getModelColumns } from "./ModelColumns";

interface Props {
  onAdd: () => void;
  onEdit: (model: Model) => void;
}

export default function ModelTable({ onAdd, onEdit }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const { data, isLoading, isError } = useGetModelsQuery({
    page: 1,
    limit: 1000,
  });

  const [deleteModel] = useDeleteModelMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteModel(id).unwrap();
      toast.success("Model deleted successfully");
    } catch {
      toast.error("Delete failed");
    }
  };

  const table = useReactTable<Model>({
    data: data?.data ?? [],
    columns: getModelColumns(onEdit, handleDelete),
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">

      {/* Top Section */}
      <div className="flex justify-between gap-3">
        <Input
          placeholder="Search model..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-72"
        />

        <Button onClick={onAdd}>+ Add Model</Button>
      </div>

      {isLoading && <div className="text-center py-8">Loading...</div>}
      {isError && <div className="text-center text-red-500">Error loading models</div>}

      {!isLoading && !isError && (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No models found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
