import {
  CopilotRuntime,
  BuiltInAgent,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { buildSystemPrompt } from "@/lib/agent-prompt";

const runtime = new CopilotRuntime({
  agents: {
    default: new BuiltInAgent({
      model: "google/gemini-2.5-flash",
      apiKey:
        process.env.GOOGLE_API_KEY ??
        process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      prompt: buildSystemPrompt(),
    }),
  },
  a2ui: {},
});

export const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit",
  mode: "single-route",
});
