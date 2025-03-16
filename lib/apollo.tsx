import type React from "react"
import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
	type NormalizedCacheObject,
	createHttpLink,
} from "@apollo/client"
import { ApolloProvider } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import type { SupabaseClient } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"

const ApolloProviderWrapper = ({ children }: { children: React.ReactNode }) => {
	const sbclient = createClient()
	const { client, error } = apolloClient(sbclient)

	if (!client) {
		throw error
	}

	return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloProviderWrapper
type ClientResponse<T> =
	| {
			client: T
			error: null
	  }
	| {
			client: null
			error: Error
	  }

export function apolloClient(
	supabase: SupabaseClient,
	ssr = false,
): ClientResponse<ApolloClient<NormalizedCacheObject>> {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
	const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

	if (!supabaseUrl || !supabaseKey) {
		return { client: null, error: Error("undefined supabase url") }
	}

	const httpLink = createHttpLink({
		uri: `${supabaseUrl}/graphql/v1`,
	})

	const authLink = setContext(async (_, { headers }) => {
		const token = (await supabase.auth.getSession()).data.session?.access_token

		return {
			headers: {
				...headers,
				apikey: supabaseKey,
				Authorization: token ? `Bearer ${token}` : "",
			},
		}
	})

	const apolloClient = new ApolloClient({
		ssrMode: ssr,
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	})

	return { client: apolloClient, error: null }
}
