import { useState } from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableHeader,
} from "~/components/ui/table";
import { api } from "~/utils/api";
import { type inferRouterOutputs } from "@trpc/server";
import { type teamRouter } from "~/server/api/routers/team";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type VisibilityState,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Team, TeamProgress } from "@prisma/client";

interface MembersRow {
  members: { college: { name: string } }[];
}

export default function ParticipantsTable({
  data,
  dataRefecth
}: {
  data:
    | inferRouterOutputs<typeof teamRouter>["getTeamsList"]
    | null
    | undefined;
  dataRefecth: () => void;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const moveToTop100 = api.team.moveToTop100.useMutation( 
    {
      onSuccess: async () => {
        dataRefecth();
        toast.success("Moved to Top 100");
        toast.dismiss('moveToTop100');

      },
      onError: (e) => {
        toast.error(e.message);
      }
    }
  );

  const resetProgress = api.team.resetTeamProgress.useMutation(
    {
      onSuccess: async () => {
        dataRefecth();
        toast.success("Progress Reset");
        toast.dismiss('resetProgress');
      },
      onError: (e) => {
        toast.error(e.message);
      }
    }
  )

  if(resetProgress.isLoading){
    toast.loading("Resetting Progress", {id: 'resetProgress'});
  }
  
  if(moveToTop100.isLoading){
    toast.loading("Moving to Top 100", {id: 'moveToTop100'});
  }

  const verifyUser = api.user.verifyUser.useMutation();

  const columns: ColumnDef<
    unknown,
    inferRouterOutputs<typeof teamRouter>["getTeamsList"]
  >[] = [
    {
      accessorKey: "id",
      header: "Team ID",
    },
    {
      accessorKey: "name",
      header: "Team Name",
    },
    {
      accessorKey: "members",
      header: "College",
      cell: (members) => (
        <span>
          {(members.row.original as MembersRow).members[0]!.college.name}
        </span>
      ),
    },
    {
      accessorKey: "referral",
      header: "Referral",
      cell: (referral) => (
        <span>
          {referral.getValue()
            ? `HF2024_${(
                "00" +
                (
                  referral.row.original as {
                    referral: { id: string };
                  }
                ).referral?.id
              ).slice(-3)}`
            : "No"}
        </span>
      ),
    },
    {
      accessorKey: 'ValidatorTotalScore',
      header: 'Validator Score',
    },
    {
      accessorKey: 'teamProgress',
      header: 'Progress',
    },
    {
      accessorKey: 'teamProgress',
      header: 'Actions',
      cell: (cell) => {
        return(
          <>
            <button className={`${(cell.cell.row.original as Team).teamProgress === 'SEMI_SELECTED' ? 'bg-green-700 text-white' : 'bg-white text-black'} px-4 py-2 rounded-lg`}
              onClick={async () => {
                await moveToTop100.mutateAsync({
                  teamId: (cell.cell.row.original as Team).id
                })
              }}
            >
              Top 100
            </button>
          </>
        )
      }
    },
    {
      accessorKey: 'teamProgress',
      header: 'Actions',
      cell: (cell) => {
        return(
          <>
            <button className={`${(cell.cell.row.original as Team).teamProgress === 'NOT_SELECTED' ? 'pointer-events-none' : 'bg-red-400 text-black'} px-4 py-2 rounded-lg`}
              onClick={async () => {
                await resetProgress.mutateAsync({
                  teamId: (cell.cell.row.original as Team).id
                })
              }}
            >
              Reset
            </button>
          </>
        )
      }
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
    },
  ];

  const table = useReactTable({
    data: data ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    // onRowSelectionChange: getSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Teams Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </div>
      </div>
    </>
  );
}
