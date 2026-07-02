import {
  CopilotRuntime,
  BuiltInAgent,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { buildSystemPrompt } from "@/lib/agent-prompt";

const runtime = new CopilotRuntime({
  agents: {
    default: new BuiltInAgent({
      model: "google/gemini-3.5-flash",
      apiKey:
        process.env.GOOGLE_API_KEY ??
        process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      prompt: buildSystemPrompt(),
    }),
  },
  a2ui: {},
});

/** Multi-route: GET /info, POST /agent/:id/run, etc. */
export const multiRouteHandler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit",
});

/** Single-route fallback: POST /api/copilotkit with { method: "info" } envelope */
export const singleRouteHandler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit",
  mode: "single-route",
});
