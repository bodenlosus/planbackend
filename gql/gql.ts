/* eslint-disable */
import * as types from "./graphql"
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"

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
	"\n\tquery GetDepots($user: UUID) {\n  profilesCollection(filter: {id: {eq: $user}}) {\n    edges {\n      node {\n        depots {\n\t\t  id\n          name\n          created_at\n        }\n      }\n    }\n  }\n}\n": typeof types.GetDepotsDocument
	"\nquery GetPositions($depot: BigInt!) {\n\tdepotPositionsCollection (filter: {depot_id: {eq: $depot}}, ) {\n\tedges {\n\t\tnode {\n\t\tstockInfo {\n\t\t\tsymbol\n\t\t\tname\n\t\t\tdescription\n\t\t\ttype\n\t\t\tstockPricesCollection(first: 30) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\thigh\n\t\t\t\tlow\n\t\t\t\topen\n\t\t\t\tclose\n\t\t\t\ttimestamp\n\t\t\t\t}\n\t\t\t}\n\t\t\t}\n\t\t}\n\t\t}\n\t}\n\t}\n}\n": typeof types.GetPositionsDocument
}
const documents: Documents = {
	"\n\tquery GetDepots($user: UUID) {\n  profilesCollection(filter: {id: {eq: $user}}) {\n    edges {\n      node {\n        depots {\n\t\t  id\n          name\n          created_at\n        }\n      }\n    }\n  }\n}\n":
		types.GetDepotsDocument,
	"\nquery GetPositions($depot: BigInt!) {\n\tdepotPositionsCollection (filter: {depot_id: {eq: $depot}}, ) {\n\tedges {\n\t\tnode {\n\t\tstockInfo {\n\t\t\tsymbol\n\t\t\tname\n\t\t\tdescription\n\t\t\ttype\n\t\t\tstockPricesCollection(first: 30) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\thigh\n\t\t\t\tlow\n\t\t\t\topen\n\t\t\t\tclose\n\t\t\t\ttimestamp\n\t\t\t\t}\n\t\t\t}\n\t\t\t}\n\t\t}\n\t\t}\n\t}\n\t}\n}\n":
		types.GetPositionsDocument,
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
	source: "\n\tquery GetDepots($user: UUID) {\n  profilesCollection(filter: {id: {eq: $user}}) {\n    edges {\n      node {\n        depots {\n\t\t  id\n          name\n          created_at\n        }\n      }\n    }\n  }\n}\n",
): (typeof documents)["\n\tquery GetDepots($user: UUID) {\n  profilesCollection(filter: {id: {eq: $user}}) {\n    edges {\n      node {\n        depots {\n\t\t  id\n          name\n          created_at\n        }\n      }\n    }\n  }\n}\n"]
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: "\nquery GetPositions($depot: BigInt!) {\n\tdepotPositionsCollection (filter: {depot_id: {eq: $depot}}, ) {\n\tedges {\n\t\tnode {\n\t\tstockInfo {\n\t\t\tsymbol\n\t\t\tname\n\t\t\tdescription\n\t\t\ttype\n\t\t\tstockPricesCollection(first: 30) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\thigh\n\t\t\t\tlow\n\t\t\t\topen\n\t\t\t\tclose\n\t\t\t\ttimestamp\n\t\t\t\t}\n\t\t\t}\n\t\t\t}\n\t\t}\n\t\t}\n\t}\n\t}\n}\n",
): (typeof documents)["\nquery GetPositions($depot: BigInt!) {\n\tdepotPositionsCollection (filter: {depot_id: {eq: $depot}}, ) {\n\tedges {\n\t\tnode {\n\t\tstockInfo {\n\t\t\tsymbol\n\t\t\tname\n\t\t\tdescription\n\t\t\ttype\n\t\t\tstockPricesCollection(first: 30) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\thigh\n\t\t\t\tlow\n\t\t\t\topen\n\t\t\t\tclose\n\t\t\t\ttimestamp\n\t\t\t\t}\n\t\t\t}\n\t\t\t}\n\t\t}\n\t\t}\n\t}\n\t}\n}\n"]

export function gql(source: string) {
	return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
	TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
