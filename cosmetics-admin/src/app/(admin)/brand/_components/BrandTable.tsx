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

import { getColumns } from "./Columns";
import { Brand } from "@/types/brand";

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

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  useGetBrandsQuery,
  useDeleteBrandMutation,
} from "@/redux/api/brandsApi";

import { toast } from "sonner";

interface Props {
  onAdd: () => void;
  onEdit: (brand: Brand) => void;
}

export default function BrandTable({ onAdd, onEdit }: Props) {
  /* ==============================
        STATES
     ============================== */
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  /* ==============================
        FETCH ALL DATA
     ============================== */
  const { data, isLoading, isError } = useGetBrandsQuery({
    page: 1,
    limit: 1000,
  });

  const [deleteBrand] = useDeleteBrandMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteBrand(id).unwrap();
      toast.success("Brand deleted successfully");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ==============================
        TABLE INSTANCE
     ============================== */
  const table = useReactTable<Brand>({
    data: data?.data ?? [],
    columns: getColumns(onEdit, handleDelete),
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
      {/* ==============================
            TOP SECTION
         ============================== */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        {/* Search */}
        <Input
          placeholder="Search brand..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full sm:w-72"
        />

        <div className="flex gap-2">
          {/* Column Toggle Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columns</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {typeof column.columnDef.header === "string"
                      ? column.columnDef.header
                      : column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Add Button */}
          <Button onClick={onAdd}>+ Add Brand</Button>
        </div>
      </div>

      {/* ==============================
            LOADING / ERROR
         ============================== */}
      {isLoading && (
        <div className="text-center py-10 text-muted-foreground">
          Loading brands...
        </div>
      )}

      {isError && (
        <div className="text-center py-10 text-red-500">
          Failed to load brands.
        </div>
      )}

      {/* ==============================
            TABLE
         ============================== */}
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
                        header.getContext(),
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
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No brands found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ==============================
            PAGINATION
         ============================== */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
