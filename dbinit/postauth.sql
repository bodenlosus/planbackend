
CREATE "POLICY read_acces_all FOR" SELECT ON depots.depots USING (true) ;
CREATE "POLICY read_acces_for_owners" FOR SELECT ON depots.positions USING ((SELECT auth.uid () AS uid) IN depots.depots.users) ;
CREATE "POLICY read_acces_for_owners" FOR SELECT ON depots.positions USING ((SELECT auth.uid () AS uid) IN depots.depots.users) ;

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
