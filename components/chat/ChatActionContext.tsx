"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useAgent, useCopilotKit } from "@copilotkit/react-core/v2";

interface ChatActionContextValue {
  sendUserMessage: (text: string) => void;
  isRunning: boolean;
}

const ChatActionContext = createContext<ChatActionContextValue | null>(null);

export function ChatActionProvider({ children }: { children: ReactNode }) {
  const { agent } = useAgent();
  const { copilotkit } = useCopilotKit();
  const isRunning =
    (agent as unknown as { isRunning?: boolean }).isRunning ?? false;

  const sendUserMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isRunning) return;

      agent.addMessage({
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
      });
      void copilotkit.runAgent({ agent });
    },
    [agent, copilotkit, isRunning],
  );

  const value = useMemo(
    () => ({ sendUserMessage, isRunning }),
    [sendUserMessage, isRunning],
  );

  return (
    <ChatActionContext.Provider value={value}>
      {children}
    </ChatActionContext.Provider>
  );
}

export function useChatActions() {
  const context = useContext(ChatActionContext);
  if (!context) {
    throw new Error("useChatActions must be used within ChatActionProvider");
  }
  return context;
}
