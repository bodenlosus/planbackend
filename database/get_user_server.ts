import { createClient } from "@/utils/supabase/server";

export const getUser = async () => {
	const supabase = await createClient();
	const user = await supabase.auth.getUser();
	return user.data.user;
};
