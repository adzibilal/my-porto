"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { DataTableViewOptions } from "@/components/table/data-table-view-options"

import { priorities, statuses } from "@/constants/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Cari Nama..."
          value={(table.getColumn("fullname")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("fullname")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
       
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
