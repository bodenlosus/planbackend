
SELECT
  COALESCE(da.asset_id, ap.asset_id) AS asset_id,
  COALESCE(da.tstamp, ap.tstamp) AS tstamp,
  locf(da.depot_id) as depot_id,
  locf(ap.close) AS price,
  locf(da.running_amount) AS amount,
  locf(ap.close) * locf(da.running_amount) as market_value
FROM depots.aggregated_transactions AS da
FULL JOIN api.asset_prices as ap
ON ap.tstamp = da.tstamp
AND ap.asset_id = da.asset_id
WHERE locf(da.depot_id) IS NOT NULL
ORDER BY asset_id, tstamp;
