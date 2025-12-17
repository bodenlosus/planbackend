"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import type { Asset } from "@/database/custom_types";
import Link from "next/link";
import { getStockPagePath } from "../../../lib/get_stock_path";

interface props {
  stocks: Array<Asset>;
}
export function StockList({ stocks }: props) {
  return (
    <div className="grid grid-flow-row gap-5 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {stocks.map((stock) => (
        <StockEntry key={stock.id} stock={stock} />
      ))}
    </div>
  );
}

function StockEntry({ stock }: { stock: Asset }) {
  const navigationLink = getStockPagePath(stock.id);
  return (
    <Link href={navigationLink}>
      <Card>
        <CardHeader>
          <CardTitle>
            {stock.symbol} - {stock.name}
          </CardTitle>
          <Separator />
          <CardDescription>{stock.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
