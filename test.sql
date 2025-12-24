CREATE OR REPLACE VIEW depots.values AS
WITH depot_first_transaction AS (
  SELECT depot_id, MIN(tstamp) as first_date
  FROM depots.aggregated_transactions
  GROUP BY depot_id
),
all_dates AS (
  SELECT DISTINCT tstamp 
  FROM api.asset_prices
),
depot_holdings_by_date AS (
  SELECT
    d.id as depot_id,
    dates.tstamp,
    t.asset_id,
    t.running_amount,
    t.running_commission,
    t.running_expenses,
    ap.close
  FROM depots.depots d
  INNER JOIN depot_first_transaction dft ON d.id = dft.depot_id
  CROSS JOIN all_dates dates
  LEFT JOIN LATERAL (
    SELECT *
    FROM depots.aggregated_transactions t
    WHERE t.depot_id = d.id
      AND t.tstamp <= dates.tstamp
  ) t ON TRUE
  LEFT JOIN LATERAL (
    SELECT close
    FROM api.asset_prices
    WHERE asset_id = t.asset_id
      AND tstamp <= dates.tstamp
    ORDER BY tstamp DESC
    LIMIT 1
  ) ap ON TRUE
  WHERE dates.tstamp >= dft.first_date
    AND t.asset_id IS NOT NULL
)
SELECT
  depot_id,
  tstamp,
  MAX(d.cash_start) + SUM(COALESCE(running_amount, 0) * close 
    - COALESCE(running_commission, 0) 
    - COALESCE(running_expenses, 0)) AS value,
  MAX(d.cash_start) - SUM(COALESCE(running_commission, 0) 
    + COALESCE(running_expenses, 0)) AS cash,
  SUM(COALESCE(running_amount, 0) * close 
    - COALESCE(running_commission, 0) 
    - COALESCE(running_expenses, 0)) AS profit_from_start,
  SUM(COALESCE(running_amount, 0) * close) AS assets
FROM depot_holdings_by_date
LEFT JOIN depots.depots d ON depot_id = d.id
GROUP BY depot_id, tstamp

UNION ALL

-- Add initial state for depots with no transactions yet, or before first transaction
SELECT
  d.id as depot_id,
  dates.tstamp,
  d.cash_start as value,
  d.cash_start as cash,
  0 as profit_from_start,
  0 as assets
FROM depots.depots d
CROSS JOIN (SELECT DISTINCT tstamp FROM api.asset_prices) dates
LEFT JOIN depot_first_transaction dft ON d.id = dft.depot_id
WHERE dft.first_date IS NULL  -- No transactions at all
   OR dates.tstamp < dft.first_date  -- Before first transaction

ORDER BY depot_id, tstamp;
