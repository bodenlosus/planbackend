import type { Stock, StockPosition } from "@/database/custom_types";
import { gql as gqlq } from "@/gql/gql";
import { gql } from "@apollo/client";
import type { GetPositionsQuery } from "@/gql/graphql";
import { getDateCertainDaysAgo, toISODateOnly } from "@/lib/date_utils";
import type { ApolloClient } from "@apollo/client";
import type { User } from "@supabase/supabase-js";

export function processDepotValues(
  edges: Array<{
    node: { liquid_assets: number; stock_assets: number; timestamp: string };
  }>,
) {
  const nodes: Array<{
    liquid_assets: number;
    stock_assets: number;
    total_assets: number;
    timestamp: string;
  }> = [];
  const total = edges[0].node.liquid_assets + edges[0].node.stock_assets;

  let maxValue = total;
  let minValue = total;

  for (const edge of edges) {
    const total = edge.node.liquid_assets + edge.node.stock_assets;
    nodes.push({
      total_assets: total,
      liquid_assets: edge.node.liquid_assets,
      stock_assets: edge.node.stock_assets,
      timestamp: edge.node.timestamp,
    });
    minValue = Math.min(minValue, total);
    maxValue = Math.max(maxValue, total);
  }
  const startValue = nodes[0].total_assets;

  const offset =
    Math.abs(maxValue - (startValue ?? 0)) / Math.abs(maxValue - minValue);
  console.log("offset", offset, maxValue, minValue, startValue);

  return {
    data: nodes,
    min: minValue,
    max: maxValue,
    start: startValue,
    offset,
  };
}

export function processDepotPositions(
  edges: NonNullable<GetPositionsQuery["depotPositionsCollection"]>["edges"],
  days: number,
) {
  const res: Array<StockPosition> = [];

  for (const position of edges) {
    console.log(
      "name",
      position.node.stockInfo?.name,
      "trans",
      position.node.stockInfo?.transactionsCollection?.edges,
    );
    const comp_date = getDateCertainDaysAgo(days);

    const stockInfo = position.node.stockInfo;
    const prices = stockInfo?.stockPricesCollection?.edges;
    const transactions = position.node.stockInfo?.transactionsCollection?.edges;

    if (!stockInfo || !prices || !transactions) {
      continue;
    }

    let current_liquid_assets = 0;
    let start_liquid_assets = 0;
    let start_amount = 0;

    for (const transaction of transactions) {
      current_liquid_assets -= transaction.node.price * transaction.node.amount;

      const date = new Date(transaction.node.timestamp);

      if (comp_date.getTime() < date.getTime()) {
        continue;
      }
      start_amount += transaction.node.amount;
      start_liquid_assets -= transaction.node.price * transaction.node.amount;
    }

    const start_p = prices.findLast((price) => {
      const date = new Date(price.node.timestamp).getTime();
      return date < comp_date.getTime();
    })?.node;
    prices.at(0)?.node;

    const start_price = start_p?.close ?? 0;
    const start_stock_value = start_price * start_amount;

    const current_price = prices.at(-1)?.node.close ?? 0;
    const current_stock_value = position.node.amount * current_price;

    const profit =
      current_stock_value -
      start_stock_value +
      current_liquid_assets -
      start_liquid_assets;

    res.push({
      amount: position.node.amount,
      value: current_stock_value,
      name: stockInfo.symbol,
      absolute_profit: profit,
      relative_profit: profit / start_stock_value,
      stock: stockInfo as unknown as Stock,
      price: current_price,
    });
  }

  return res;
}

export const GET_DEPOTS = /* GraphQL */ gql`
  query GetDepots($user: UUID!) {
    profilesCollection(filter: { id: { eq: $user } }) {
      edges {
        node {
          depots {
            name
            created_at
            id
          }
        }
      }
    }
  }
`;

export const GET_POSITIONS = gql(/* GraphQL */ `
  query GetPositions($depot: BigInt!) {
    depotPositionsCollection(filter: { depot_id: { eq: $depot } }) {
      edges {
        node {
          amount
          stockInfo {
            symbol
            name
            description
            id
            type
            transactionsCollection(filter: { depot_id: { eq: $depot } }) {
              edges {
                node {
                  amount
                  price
                  timestamp
                }
              }
            }
            stockPricesCollection(last: 30) {
              edges {
                node {
                  timestamp
                  open
                  close
                  high
                  low
                  volume
                }
              }
            }
          }
        }
      }
    }
  }
`);

export const GET_VALUES = gql(/* GraphQL */ `
  query GetDepotValues($depot: BigInt!, $start: Date!) {
    depotValuesCollection(
      filter: { depot_id: { eq: $depot }, timestamp: { gte: $start } }
    ) {
      edges {
        node {
          timestamp
          stock_assets
          liquid_assets
        }
      }
    }
  }
`);

export async function getDepots<T>(client: ApolloClient<T>, user: User) {
  const { data, error } = await client.query({
    query: GET_DEPOTS,
    variables: { user: user.id },
  });

  if (error) {
    return { data: null, error: error };
  }

  if (!data.profilesCollection) {
    return { data: null, error: Error("couldnt fetch data") };
  }

  return {
    data: data.profilesCollection,
    error: null,
  };
}

export async function getPositions<T>(
  client: ApolloClient<T>,
  depotID: string,
) {
  const { data, error } = await client.query({
    query: GET_POSITIONS,
    variables: { depot: depotID },
  });

  if (error) {
    return { data: null, error: error };
  }

  if (!data.depotPositionsCollection?.edges) {
    return { data: null, error: Error("couldnt fetch data") };
  }

  return {
    data: data.depotPositionsCollection.edges,
    error: null,
  };
}

export async function getDepotValues<T>(
  client: ApolloClient<T>,
  depotID: string,
  start_date: Date,
) {
  const { data, error } = await client.query({
    query: GET_VALUES,
    variables: { depot: depotID, start: toISODateOnly(start_date) },
  });

  if (error) {
    return { data: null, error: error };
  }

  if (!data.depotValuesCollection?.edges) {
    return { data: null, error: Error("couldnt fetch data") };
  }
  return {
    data: data.depotValuesCollection.edges,
    error: null,
  };
}
