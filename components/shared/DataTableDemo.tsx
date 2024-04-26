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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

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
import { PaginationItem } from "../ui/pagination"


const data: Payment[] = [
    {
        id: "#2001",
        number: '4204 49** **** 8705',
        name: "Cody Fisher",
        status: "Active",
        type: 'physical'
    },
    {
        id: "#2001",
        number: '4204 49** **** 8705',
        name: "Cody Fisher",
        status: "Active",
        type: 'physical'
    },
    {
        id: "#2001",
        number: '4204 49** **** 8705',
        name: "Cody Fisher",
        status: "Active",
        type: 'physical'
    },
    {
        id: "#2001",
        number: '4204 49** **** 8705',
        name: "Cody Fisher",
        status: "Active",
        type: 'physical'
    },
    {
        id: "#2001",
        number: '4204 49** **** 8705',
        name: "Cody Fisher",
        status: "Active",
        type: 'physical'
    },
    {
        id: "#2001",
        number: '4204 49** **** 8705',
        name: "Cody Fisher",
        status: "Active",
        type: 'physical'
    },
    {
        id: "#2001",
        number: '4204 49** **** 8705',
        name: "Cody Fisher",
        status: "Active",
        type: 'physical'
    },
    {
        id: "#2001",
        number: '4204 49** **** 8705',
        name: "Cody Fisher",
        status: "Active",
        type: 'physical'
    },
    {
        id: "#2001",
        number: '4204 49** **** 8705',
        name: "Cody Fisher",
        status: "Active",
        type: 'physical'
    },
    {
        id: "#2001",
        number: '4204 49** **** 8705',
        name: "Cody Fisher",
        status: "Active",
        type: 'physical'
    },
    {
        id: "#2001",
        number: '4204 49** **** 8705',
        name: "Cody Fisher",
        status: "Active",
        type: 'physical'
    },
    {
        id: "#2001",
        number: '4204 49** **** 8705',
        name: "Cody Fisher",
        status: "Active",
        type: 'physical'
    },
    {
        id: "#2001",
        number: '4204 49** **** 8705',
        name: "Cody Fisher",
        status: "Active",
        type: 'physical'
    },
    {
        id: "#2001",
        number: '4204 49** **** 8705',
        name: "Cody Fisher",
        status: "Active",
        type: 'physical'
    },
]

export type Payment = {
    id: string
    number: string
    name: string
    status: "Active" | "Pending" // Corrected status options
    type: string

}

export const columns: ColumnDef<Payment>[] = [

    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button

                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Refereance

                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
    },

    {
        accessorKey: "number",
        header: ({ column }) => {
            return (
                <Button

                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Number

                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("number")}</div>,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button

                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name

                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button

                    onClick={() => column.toggleSorting()}
                >
                    Status

                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>,
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
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Pause Card
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Viw Balance</DropdownMenuItem>
                        <DropdownMenuItem>View Settled Transaction</DropdownMenuItem>
                        <DropdownMenuItem>View Flooting Transaction</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function DataTableDemo() {
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
            <div className="flex flex-col gap-2">
                <div>
                <span className="text-white text-xl" >Good evening, Thomas</span>
                </div>
            
                <div className="p-2" style={{ background: '  #333333' }}>
                    <div>
                        <span>Outstanding balance</span>
                    </div>
                    <div>
                        $16,058.<span>94</span>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col gap-1">
                    <span className="text-white">Deposits History  </span>
                    <span className="text-sm"   style={{ color: '#a6a6a6' }}>*Every pending txn will be available up to 72 hours during banking days. (please be mindful that during holidays or weekends delays may occur)</span>
               </div>
               
                </div>
            </div>
            <div className="flex  py-2">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="w -full"
                />

            </div>
            <div className="rounded-md bord "
                style={{ color: ' #e6e6e6' }}
            >
                <Table>
                    <TableHeader

                    >
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
                                    className="h-10vh text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-center py-2">

            </div>
        </div>

    )
}
