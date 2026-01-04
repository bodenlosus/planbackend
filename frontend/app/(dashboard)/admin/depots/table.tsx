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
  Check,
  Coins,
  Edit,
  MoreVertical,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import SimpleAlertDialog from "@/components/simple_alert_dialog";
import SimpleDialog from "@/components/simple_dialog";
import Tooltip from "@/components/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
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
import { DepotOverview } from "@/database/custom_types";
import { changeBudget } from "@/lib/admin_actions";
import { currencyFormat } from "@/lib/cash_display_string";
import { cn } from "@/lib/utils";

interface DepotTableProps {
  data: DepotOverview[];
  className?: string;
}

const formatCurrency = (value: number | null) => {
  if (value === null) return "-";
  return currencyFormat.format(value);
};

const handleError = ({ error }: { error?: Error | null }) => {
  if (error) {
    console.error(error);
    toast.error(`${error.name && `${error.name}: `}${error.message}`);
  }
};

export function DepotTable({ data, className }: DepotTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const columnVisibility: VisibilityState = {
    user_ids: false,
    all_ids: false,
  };
  const [rowSelection, setRowSelection] = React.useState({});
  const [editingRowId, setEditingRowId] = React.useState<string | null>(null);
  const [editedData, setEditedData] = React.useState<{
    monthly_budget?: number | null;
  }>({});

  const router = useRouter();

  const handleEdit = (row: Row<DepotOverview>) => {
    setEditingRowId(row.id);
    setEditedData({
      monthly_budget: row.original.monthly_budget,
    });
  };

  const handleSave = async (row: Row<DepotOverview>) => {
    console.log("Saving depot:", row.original.id, editedData);
    const depot_id = row.original.id;
    const monthly_budget = editedData?.monthly_budget;

    if (!depot_id) {
      toast.error("Depot ID fehlt");
      return;
    }

    if (monthly_budget) {
      changeBudget(depot_id, monthly_budget).then(handleError);
    }

    setEditingRowId(null);
    setEditedData({});
    router.refresh();
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setEditedData({});
  };

  const updateEditedData = (field: keyof typeof editedData, value: string) => {
    const numValue = value === "" ? null : parseFloat(value);
    setEditedData((prev) => ({ ...prev, [field]: numValue }));
  };

  const columns: ColumnDef<DepotOverview>[] = [
    {
      id: "user_ids",
      accessorKey: "user_ids",
      enableHiding: true,
    },
    {
      id: "all_ids",
      accessorKey: "all_ids",
      enableHiding: true,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const id = row.getValue("id") as number;
        return <div className="font-mono">{id}</div>;
      },
    },
    {
      accessorKey: "cash",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bargeld
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const cash = row.getValue("cash") as number | null;
        return <div className="number">{formatCurrency(cash)}</div>;
      },
    },
    {
      accessorKey: "cash_start",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Startkapital
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const cashStart = row.getValue("cash_start") as number | null;
        return <div className="number">{formatCurrency(cashStart)}</div>;
      },
    },
    {
      accessorKey: "monthly_budget",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Monatliches Budget
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const isEditing = editingRowId === row.id;
        const monthlyBudget = row.getValue("monthly_budget") as number | null;

        if (isEditing) {
          return (
            <Input
              type="number"
              step="0.01"
              autoFocus
              value={editedData.monthly_budget ?? monthlyBudget ?? ""}
              onChange={(e) =>
                updateEditedData("monthly_budget", e.target.value)
              }
              className="h-8 number"
            />
          );
        }

        return <div className="number">{formatCurrency(monthlyBudget)}</div>;
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
        const count = row.getValue("position_count") as number | null;
        return <div className="text-center">{count ?? 0}</div>;
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
        const count = row.getValue("transaction_count") as number | null;
        return <div className="text-center">{count ?? 0}</div>;
      },
    },
    {
      accessorKey: "user_names",
      header: "Benutzer",
      cell: ({ row }) => {
        const userNames = row.original.user_names;
        const userIds = row.original.user_ids;

        if (
          !userNames ||
          userNames.length === 0 ||
          !userIds ||
          userIds.length === 0
        ) {
          return <span className="text-muted-foreground">-</span>;
        }

        return (
          <div className="flex gap-1 flex-wrap">
            {userNames.map((name, i) => {
              const userId = userIds[i];
              return (
                <Badge key={userId} variant="secondary">
                  {name}
                </Badge>
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
        const depotId = row.getValue("id") as number;

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
          <ButtonGroup>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEdit(row)}
            >
              <Edit />
              <span className="sr-only">Bearbeiten</span>
            </Button>
            <DotsMenu depotId={depotId} />
          </ButtonGroup>
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
    <div className="flex flex-col gap-4 h-full w-full max-w-full">
      <div className={cn("border rounded-lg p-2", className)}>
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
                  Keine Depots gefunden.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-row items-center justify-between gap-2">
        <Button
          size="icon"
          onClick={() => toast.info("Neues Depot (noch nicht implementiert)")}
        >
          <Plus />
        </Button>
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

function DotsMenu({ depotId }: { depotId: number }) {
  "use client";

  const [open, setOpen] = React.useState<"grantBudget" | null>(null);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const router = useRouter();

  const forms: Record<
    string,
    { title: string; description: string; content: React.ReactNode }
  > = {
    grantBudget: {
      title: "Monatliches Budget gewähren",
      description: "Geben Sie den zusätzlichen monatlichen Budgetbetrag ein.",
      content: (
        <GrantBudgetForm
          depotId={depotId}
          onSubmit={(amount) => {
            console.log("Granting budget:", depotId, amount);
            // TODO: Add API call
            toast.success(
              "Budget gewährt (API-Aufruf noch nicht implementiert)",
            );
            setOpen(null);
            router.refresh();
          }}
        />
      ),
    },
  };

  const dialogs = (
    <>
      <SimpleDialog
        key={1}
        open={Boolean(open)}
        onOpenChange={() => setOpen(null)}
        title={open && forms[open].title}
        description={open && forms[open].description}
      >
        {open && forms[open].content}
      </SimpleDialog>
      <SimpleAlertDialog
        key={2}
        open={alertOpen}
        onOpenChange={(open) => setAlertOpen(open)}
        title="Depot löschen"
        description="Sind Sie sicher, dass Sie dieses Depot löschen möchten?"
        cancel="Abbrechen"
        confirm="Löschen"
        onConfirm={() => {
          console.log("Deleting depot:", depotId);
          // TODO: Add API call
          toast.success("Depot gelöscht (API-Aufruf noch nicht implementiert)");
          router.refresh();
        }}
      />
    </>
  );

  return (
    <>
      {dialogs}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreVertical className="size-4" />
            <span className="sr-only">Aktionen öffnen</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpen("grantBudget")}>
            <Coins className="mr-2 size-4" />
            Monatliches Budget gewähren
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setAlertOpen(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 size-4" />
            Depot löschen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function GrantBudgetForm({
  depotId,
  onSubmit,
}: {
  depotId: number;
  onSubmit: (amount: number) => void;
}) {
  const [amount, setAmount] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Bitte geben Sie einen gültigen Betrag ein");
      return;
    }
    onSubmit(numAmount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="text-sm font-medium">
          Betrag (€)
        </label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          required
          className="mt-1"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit">Bestätigen</Button>
      </div>
    </form>
  );
}
