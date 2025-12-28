import type { CodegenConfig } from "@graphql-codegen/cli"
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset"

const config: CodegenConfig = {
	schema: [
		{
			"https://ibwaxbmvshovpenseudo.supabase.co/graphql/v1": {
				headers: {
					// biome-ignore lint/style/noNonNullAssertion: if its not there well youve got a problem anyways
					apikey:
						"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlid2F4Ym12c2hvdnBlbnNldWRvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDI5NjA4NywiZXhwIjoyMDM1ODcyMDg3fQ.g1LXJydZH21okuSB-Cn8ocs8bBq1m1KzCllnDTtAdBQ",
				},
			},
		},
	], // Using the local endpoint, update if needed
	documents: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
	overwrite: true,
	ignoreNoDocuments: true,
	generates: {
		"gql/": {
			documentTransforms: [addTypenameSelectionDocumentTransform],

			preset: "client",
			presetConfig: {
				gqlTagName: "gql",
			},
			config: {
				scalars: {
					UUID: "string",
					Date: "string",
					Time: "string",
					Datetime: "string",
					JSON: "string",
					BigInt: "string",
					BigFloat: "string",
					Opaque: "any",
				},
			},
		},
		"gql/types.ts": {
			documentTransforms: [addTypenameSelectionDocumentTransform],
			plugins: ["typescript", "typescript-operations"],
			config: {
				scalars: {
					UUID: "string",
					Date: "string",
					Time: "string",
					Datetime: "string",
					JSON: "string",
					BigInt: "string",
					BigFloat: "string",
					Opaque: "any",
				},
			},
		},
	},
	hooks: {
		afterAllFileWrite: ["biome format --write"], // optional
	},
}

export default config
// "gql/graphql.tsx": {

// 			presetConfig: {
// 				gqlTagName: "gql",
// 			},
// 			plugins: [
// 				"typescript",
// 				"typescript-operations",
// 				"typescript-react-apollo",
// 				{
// 					'typed-document-node': {
// 					  dedupeFragments: true,
// 				},
// 				},
// 			],
//
// 		},
