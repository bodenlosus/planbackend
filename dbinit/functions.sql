CREATE OR REPLACE PROCEDURE update_depot_positions ()
LANGUAGE plpgsql -- Changed from SQL to plpgsql
AS $$
BEGIN
    WITH latest_prices AS (
        SELECT DISTINCT ON (asset_id)
            asset_id,
            tstamp,
            close
        FROM api.asset_prices
        ORDER BY asset_id, tstamp DESC
    )
    UPDATE depots.positions as dp
    SET
        price = latest_prices.close,
        worth = latest_prices.close * amount,
        last = latest_prices.tstamp
    FROM latest_prices
    WHERE
        dp.last <= latest_prices.tstamp -- Changed comma to proper condition
        AND dp.asset_id = latest_prices.asset_id;  -- Use AND, not comma

END;
$$ ;

CREATE OR REPLACE PROCEDURE log_transaction (p_asset_id BIGINT,
p_depot_id BIGINT,
p_amount REAL,
p_price REAL,
p_commission REAL)
LANGUAGE plpgsql AS $$
    BEGIN
        INSERT INTO depots.transactions (asset_id, depot_id, amount, price, tstamp, commission )
        VALUES (p_asset_id, p_depot_id, p_amount, p_price, NOW(), p_commision);
    END;
$$ ;
-- Set the commission configuration
ALTER DATABASE postgres SET config.commission = '10' ;

CREATE OR REPLACE PROCEDURE buy_asset (
p_asset_id BIGINT,
p_depot_id BIGINT,
p_worth REAL
)
LANGUAGE plpgsql
AS $$
DECLARE
    price REAL;
    price_tstamp DATE;
    asset_amount REAL;
    total_cost REAL;
    depot_cash REAL;
    commission REAL;
BEGIN
    -- Get commission from configuration
    commission := current_setting('config.commission')::REAL;


    -- Find the asset's current price
    SELECT prices.close, prices.tstamp
    FROM api.asset_prices AS prices
    WHERE prices.asset_id = p_asset_id
    ORDER BY prices.tstamp DESC
    LIMIT 1
    INTO price, price_tstamp;


    -- Check if price was found
    IF price IS NULL THEN
        RAISE EXCEPTION 'No price found for asset_id %', p_asset_id;
    END IF;

    asset_amount := p_worth / price;
    total_cost := p_worth + commission;


    -- Verify that the depot has enough cash
    SELECT d.cash
    FROM depots.depots d
    WHERE d.id = p_depot_id
    INTO depot_cash;

    -- Check if depot exists
    IF depot_cash IS NULL THEN
        RAISE EXCEPTION 'Depot with id % not found', p_depot_id;
    END IF;

    IF depot_cash < total_cost THEN
        RAISE EXCEPTION 'Insufficient cash in depot. Required: %, Available: %', total_cost, depot_cash;
    END IF;

    -- Subtract the cash
    UPDATE depots.depots
    SET cash = cash - total_cost
    WHERE id = p_depot_id;

    -- Buy/update position
    INSERT INTO depots.positions (depot_id, asset_id, price, amount, worth, last)
    VALUES (p_depot_id, p_asset_id, price, asset_amount, p_worth, price_tstamp)
    ON CONFLICT (depot_id, asset_id) DO UPDATE
    SET
        amount = positions.amount + EXCLUDED.amount,
        worth = positions.worth + EXCLUDED.worth,
        price = EXCLUDED.price,
        last = EXCLUDED.last;

    COMMIT;

    CALL log_transaction (p_asset_id, p_depot_id, asset_amount, price, commission);
END;
$$ ;

CREATE OR REPLACE PROCEDURE sell_asset (
p_asset_id BIGINT,
p_depot_id BIGINT,
p_worth REAL
)
LANGUAGE plpgsql
AS $$
DECLARE
    price REAL;
    price_tstamp DATE;
    asset_amount REAL;
    total_profit REAL;
    possessed_worth REAL;
    commission REAL;
    worth_to_sell REAL;
BEGIN
    -- Get commission from configuration
    commission := current_setting('config.commission')::REAL;

    -- Find the asset's current price
    SELECT prices.close, prices.tstamp
    FROM api.asset_prices AS prices
    WHERE prices.asset_id = p_asset_id
    ORDER BY prices.tstamp DESC
    LIMIT 1
    INTO price, price_tstamp;

    -- Check if price was found
    IF price IS NULL THEN
        RAISE EXCEPTION 'No price found for asset %', p_asset_id;
    END IF;

    -- Verify that the depot has enough cash
    SELECT dp.worth
    FROM depots.positions AS dp
    WHERE dp.depot_id = p_depot_id AND dp.asset_id = p_asset_id
    INTO possessed_worth;

    -- Check if depot exists
    IF possessed_worth IS NULL THEN
        RAISE EXCEPTION 'No position for depot % on asset % found', p_depot_id, p_asset_id;
    END IF;

    worth_to_sell := LEAST(possessed_worth, p_worth);

    asset_amount := worth_to_sell / price;
    total_profit := worth_to_sell - commission;

    -- add the cash
    UPDATE depots.depots
    SET cash = cash + total_profit
    WHERE id = p_depot_id;

    IF possessed_worth = worth_to_sell THEN
        DELETE FROM depots.positions
        WHERE
            asset_id = p_asset_id AND
            depot_id = p_depot_id;
    ELSE
        UPDATE depots.positions
        SET
            amount = amount - asset_amount,
            worth = worth - worth_to_sell
        WHERE
            asset_id = p_asset_id AND
            depot_id = p_depot_id;
    END IF;


    CALL log_transaction (p_asset_id, p_depot_id, asset_amount, price, commission);
END;
$$ ;
