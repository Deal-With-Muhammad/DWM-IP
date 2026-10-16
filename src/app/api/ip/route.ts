import { getVisitor } from "@/lib/visitor";

const CORS = { "access-control-allow-origin": "*", "cache-control": "no-store" };

/** `curl ip.dealwithmuhammad.com` → just the IP and a newline. */
export async function GET(request: Request) {
  const visitor = await getVisitor(request.headers);
  if (!visitor)
    return new Response("unknown\n", { status: 500, headers: { ...CORS, "content-type": "text/plain" } });
  return new Response(`${visitor.ip}\n`, {
    headers: { ...CORS, "content-type": "text/plain; charset=utf-8" },
  });
}
