function onRequest(_req: Request): Response {
	return new Response("HIII");
}

Deno.serve({ port: 3000, hostname: "127.0.0.1" }, onRequest);
