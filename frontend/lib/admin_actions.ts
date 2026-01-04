"use server";

import type { Client } from "@/database/custom_types";
import { createClient as createAdminClient } from "@/utils/supabase/admin";
import { createClient as createServerClient } from "@/utils/supabase/server";
import { hasSpecialRoles } from "./db";

export async function deleteUser(id: string) {
  const client = await createAdminClient();
  {
    const { error, hasPermission } = await hasSpecialRoles(["teacher"], client);
    if (error || !hasPermission) {
      return {
        error: error || new Error("Could not verify permissions"),
      };
    }
  }

  const { error } = await client.auth.admin.deleteUser(id);

  return {
    error,
  };
}

export async function banUser(id: string, ban_duration: string) {
  const client = await createAdminClient();
  {
    const { error, hasPermission } = await hasSpecialRoles(["teacher"], client);
    if (error || !hasPermission) {
      return {
        error: error || new Error("Could not verify permissions"),
      };
    }
  }
  const { error } = await client.auth.admin.updateUserById(id, {
    ban_duration,
  });

  return {
    error,
  };
}

export async function unbanUser(id: string) {
  const client = await createAdminClient();
  {
    const { error, hasPermission } = await hasSpecialRoles(["teacher"], client);
    if (error || !hasPermission) {
      return {
        error: error || new Error("Could not verify permissions"),
      };
    }
  }
  const { error } = await client.auth.admin.updateUserById(id, {
    ban_duration: "none",
  });

  return {
    error,
  };
}

type UpdateUserOptions = Parameters<
  Client["auth"]["admin"]["updateUserById"]
>[1];

export async function updateUser(
  id: string,
  {
    email,
    user_name,
  }: Partial<{
    email: string | null;
    user_name: string | null;
  }>,
) {
  if (!email && !user_name) {
    return {};
  }
  const client = await createAdminClient();
  {
    const { error, hasPermission } = await hasSpecialRoles(["teacher"], client);
    if (error || !hasPermission) {
      return {
        error: error || new Error("Could not verify permissions"),
      };
    }
  }

  // const {
  //   data: { user },
  //   error: userError,
  // } = await client.auth.admin.getUserById(id);

  // if (userError || !user) {
  //   return { error: userError ?? new Error("User not found") };
  // }

  const attributes: UpdateUserOptions = {
    ...(email && { email }),
    user_metadata: {
      // ...user.user_metadata // you could do that but its actually not necessary
      ...(email && { email }),
      ...(user_name && { name: user_name }),
    },
  };

  const { error: updateError } = await client.auth.admin.updateUserById(
    id,
    attributes,
  );

  if (updateError) {
    return { error: updateError };
  }
  return {};
}

export async function changePassword(id: string, password: string) {
  const client = await createAdminClient();
  {
    const { error, hasPermission } = await hasSpecialRoles(["teacher"], client);
    if (error || !hasPermission) {
      return {
        error: error || new Error("Could not verify permissions"),
      };
    }
  }

  const { error: updateError } = await client.auth.admin.updateUserById(id, {
    password,
  });

  if (updateError) {
    return { error: updateError };
  }
  return {};
}

export async function newUser({
  email,
  password,
  user_name,
}: {
  email: string;
  password: string;
  user_name: string;
}) {
  const client = await createAdminClient();
  {
    const { error, hasPermission } = await hasSpecialRoles(["teacher"], client);
    if (error || !hasPermission) {
      return {
        error: error || new Error("Could not verify permissions"),
      };
    }
  }

  const { error: createError } = await client.auth.admin.createUser({
    email,
    password,
    user_metadata: {
      name: user_name,
    },
  });

  if (createError) {
    return { error: createError };
  }
  return {};
}

export async function grantTeacher(user_id: string) {
  const client = await createServerClient();
  {
    const { error, hasPermission } = await hasSpecialRoles(["teacher"], client);
    if (error || !hasPermission) {
      return {
        error: error || new Error("Could not verify permissions"),
      };
    }
  }

  const { error: updateError } = await client
    .schema("users")
    .rpc("grant_teacher", { p_user_id: user_id });

  if (updateError) {
    return { error: updateError };
  }
  return {};
}
export async function revokeTeacher(user_id: string) {
  const client = await createServerClient();
  {
    const { error, hasPermission } = await hasSpecialRoles(["teacher"], client);
    if (error || !hasPermission) {
      return {
        error: error || new Error("Could not verify permissions"),
      };
    }
  }

  const { error: updateError } = await client
    .schema("users")
    .rpc("revoke_teacher", { p_user_id: user_id });

  if (updateError) {
    return { error: updateError };
  }
  return {};
}

export async function changeBudget(depot_id: number, budget: number) {
  const client = await createServerClient();
  {
    const { error, hasPermission } = await hasSpecialRoles(["teacher"], client);
    if (error || !hasPermission) {
      return {
        error: error || new Error("Could not verify permissions"),
      };
    }
  }

  const { error: updateError } = await client
    .schema("depots")
    .rpc("change_budget", { p_depot_id: depot_id, p_budget: budget });

  if (updateError) {
    return { error: updateError };
  }
  return {};
}
