
CREATE POLICY read_acces_all FOR SELECT ON depots.depots USING (true) ;
CREATE POLICY read_acces_for_owners FOR SELECT ON depots.positions USING ((SELECT auth.uid () AS uid) IN depots.depots.users) ;
CREATE POLICY read_acces_for_owners FOR SELECT ON depots.positions USING ((SELECT auth.uid () AS uid) IN depots.depots.users) ;

