COPY api.assets (id, symbol, name, description, asset_type) FROM '/docker-entrypoint-initdb.d/data/assets.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',');
