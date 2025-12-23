"use server";

import {} from "@supabase/auth-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Database } from "@/database/types";
import { createClient } from "@/utils/supabase/server";
export async function login(email: string, password: string) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: email as string,
		password: password as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		return { error: error.message, success: false };
	}

	revalidatePath("/", "layout");

	return { error: null, success: true };
}

export async function createDepotAction() {
	const client = await createClient();
	const { data, error } = await client.auth.getUser();

	if (error || !data) {
		return error ?? new Error("Could not fetch user");
	}

	const uuid = data.user.id;

	return (
		await client.schema("depots").rpc("new_depot_for_user", { p_user_id: uuid })
	).error;
}

export async function createDepot(
	uuid: string,
	client: SupabaseClient<Database>,
) {
	return (
		await client.schema("depots").rpc("new_depot_for_user", { p_user_id: uuid })
	).error;
}

export async function signup(
	fullName: string,
	email: string,
	password: string,
	client?: SupabaseClient<Database>,
) {
	const c = client ?? (await createClient());
	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: email as string,
		password: password as string,
		options: {
			data: { name: fullName as string },
		},
	};

	const { error } = await c.auth.signUp(data);

	if (error) {
		return { error: error.message, success: false };
	}

	revalidatePath("/", "layout");

	return { error: null, success: true };
}

export async function logout(client?: SupabaseClient<Database>) {
	const c = client ?? (await createClient());

	await c.auth.signOut();
	revalidatePath("/", "layout");
	redirect("/login");
}
