"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,

} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const data: Payment[] = [
    {
        id: "1",
        txid:'2vu3n3565wfnw56n45b8',
        status: "Settled Transaction ",
   

      },
      {
        id: "2",
        txid:'2vu3n3565wfnw56n45b8',
        status: "Settled Transaction ",

      },
      {
        id: "4",
        txid:'2vu3n3565wfnw56n45b8',
        status: "Settled Transaction ",

      },
      {
        id: "5",
        txid:'2vu3n3565wfnw56n45b8',
        status: "Settled Transaction ",

      },
      {
        id: "6",
        txid:'2vu3n3565wfnw56n45b8',
        status: "Settled Transaction ",

      },
      {
        id: "7",
        txid:'2vu3n3565wfnw56n45b8',
        status: "Settled Transaction ",

      }, 
      {
      id: "8",
      txid:'2vu3n3565wfnw56n45b8',
      status: "Settled Transaction ",
      },
      {
        id: "9",
        txid:'2vu3n3565wfnw56n45b8',
        status: "Settled Transaction ",

      },
      {
        id: "10",
        txid:'2vu3n3565wfnw56n45b8',
        status: "Settled Transaction ",
      },
      
]

export type Payment = {
    id: string
    txid: string
    status: "Settled Transaction " | "Non Transactions"
  
}

export const columns: ColumnDef<Payment>[] = [
 
    {
        accessorKey: "id",
        header: ({ column }) => {
          return (
            <Button
              
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              ID
        
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
      },

      {
        accessorKey: "txid",
        header: ({ column }) => {
          return (
            <Button
    
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              TX ID
        
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("txid")}</div>,
      },
      {
        accessorKey: "txid",
        header: ({ column }) => {
          return (
            <Button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
          
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("txid")}</div>,
      },
 
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
       
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Action

        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>,
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
        
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
        
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
        
        </DropdownMenu>
      )
    },
  },
]

export function TransactionData() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full "
    style={{ background: '#212224CC' }} 
    >
      <div className="flex items-center ">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
       
      </div>
      <div className="rounded-md border"
      style={{color:' #e6e6e6' ,  borderColor: '#404040' }}
      >
        <Table className="" >
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
                            header.getContext()
                          )}
                    </TableHead>
                  )
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
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-20 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end  py-1">

      </div>
    </div>
  )
}
