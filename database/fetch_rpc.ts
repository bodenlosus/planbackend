import type { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase/client";
import type { Database } from "./supabase_types";

type TRpcResponse<T> =
	| {
			data: T;
			error: null;
			count: number | null;
	  }
	| {
			data: null;
			error: PostgrestError;
			count: null;
	  };

export async function executeRpc<ArgT extends Record<string, unknown>, ReturnT>(
	rpcName: string,
	params: ArgT,
	options?: { count?: "exact" | "planned" | "estimated" },
): Promise<TRpcResponse<ReturnT>> {
	const response = await supabase.rpc(rpcName, params, options);

	if (response.error) {
		console.error(`Error fetching ${rpcName}:`, response.error);
		return {
			data: null,
			error: response.error,
			count: response.count,
		};
	}
	if (!response.count) {
		console.warn(`No data found when fetching ${rpcName}:`);
	}
	return {
		data: response.data,
		error: null,
		count: response.count,
	};
}

export type RpcFunction<
	TFunction extends keyof Database["public"]["Functions"],
> = {
	Args: Database["public"]["Functions"][TFunction]["Args"];
	Returns: Database["public"]["Functions"][TFunction]["Returns"];
};

// Create a function that fetches data for any RPC function in the database
export function fetchRpc<
	TFunction extends keyof Database["public"]["Functions"],
>(
	rpcName: TFunction, // Accept the function name
	params: RpcFunction<TFunction>["Args"], // Accept the function's parameters
) {
	return executeRpc<
		RpcFunction<TFunction>["Args"],
		RpcFunction<TFunction>["Returns"]
	>(rpcName, params, { count: "estimated" });
}
