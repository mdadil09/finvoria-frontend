/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "../../lib/utils";
import StatusBadge from "../ui/StatusBadge";

export const columns = (): ColumnDef<any>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img
          src={row.original.image}
          alt={row.original.name}
          height={100}
          width={100}
          className="size-8 rounded-full"
        />
        <p className="whitespace-nowrap text-12-semibold">
          {row.original.name}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <p className="text-12-semibold text-dark-600 min-w-[100px]">
        {formatDate(row.original.date)}
      </p>
    ),
  },
  {
    accessorKey: "amount",
    header: () => "Amount",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <p className="whitespace-nowrap text-12-semibold" text-12-semibold>
            ₹{row.original.amount}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => "Status",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <p className="whitespace-nowrap">
            <StatusBadge status={row.original.status} />
          </p>
        </div>
      );
    },
  },
];
