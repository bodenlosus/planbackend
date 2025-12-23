import { getDateCertainDaysAgo, toISODateOnly } from "@/lib/date_utils";

export function getStockPagePath(id: number, days = 30): string {
	return `/stock/${id}`;
}
