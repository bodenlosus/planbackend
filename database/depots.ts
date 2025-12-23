import type { ApolloClient } from "@apollo/client";
import { gql } from "@apollo/client";
import type { User } from "@supabase/supabase-js";
import type { Asset, StockPosition } from "@/database/custom_types";
import type { Database } from "@/database/types";
import { gql as gqlq } from "@/gql/gql";
import type { GetPositionsQuery } from "@/gql/graphql";
import { getDateCertainDaysAgo, toISODateOnly } from "@/lib/date_utils";

type PositionProfits = Database["depots"]["Views"]["position_profits"]["Row"];
type DepotValue = Database["depots"]["Views"]["values"]["Row"];

export function processDepotValues(edges: DepotValue[]) {
	const nodes: Array<{
		total: number;
		assets: number;
		cash: number;
		timestamp: string;
	}> = [];

	if (edges.length == 0) {
		return null;
	}

	const total = edges[0].assets! + edges[0].cash!;
	let startValue = total;

	let maxValue = total;
	let minValue = total;

	for (const edge of edges) {
		const total = edge.cash! + edge.assets!;
		nodes.push({
			total: total,
			assets: edge.assets!,
			cash: edge.cash!,
			timestamp: edge.tstamp!,
		});
		minValue = Math.min(minValue, total);
		maxValue = Math.max(maxValue, total);
	}

	startValue = Math.min(50000, startValue);

	const offset =
		Math.abs(maxValue - (startValue ?? 0)) / Math.abs(maxValue - minValue);

	return {
		data: nodes,
		min: minValue,
		max: maxValue,
		start: startValue,
		offset,
	};
}
