import { getCurrentDate } from "@/lib/date_utils";
import { supabase } from "@/utils/supabase/client";

export async function buyStock(id: number, depot_id: number, worth: number) {
	const { data, error } = await supabase.schema("depots").rpc("buy_asset", {
		p_asset_id: id,
		p_depot_id: depot_id,
		p_worth: worth,
	});

	if (error) {
		console.error("Error buying stock:", error);
	} else {
		console.log("bought stock:", data);
	}
	return { error };
}

export async function sellStock(id: number, depot_id: number, worth: number) {
	const { data, error } = await supabase.schema("depots").rpc("sell_asset", {
		p_asset_id: id,
		p_depot_id: depot_id,
		p_worth: worth,
	});

	if (error) {
		console.error("Error buying stock:", error);
	} else {
		console.log("bought stock:", data);
	}
	return { error };
}
