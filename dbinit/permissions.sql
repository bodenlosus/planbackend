-- Grant permissions for api schema
GRANT USAGE ON SCHEMA api TO anon;
GRANT SELECT ON api.assets TO anon, authenticated;
GRANT SELECT ON api.asset_prices TO anon, authenticated;
 
-- Grant schema usage for authenticated users
GRANT USAGE ON SCHEMA api TO authenticated;
GRANT USAGE ON SCHEMA depots TO authenticated;

-- Grant permissions for depots schema to anon role (read-only for depots and values)
GRANT USAGE ON SCHEMA depots TO anon;
GRANT SELECT ON depots.depots TO anon;
-- GRANT SELECT ON depots.values TO anon;

-- Grant permissions for service worker (additional ones not in init.sql)


-- Grant permissions for depots schema to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON depots.depots TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON depots.positions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON depots.transactions TO authenticated;
GRANT SELECT ON depots.aggregated_transactions TO authenticated;
-- GRANT SELECT ON depots.values TO authenticated;
GRANT SELECT ON depots.position_profits TO authenticated;

-- Enable Row Level Security on all tables
ALTER TABLE api.assets ENABLE row LEVEL SECURITY ;
ALTER TABLE api.asset_prices ENABLE ROW LEVEL SECURITY ;
ALTER TABLE depots.depots ENABLE ROW LEVEL SECURITY ;
ALTER TABLE depots.positions ENABLE ROW LEVEL SECURITY ;
ALTER TABLE depots.transactions ENABLE ROW LEVEL SECURITY ;
-- ALTER TABLE depots.values ENABLE ROW LEVEL SECURITY ;

-- API table policies
CREATE POLICY "Anyone can read assets" ON api.assets
FOR SELECT TO public
USING (true) ;

CREATE POLICY "Anyone can read asset prices" ON api.asset_prices
FOR SELECT TO public
USING (true) ;

-- Helper function to check if a user is a member of a depot
CREATE OR REPLACE FUNCTION depots.is_depot_member (depot_id bigint)
RETURNS boolean
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM depots.depots
    WHERE id = depot_id
    AND auth.uid()::uuid = ANY(users)
  );
$$ ;

-- Depot table policies
CREATE POLICY "Anyone can read depots" ON depots.depots
FOR SELECT TO public
USING (true) ;

CREATE POLICY "Users can manage their depots" ON depots.depots
FOR ALL TO authenticated
USING (auth.uid ()::uuid = ANY (users))
WITH CHECK (auth.uid ()::uuid = ANY (users)) ;

-- Position table policies
CREATE POLICY "Users can read their depot positions" ON depots.positions
FOR SELECT TO authenticated
USING (depots.is_depot_member (depot_id)) ;

CREATE POLICY "Users can manage their depot positions" ON depots.positions
FOR INSERT TO authenticated
WITH CHECK (depots.is_depot_member (depot_id)) ;

CREATE POLICY "Users can update their depot positions" ON depots.positions
FOR UPDATE TO authenticated
USING (depots.is_depot_member (depot_id))
WITH CHECK (depots.is_depot_member (depot_id)) ;

CREATE POLICY "Users can delete their depot positions" ON depots.positions
FOR DELETE TO authenticated
USING (depots.is_depot_member (depot_id)) ;

-- Transaction table policies
CREATE POLICY "Users can read their depot transactions" ON depots.transactions
FOR SELECT TO authenticated
USING (depots.is_depot_member (depot_id)) ;

CREATE POLICY "Users can create transactions in their depots" ON depots.transactions
FOR INSERT TO authenticated
WITH CHECK (depots.is_depot_member (depot_id)) ;

CREATE POLICY "Users can update their depot transactions" ON depots.transactions
FOR UPDATE TO authenticated
USING (depots.is_depot_member (depot_id))
WITH CHECK (depots.is_depot_member (depot_id)) ;

CREATE POLICY "Users can delete their depot transactions" ON depots.transactions
FOR DELETE TO authenticated
USING (depots.is_depot_member (depot_id)) ;

-- -- Values table policies
-- CREATE POLICY "Anyone can read depot values" ON depots.values
-- FOR SELECT TO public
-- USING (true) ;

-- CREATE POLICY "Users can manage their depot values" ON depots.values
-- FOR ALL TO authenticated
-- USING (depots.is_depot_member (depot_id))
-- WITH CHECK (depots.is_depot_member (depot_id)) ;

-- Grant sequence usage to authenticated role
GRANT USAGE ON ALL SEQUENCES IN SCHEMA depots TO authenticated ;

-- Ensure RLS is enforced for all users
ALTER ROLE authenticated SET row_security = on ;
ALTER ROLE anon SET row_security = on ;
ALTER ROLE service_worker SET row_security = on ;

CREATE ROLE view_refresher NOINHERIT;
GRANT USAGE ON SCHEMA depots TO view_refresher;
GRANT view_refresher TO authenticated, service_worker, postgres;
GRANT USAGE ON SCHEMA api TO view_refresher;


-- setup for materialized views - maybe later
-- ALTER TABLE depots.aggregated_transactions OWNER TO view_refresher;
-- ALTER TABLE depots.position_profits OWNER TO view_refresher;
-- ALTER TABLE depots."values" OWNER TO view_refresher;

-- GRANT SELECT ON depots.depots TO view_refresher;
-- GRANT SELECT ON depots.positions TO view_refresher;
-- GRANT SELECT ON depots.transactions TO view_refresher;
-- GRANT SELECT ON depots.values TO view_refresher;
