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
import { PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from "../ui/pagination";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
import { Pagination, PaginationLink } from "../ui/pagination"

const data: Payment[] = [
    {
        id: "1",
        txid:'2vu3n3565wfnw56n45b8',
        amount:"766.1",
        origincurrency:"USDT",
        source:'Deposite',
        type:'Immedate',
        status: "Completed",
        datetype:' 28 Nov 2024, 8:23:00 PM'

      },
      {
        id: "2",
        txid:'2vu3n3565wfnw56n45b8',
        amount:"766.1",
        origincurrency:"USDT",
        source:'Deposite',
        type:'Immedate',
        status: "Completed",
        datetype:' 28 Nov 2024, 8:23:00 PM'

      },
      {
        id: "3",
        txid:'2vu3n3565wfnw56n45b8',
        amount:"766.1",
        origincurrency:"USDT",
        source:'Deposite',
        type:'Immedate',
        status: "Completed",
        datetype:' 28 Nov 2024, 8:23:00 PM'

      },
      {
        id: "4",
        txid:'2vu3n3565wfnw56n45b8',
        amount:"766.1",
        origincurrency:"USDT",
        source:'Deposite',
        type:'Immedate',
        status: "Completed",
        datetype:' 28 Nov 2024, 8:23:00 PM'

      },
      {
        id: "5",
        txid:'2vu3n3565wfnw56n45b8',
        amount:"766.1",
        origincurrency:"USDT",
        source:'Deposite',
        type:'Immedate',
        status: "Completed",
        datetype:' 28 Nov 2024, 8:23:00 PM'

      },
      {
        id: "6",
        txid:'2vu3n3565wfnw56n45b8',
        amount:"766.1",
        origincurrency:"USDT",
        source:'Deposite',
        type:'Immedate',
        status: "Completed",
        datetype:' 28 Nov 2024, 8:23:00 PM'

      },
      {
        id: "7",
        txid:'2vu3n3565wfnw56n45b8',
        amount:"766.1",
        origincurrency:"USDT",
        source:'Deposite',
        type:'Immedate',
        status: "Completed",
        datetype:' 28 Nov 2024, 8:23:00 PM'

      }, {
        id: "8",
        txid:'2vu3n3565wfnw56n45b8',
        amount:"766.1",
        origincurrency:"USDT",
        source:'Deposite',
        type:'Immedate',
        status: "Completed",
        datetype:' 28 Nov 2024, 8:23:00 PM'

      },
      {
        id: "9",
        txid:'2vu3n3565wfnw56n45b8',
        amount:"766.1",
        origincurrency:"USDT",
        source:'Deposite',
        type:'Immedate',
        status: "Completed",
        datetype:' 28 Nov 2024, 8:23:00 PM'

      },
      {
        id: "10",
        txid:'2vu3n3565wfnw56n45b8',
        amount:"766.1",
        origincurrency:"USDT",
        source:'Deposite',
        type:'Immedate',
        status: "Completed",
        datetype:' 28 Nov 2024, 8:23:00 PM'

      },
      {
        id: "11",
        txid:'2vu3n3565wfnw56n45b8',
        amount:"766.1",
        origincurrency:"USDT",
        source:'Deposite',
        type:'Immedate',
        status: "Completed",
        datetype:' 28 Nov 2024, 8:23:00 PM'

      },
      
]

export type Payment = {
    id: string
    txid: string
    amount: string
    origincurrency:string
    source:string
    status: "Completed" | "Pending" // Corrected status options
    type: string
    datetype:string
  
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
              TXID
             
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("txid")}</div>,
      },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
       
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
        
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "origincurrency",
    header: ({ column }) => {
      return (
        <Button
          
          onClick={() => column.toggleSorting()}
        >
          Origin Currency
        
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("origincurrency")}</div>,
  },
  {
    accessorKey: "source",
    header: ({ column }) => {
      return (
        <Button
        
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Source
       
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("source")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
    
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
        
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
        
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>,
  },

  {
    accessorKey: "datetype",
    header: ({ column }) => {
      return (
        <Button
    
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
       
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("datetype")}</div>,
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

export function DepositsData() {
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
    <div className="w-full items-start"
   
    style={{ background: '#212224CC' }} 
    >
      <div className="flex  py-2">
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
         style={{color:' #e6e6e6', borderColor: '#404040'  }}
      >
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
      <div className="flex items-center justify-center  py-1">
      <Pagination>
        <PaginationPrevious  />
        
            1
        <PaginationEllipsis/>
        556 57 58 
        <PaginationEllipsis/>
        100
    
        <PaginationNext/>
      </Pagination>
        </div>
      </div>

  )
}
