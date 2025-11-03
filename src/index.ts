// src/index.ts
import { serve } from "bun";

const routes = {
  "/": () => new Response(JSON.stringify({ ok: true, message: "Hello from Bun!" }), {
    headers: { "content-type": "application/json" },
  }),
  "/greet": (req: Request) => {
    const url = new URL(req.url);
    const name = url.searchParams.get("name") || "friend";
    return new Response(JSON.stringify({ greeting: `Hello, ${name}!` }), {
      headers: { "content-type": "application/json" },
    });
  },
  "/health": () => new Response("OK", { status: 200 }),
};

serve({
  fetch(req) {
    const url = new URL(req.url);
    const handler = routes[url.pathname];
    if (handler) return handler(req);
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "content-type": "application/json" }});
  },
  port: Number(process.env.PORT || 3000),
  development: process.env.NODE_ENV !== "production",
});
