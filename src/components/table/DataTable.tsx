"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../ui/button";
import arrow from "../../assets/icons/arrow.svg";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isPaginationEnabled: boolean;
  isHeaderTrue: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isPaginationEnabled = true,
  isHeaderTrue = true,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="data-table">
      <Table className="shad-table">
        {isHeaderTrue ? (
          <TableHeader className="bg-light-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="shad-table-row-header">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        ) : (
          <TableHeader className="bg-light-200">
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                <div className="flex items-center justify-between w-full p-4">
                  <div className="text-18-bold text-dark-200">
                    <span>Recent Transactions</span>
                  </div>
                  <Link
                    to={"/activity/transactions"}
                    className="flex items-center bg-slate-100 px-2 py-1 rounded-md text-12-semibold text-dark-200"
                  >
                    View All{" "}
                    <ChevronRight
                      style={{
                        height: "16px",
                        width: "16px",
                        fontWeight: "semibold",
                        marginLeft: "4px",
                        marginRight: "0px",
                      }}
                    />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="shad-table-row"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isPaginationEnabled && (
        <div className="table-actions">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="shad-gray-btn cursor-pointer"
          >
            <img src={arrow} width={24} height={24} alt="arrow" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="shad-gray-btn cursor-pointer"
          >
            <img
              src={arrow}
              width={24}
              height={24}
              alt="arrow"
              className="rotate-180"
            />
          </Button>
        </div>
      )}
    </div>
  );
}
