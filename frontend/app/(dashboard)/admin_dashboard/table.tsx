"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  Ban,
  Check,
  Edit,
  KeyRound,
  LogOut,
  MoreVertical,
  Trash2,
  X,
} from "lucide-react";
import * as React from "react";
import Tooltip from "@/components/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UserOverview } from "@/database/custom_types";
import { relativeDateString } from "@/lib/date_utils";

interface AdminUsersTableProps {
  data: UserOverview[];
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export function AdminUsersTable({ data }: AdminUsersTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const columnVisibility: VisibilityState = {
    id: false,
  };
  const [rowSelection, setRowSelection] = React.useState({});
  const [editingRowId, setEditingRowId] = React.useState<string | null>(null);
  const [editedData, setEditedData] = React.useState<{
    user_name?: string | null;
    email?: string | null;
  }>({});

  const handleEdit = (row: Row<UserOverview>) => {
    setEditingRowId(row.id);
    setEditedData({
      user_name: row.original.user_name ?? undefined,
      email: row.original.email,
    });
  };

  const handleSave = async (row: Row<UserOverview>) => {
    // Implement save logic here
    console.log("Saving user:", row.original.id, editedData);
    setEditingRowId(null);
    setEditedData({});
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setEditedData({});
  };

  const handleDeleteUser = (userId: string) => {
    console.log("Delete user:", userId);
  };

  const handleBanUser = (userId: string) => {
    console.log("Ban user:", userId);
  };

  const handleLogOutUser = (userId: string) => {
    console.log("Log out user:", userId);
  };

  const handleChangePassword = (userId: string) => {
    console.log("Change password for user:", userId);
  };

  const updateEditedData = (field: keyof typeof editedData, value: string) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const columns: ColumnDef<UserOverview>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Alle auswählen"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Auswählen"
          disabled={editingRowId === row.id}
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      id: "id",
      accessorKey: "id",
      enableHiding: true,
    },
    {
      accessorKey: "user_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const isEditing = editingRowId === row.id;
        const userName = row.getValue("user_name") as string | null;

        if (isEditing) {
          return (
            <Input
              type="text"
              autoFocus
              value={editedData.user_name ?? userName ?? ""}
              onChange={(e) => updateEditedData("user_name", e.target.value)}
              className="h-8"
            />
          );
        }

        return <div>{userName ?? "-"}</div>;
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          E-Mail
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const isEditing = editingRowId === row.id;
        const email = row.getValue("email") as string;

        if (isEditing) {
          return (
            <Input
              type="email"
              value={editedData.email ?? email}
              onChange={(e) => updateEditedData("email", e.target.value)}
              className="h-8"
            />
          );
        }

        return <div className="font-mono text-sm">{email}</div>;
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Erstellt
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const created = row.getValue("created_at") as string;
        return (
          <div className="flex flex-row gap-2">
            <span>{formatDate(created)}</span>
            <span className="text-muted-foreground font-normal">
              {relativeDateString(new Date(created), "never")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "depot_count",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Depots
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const count = row.getValue("depot_count") as number;
        return <div className="text-center">{count}</div>;
      },
    },
    {
      accessorKey: "position_count",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Positionen
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const count = row.getValue("position_count") as number;
        return <div className="text-center">{count}</div>;
      },
    },
    {
      accessorKey: "transaction_count",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaktionen
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const count = row.getValue("transaction_count") as number;
        return <div className="text-center">{count}</div>;
      },
    },
    {
      accessorKey: "user_roles",
      header: "Rollen",
      cell: ({ row }) => {
        const roles = row.original.user_roles;
        const grantedAt = row.original.role_granted_at;

        if (!roles || roles.length === 0) {
          return "-";
        }

        return (
          <div className="flex gap-1 flex-wrap">
            {roles.map((role, index) => {
              const granted = grantedAt?.[index];

              const badge = <Badge variant="secondary">{role}</Badge>;
              if (!granted) {
                return badge;
              }
              return (
                <Tooltip
                  key={role}
                  name={`Erteilt: ${relativeDateString(new Date(granted), "necessary")}`}
                >
                  {badge}
                </Tooltip>
              );
            })}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      size: 100,
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        const isEditing = editingRowId === row.id;
        const userId = row.getValue("id") as string;

        if (isEditing) {
          return (
            <ButtonGroup>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleSave(row)}
              >
                <Check className="stroke-emerald-600" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleCancel}>
                <X className="stroke-muted-foreground/50" />
              </Button>
            </ButtonGroup>
          );
        }

        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEdit(row)}
            >
              <Edit />
              <span className="sr-only">Bearbeiten</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="size-4" />
                  <span className="sr-only">Aktionen öffnen</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleChangePassword(userId)}>
                  <KeyRound className="mr-2 size-4" />
                  Passwort ändern
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLogOutUser(userId)}>
                  <LogOut className="mr-2 size-4" />
                  Ausloggen
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleBanUser(userId)}>
                  <Ban className="mr-2 size-4" />
                  Benutzer sperren
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDeleteUser(userId)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 size-4" />
                  Benutzer löschen
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: () => {},
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="overflow-hidden rounded-md border grow">
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
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={editingRowId === row.id ? "bg-muted/50" : ""}
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
                  Keine Benutzer gefunden.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} von{" "}
          {table.getFilteredRowModel().rows.length} Zeile(n) ausgewählt.
        </div>
        <ButtonGroup className="justify-end">
          <Tooltip name="Vorherige Seite">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              variant="outline"
              size="icon"
            >
              <ArrowLeft aria-label="Vorherige Seite" />
            </Button>
          </Tooltip>
          <Tooltip name="Nächste Seite">
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              variant="outline"
              size="icon"
            >
              <ArrowRight aria-label="Nächste Seite" />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </div>
    </div>
  );
}
