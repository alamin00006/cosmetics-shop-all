"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import dummyLogoImage from "@/assets/brand/dummyCar.png";
import { BodyType } from "@/types/bodyType";

export const getColumns = (
  onEdit: (bodyType: BodyType) => void,
  onDelete: (id: number) => void,
): ColumnDef<BodyType, any>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
      const icon = row.original.icon;

      return (
        <div className="flex justify-center">
          <img
            src={dummyLogoImage.src}
            //   src={logo || dummyLogoImage.src}
            alt="Body type icon"
            className="h-10 w-10 object-contain   border p-1 bg-muted rounded-full"
          />
        </div>
      );
    },
    enableSorting: false,
  },

  {
    accessorKey: "type",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const bodyType = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(bodyType)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(bodyType.id)}
              className="text-red-500"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
