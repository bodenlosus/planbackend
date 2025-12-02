CREATE POLICY "read_acces_all" ON depots.depots FOR SELECT USING (true) ;
CREATE POLICY "read_access_for_owners"
ON depots.positions
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM depots.depots d
    WHERE d.id = positions.depot_id
      AND auth.uid() = ANY(d.users)
  )
);

GRANT SELECT ON depots.position_profits TO authenticated;
GRANT SELECT ON depots.aggregated_values TO authenticated;

CREATE POLICY "auth_admin_insert" ON depots.depots TO auth_admin USING (TRUE);
GRANT USAGE ON schema depots TO auth_admin;
GRANT INSERT ON depots.depots TO auth_admin;

CREATE OR REPLACE FUNCTION depots.new_depot_for_user(p_user_id UUID) RETURNS void AS $$
    BEGIN
        INSERT INTO depots.depots (created, cash, cash_start, users)
        VALUES (NOW(), 50000, 50000,  ARRAY[p_user_id]);
    END;
$$ LANGUAGE plpgsql;


GRANT EXECUTE ON FUNCTION depots.new_depot_for_user(UUID) TO anon, authenticated;
GRANT INSERT ON depots.depots TO authenticated;
CREATE POLICY "authenticated_insert" ON depots.depots FOR INSERT TO authenticated WITH CHECK (auth.uid()::uuid = ANY(users));
