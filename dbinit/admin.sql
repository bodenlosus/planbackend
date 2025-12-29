CREATE SCHEMA IF NOT EXISTS users;
GRANT USAGE ON SCHEMA users TO authenticated;

CREATE TYPE users.special_role AS ENUM (
    'admin',
    'teacher'
);

CREATE TABLE users.special_roles (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    user_role users.special_role NOT NULL,
    granted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY(user_id, user_role)
);

CREATE OR REPLACE FUNCTION users.grant_role(p_user_id UUID, p_user_role users.special_role)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO users.special_roles (user_id, user_role) VALUES (p_user_id, p_user_role);
END;
$$;

GRANT EXECUTE ON FUNCTION users.grant_role(UUID, users.special_role) TO authenticated;

CREATE OR REPLACE FUNCTION users.revoke_role(p_user_id UUID, p_user_role users.special_role)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM users.special_roles
    WHERE user_id = p_user_id
    AND user_role = p_user_role;
END;
$$;

GRANT EXECUTE ON FUNCTION users.revoke_role(UUID, users.special_role) TO authenticated;


CREATE OR REPLACE FUNCTION users.has_role(required_role users.special_role)
RETURNS BOOLEAN AS $$
BEGIN
    IF auth.uid() IS NULL THEN
        RETURN FALSE;
    END IF;
    
    RETURN EXISTS (
        SELECT 1 FROM users.special_roles
        WHERE user_id = auth.uid() AND user_role = required_role
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
GRANT EXECUTE ON FUNCTION users.has_role(users.special_role) TO authenticated;

-- Check if user has ANY of the specified roles
CREATE OR REPLACE FUNCTION users.has_any_role(VARIADIC required_roles users.special_role[])
RETURNS BOOLEAN AS $$
BEGIN
    IF auth.uid() IS NULL THEN
        RETURN FALSE;
    END IF;

    RETURN EXISTS (
        SELECT 1 FROM users.special_roles
        WHERE user_id = auth.uid() 
        AND user_role = ANY(required_roles)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

GRANT EXECUTE ON FUNCTION users.has_any_role(VARIADIC users.special_role[]) TO authenticated;

GRANT SELECT ON users.special_roles TO authenticated;
GRANT UPDATE ON users.special_roles TO authenticated;
GRANT INSERT ON users.special_roles TO authenticated;
GRANT DELETE ON users.special_roles TO authenticated;

ALTER TABLE users.special_roles ENABLE ROW LEVEL SECURITY;

-- Users can read their own role
CREATE POLICY "Users can view own role"
ON users.special_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Only admins can update roles
CREATE POLICY "Admins can update roles"
ON users.special_roles FOR UPDATE
TO authenticated
USING (users.has_role('admin'));

-- Admins can insert new user roles
CREATE POLICY "Admins can insert roles"
ON users.special_roles FOR INSERT
TO authenticated
WITH CHECK (users.has_role('admin'));

-- Admins can delete user roles
CREATE POLICY "Admins can delete roles"
ON users.special_roles FOR DELETE
TO authenticated
USING (users.has_role('admin'));

-- Teachers - Depots 
CREATE POLICY "Teachers can view all Depots"
ON depots.depots FOR SELECT TO authenticated
USING (users.has_role('teacher'));

CREATE POLICY "Teachers can edit all Depots"
ON depots.depots FOR UPDATE TO authenticated
USING (users.has_role('teacher'));

CREATE POLICY "Teachers can insert Depots"
ON depots.depots FOR INSERT TO authenticated
WITH CHECK (users.has_role('teacher'));

CREATE POLICY "Teachers can delete Depots"
ON depots.depots FOR DELETE TO authenticated
USING (users.has_role('teacher'));

-- Teachers - Positions
CREATE POLICY "Teachers can view all Positions"
ON depots.positions FOR SELECT TO authenticated
USING (users.has_role('teacher'));

-- Teachers - Transactions
CREATE POLICY "Teachers can view all transactions"
ON depots.transactions FOR SELECT TO authenticated
USING (users.has_role('teacher'));

-- Teachers - Savings Plans
CREATE POLICY "Teachers can view all savings plans entrys"
ON depots.savings_plans FOR SELECT TO authenticated
USING (users.has_role('teacher'));

-- Teachers - Special Roles
CREATE POLICY "Teachers can view special roles"
ON users.special_roles FOR SELECT TO authenticated
USING (users.has_role('teacher'));

CREATE OR REPLACE FUNCTION users.get_all_profiles()
RETURNS TABLE(user_id uuid, name text, created_at timestamptz) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        au.id AS user_id,
        au.raw_user_meta_data->>'name' AS name,
        au."created_at"
    FROM auth.users as au;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Then create the view using the function
CREATE OR REPLACE VIEW users.profile AS
SELECT * FROM users.get_all_profiles();

GRANT SELECT ON users.profile TO authenticated;

-- Overview with counts
CREATE OR REPLACE FUNCTION users.get_admin_overview() 
RETURNS TABLE(
    id uuid,
    email text,
    created_at timestamptz,
    meta_data jsonb,
    user_name text,
    user_role users.special_role,
    role_granted_at timestamptz,
    depot_count bigint,
    position_count bigint,
    transaction_count bigint
) AS $$
BEGIN
    IF NOT users.has_any_role('admin', 'teacher') THEN
        RAISE EXCEPTION 'Unauthorized: Admin or Teacher role required'
            USING ERRCODE = '42501';
    END IF;    RETURN QUERY
    SELECT
        au.id as user_id,
        au.email::text,
        au.created_at,
        au.raw_user_meta_data,
        au.raw_user_meta_data->>'name' AS user_name,
        us.user_role,
        us.granted_at,
        COUNT(DISTINCT d.id) AS depot_count,
        COUNT(DISTINCT p.id) AS position_count,
        COUNT(DISTINCT t.id) AS transaction_count
    FROM auth.users AS au
    LEFT JOIN users.special_roles AS us ON au.id = us.user_id
    LEFT JOIN depots.depots AS d ON au.id = ANY(d.users)
    LEFT JOIN depots.positions AS p ON d.id = p.depot_id
    LEFT JOIN depots.transactions AS t ON d.id = t.depot_id
    GROUP BY au.id, au.email, au.created_at, au.raw_user_meta_data, us.user_role, us.granted_at;
END; 
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE VIEW users.admin_overview AS SELECT * FROM users.get_admin_overview();

GRANT SELECT ON users.admin_overview TO authenticated;
