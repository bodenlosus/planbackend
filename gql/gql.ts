import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
/* eslint-disable */
import * as types from "./graphql"

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
	"\n\tquery GetDepots($user: UUID!) {\n\t\tprofilesCollection(filter: {id: {eq: $user}}) {\n\t\tedges {\n\t\t\tnode {\n\t\t\tdepots {\n\t\t\t\tname\n\t\t\t\tcreated_at\n\t\t\t\tid\n\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n": typeof types.GetDepotsDocument
	"\nquery GetPositions($depot: BigInt!) {\n  depotPositionsCollection (filter: {depot_id: {eq:$depot}}) {\n    edges {\n    \tnode {\n\t\tamount\n        stockInfo {\n          symbol\n          name\n          description\n          id\n          type\n          transactionsCollection (filter: {depot_id: {eq: $depot}}) {\n            edges {\n              node {\n                amount\n                price\n                timestamp\n              }\n            }\n          }\n          stockPricesCollection (last: 1, ) {\n            edges {\n              node {\n                timestamp\n                open\n                close\n                high\n                low\n                volume\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n": typeof types.GetPositionsDocument
	"\n\tquery GetDepotValues($depot: BigInt!) {\n  depotValuesCollection (filter: {depot_id: {eq: $depot}} ) {\n    edges {\n      node {\n        timestamp\n        stock_assets\n        liquid_assets\n      }\n    }\n  }\n}\n\t": typeof types.GetDepotValuesDocument
}
const documents: Documents = {
	"\n\tquery GetDepots($user: UUID!) {\n\t\tprofilesCollection(filter: {id: {eq: $user}}) {\n\t\tedges {\n\t\t\tnode {\n\t\t\tdepots {\n\t\t\t\tname\n\t\t\t\tcreated_at\n\t\t\t\tid\n\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n":
		types.GetDepotsDocument,
	"\nquery GetPositions($depot: BigInt!) {\n  depotPositionsCollection (filter: {depot_id: {eq:$depot}}) {\n    edges {\n    \tnode {\n\t\tamount\n        stockInfo {\n          symbol\n          name\n          description\n          id\n          type\n          transactionsCollection (filter: {depot_id: {eq: $depot}}) {\n            edges {\n              node {\n                amount\n                price\n                timestamp\n              }\n            }\n          }\n          stockPricesCollection (last: 1, ) {\n            edges {\n              node {\n                timestamp\n                open\n                close\n                high\n                low\n                volume\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n":
		types.GetPositionsDocument,
	"\n\tquery GetDepotValues($depot: BigInt!) {\n  depotValuesCollection (filter: {depot_id: {eq: $depot}} ) {\n    edges {\n      node {\n        timestamp\n        stock_assets\n        liquid_assets\n      }\n    }\n  }\n}\n\t":
		types.GetDepotValuesDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: "\n\tquery GetDepots($user: UUID!) {\n\t\tprofilesCollection(filter: {id: {eq: $user}}) {\n\t\tedges {\n\t\t\tnode {\n\t\t\tdepots {\n\t\t\t\tname\n\t\t\t\tcreated_at\n\t\t\t\tid\n\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n",
): (typeof documents)["\n\tquery GetDepots($user: UUID!) {\n\t\tprofilesCollection(filter: {id: {eq: $user}}) {\n\t\tedges {\n\t\t\tnode {\n\t\t\tdepots {\n\t\t\t\tname\n\t\t\t\tcreated_at\n\t\t\t\tid\n\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n"]
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: "\nquery GetPositions($depot: BigInt!) {\n  depotPositionsCollection (filter: {depot_id: {eq:$depot}}) {\n    edges {\n    \tnode {\n\t\tamount\n        stockInfo {\n          symbol\n          name\n          description\n          id\n          type\n          transactionsCollection (filter: {depot_id: {eq: $depot}}) {\n            edges {\n              node {\n                amount\n                price\n                timestamp\n              }\n            }\n          }\n          stockPricesCollection (last: 1, ) {\n            edges {\n              node {\n                timestamp\n                open\n                close\n                high\n                low\n                volume\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
): (typeof documents)["\nquery GetPositions($depot: BigInt!) {\n  depotPositionsCollection (filter: {depot_id: {eq:$depot}}) {\n    edges {\n    \tnode {\n\t\tamount\n        stockInfo {\n          symbol\n          name\n          description\n          id\n          type\n          transactionsCollection (filter: {depot_id: {eq: $depot}}) {\n            edges {\n              node {\n                amount\n                price\n                timestamp\n              }\n            }\n          }\n          stockPricesCollection (last: 1, ) {\n            edges {\n              node {\n                timestamp\n                open\n                close\n                high\n                low\n                volume\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"]
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: "\n\tquery GetDepotValues($depot: BigInt!) {\n  depotValuesCollection (filter: {depot_id: {eq: $depot}} ) {\n    edges {\n      node {\n        timestamp\n        stock_assets\n        liquid_assets\n      }\n    }\n  }\n}\n\t",
): (typeof documents)["\n\tquery GetDepotValues($depot: BigInt!) {\n  depotValuesCollection (filter: {depot_id: {eq: $depot}} ) {\n    edges {\n      node {\n        timestamp\n        stock_assets\n        liquid_assets\n      }\n    }\n  }\n}\n\t"]

export function gql(source: string) {
	return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
	TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
