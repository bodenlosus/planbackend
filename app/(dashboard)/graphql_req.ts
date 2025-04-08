import type { ApolloClient, ApolloError } from "@apollo/client"

type ResponeType<K> = ReturnType<ApolloClient<K>["query"]>

export async function handleQLRequest<T extends ResponeType<K>, K>(
	response: T,
): Promise<
	| { data: null; error: ApolloError | Error }
	| { data: Awaited<T>["data"]; error: null }
> {
	const { data, error } = await response

	if (error) {
		return { data: null, error: error }
	}

	return {
		data: data,
		error: null,
	}
}
