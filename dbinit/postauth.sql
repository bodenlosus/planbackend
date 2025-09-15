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

CREATE POLICY "auth_admin_insert" ON depots.depots TO auth_admin USING (TRUE);
GRANT USAGE ON schema depots TO auth_admin;
GRANT INSERT ON depots.depots TO auth_admin;


CREATE OR REPLACE FUNCTION new_depot_for_user() RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO depots.depots (created, cash, users)
        VALUES (NOW(), 50000, ARRAY[NEW.id]);

        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER new_user
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION new_depot_for_user();
