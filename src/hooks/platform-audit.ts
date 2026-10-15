import { FastifyInstance } from "fastify";

import { savePlatformLog } from "@/repositories/platform-log.repository";
import { resolvePlatformSource, resolveRequestActor } from "@/utils/platform-log";

export function registerPlatformAudit(server: FastifyInstance) {
  server.addHook("onResponse", async (request, reply) => {
    try {
      const url = request.url ?? "";
      const method = request.method ?? "GET";

      if (url === "/" || url === "/start-server" || url === "/api/platform-logs") {
        return;
      }

      const rawBody = request.body;
      const actor = await resolveRequestActor(request);
      const pathParts = url.split("/").filter(Boolean);
      const entity = pathParts[0] === "api" ? (pathParts[1] ?? "API") : (pathParts[0] ?? "API");

      await savePlatformLog({
        action: `${method}_ROUTE`,
        entity: entity.toUpperCase(),
        actor,
        source: resolvePlatformSource(request),
        previousState: ["POST", "PUT", "PATCH", "DELETE"].includes(method) ? rawBody ?? null : null,
        newState: {
          method,
          path: url,
          statusCode: reply.statusCode,
          query: request.query ?? {},
        },
        companyId:
          typeof rawBody === "object" && rawBody !== null && "companyId" in rawBody
            ? String((rawBody as Record<string, unknown>).companyId)
            : null,
        ip: (request.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ?? request.ip ?? null,
        userAgent: (request.headers["user-agent"] as string | undefined) ?? null,
        requestPath: url,
        metadata: {
          route: request.routeOptions?.url ?? url,
          params: request.params ?? {},
          host: request.headers.host ?? null,
          origin: request.headers.origin ?? null,
          referer: request.headers.referer ?? null,
          forwardedFor: (request.headers["x-forwarded-for"] as string | undefined) ?? null,
          xForwardedProto: (request.headers["x-forwarded-proto"] as string | undefined) ?? null,
        },
      });
    } catch (error) {
      console.error("Global platform audit log failed:", error);
    }
  });
}
