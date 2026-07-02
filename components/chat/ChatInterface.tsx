"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  useAgent,
  useCopilotKit,
  useRenderActivityMessage,
} from "@copilotkit/react-core/v2";
import { ChatActionProvider, useChatActions } from "@/components/chat/ChatActionContext";
import { SaveConfigurationButton } from "@/components/chat/SaveConfigurationButton";

interface Message {
  id: string;
  role: string;
  content: string | unknown;
  activityType?: string;
}

function getTextContent(content: string | unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((c) => (typeof c === "string" ? c : (c as { text?: string }).text ?? ""))
      .join("");
  }
  return "";
}

type VisibleMessage = Message;

type AssistantTurn = {
  type: "assistant";
  text?: VisibleMessage;
  activities: VisibleMessage[];
};

type MessageTurn = { type: "user"; message: VisibleMessage } | AssistantTurn;

function groupMessageTurns(messages: VisibleMessage[]): MessageTurn[] {
  const turns: MessageTurn[] = [];
  let pendingAssistant: VisibleMessage | undefined;
  let pendingActivities: VisibleMessage[] = [];

  const flushAssistant = () => {
    if (!pendingAssistant && pendingActivities.length === 0) return;
    turns.push({
      type: "assistant",
      text: pendingAssistant,
      activities: pendingActivities,
    });
    pendingAssistant = undefined;
    pendingActivities = [];
  };

  for (const msg of messages) {
    if (msg.role === "user") {
      flushAssistant();
      turns.push({ type: "user", message: msg });
      continue;
    }

    if (msg.role === "activity") {
      pendingActivities.push(msg);
      continue;
    }

    if (msg.role === "assistant") {
      if (pendingAssistant || pendingActivities.length > 0) {
        flushAssistant();
      }
      pendingAssistant = msg;
    }
  }

  flushAssistant();
  return turns;
}

function LoadingDots() {
  return (
    <div className="flex items-center gap-3 shrink-0 w-full max-w-[640px]">
      <svg
        viewBox="0 0 32 32"
        className="w-8 h-8 shrink-0 text-[#6161ff] animate-spin"
        fill="none"
        aria-label="Laden..."
      >
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="40" strokeLinecap="round" />
      </svg>
      <p className="flex-1 text-base leading-6 text-[#67687f]">Laden...</p>
    </div>
  );
}

export function ChatInterface() {
  return (
    <ChatActionProvider>
      <ChatInterfaceContent />
    </ChatActionProvider>
  );
}

function ChatInterfaceContent() {
  const { sendUserMessage, isRunning } = useChatActions();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { agent } = useAgent();
  const { renderActivityMessage } = useRenderActivityMessage();

  const messages = (agent.messages ?? []) as Message[];

  const visibleMessages = messages.filter((m) => {
    if (m.role === "activity") return true;
    return (
      (m.role === "user" || m.role === "assistant") &&
      getTextContent(m.content).trim()
    );
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isRunning]);

  function handleSend() {
    const text = inputValue.trim();
    if (!text || isRunning) return;
    setInputValue("");
    sendUserMessage(text);
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const draftMessages = messages.map((m) => ({
    role: m.role,
    content: getTextContent(m.content),
  }));

  const messageTurns = groupMessageTurns(visibleMessages);

  return (
    <div className="flex flex-1 gap-2 items-start justify-center min-h-0 px-10 w-full relative overflow-hidden">
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />

      <div className="flex flex-1 flex-col h-full items-start max-w-[722px] min-w-0">
        <div className="flex flex-1 flex-col items-center min-h-0 w-full">
          {/* Messages scroll area */}
          <div className="flex flex-1 flex-col gap-6 items-start min-h-0 overflow-y-auto py-6 w-full">
            {messageTurns.map((turn) => {
              if (turn.type === "user") {
                return (
                  <div key={turn.message.id} className="flex flex-col w-full items-end">
                    <div className="bg-[#f1f1f2] flex flex-col gap-3 items-start p-3 rounded-lg shrink-0 max-w-[640px]">
                      <p className="text-base leading-6 text-[#1f1e2f] whitespace-pre-wrap">
                        {getTextContent(turn.message.content)}
                      </p>
                    </div>
                  </div>
                );
              }

              const assistantText = turn.text
                ? getTextContent(turn.text.content).trim()
                : "";

              return (
                <div key={turn.text?.id ?? turn.activities[0]?.id ?? "assistant"} className="flex flex-col w-full items-start">
                  <div className="flex flex-col gap-3 items-start shrink-0 max-w-[640px] w-full">
                    {assistantText && (
                      <p className="text-base leading-6 text-[#1f1e2f] whitespace-pre-wrap">
                        {assistantText}
                      </p>
                    )}
                    {turn.activities.map((msg) => {
                      const activity = renderActivityMessage(
                        msg as Parameters<typeof renderActivityMessage>[0],
                      );
                      if (!activity) return null;

                      return (
                        <div key={msg.id} className="flex flex-col gap-3 items-start w-full">
                          {activity}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {isRunning && (
              <div className="flex w-full items-start">
                <LoadingDots />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom: input + disclaimer */}
          <div className="flex flex-col gap-2 items-center pb-2 shrink-0 w-full">
            <SaveConfigurationButton messages={draftMessages} />

            {/* Input box */}
            <div className="bg-white border border-[#bec0cb] flex flex-col gap-4 items-start p-4 rounded-lg shadow-[0px_2px_8px_rgba(31,30,47,0.15)] shrink-0 w-full">
              <div className="flex gap-4 items-center shrink-0 w-full">
                {/* Attachment button */}
                <button
                  type="button"
                  className="bg-[#f1f1f2] flex items-center justify-center p-2 rounded shrink-0"
                  aria-label="Bijlage toevoegen"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" aria-hidden="true">
                    <path
                      d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
                      stroke="#67687f"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Text input */}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Type je bericht..."
                  disabled={isRunning}
                  className="flex-1 bg-transparent outline-none text-base leading-6 text-[#67687f] placeholder:text-[#67687f] min-w-0"
                />

                {/* Right buttons */}
                <div className="flex gap-2.5 items-center shrink-0">
                  {/* Mic button */}
                  <button
                    type="button"
                    className="flex items-center justify-center p-2 rounded shrink-0"
                    aria-label="Spraakopname"
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#6161ff]" fill="none" aria-hidden="true">
                      <path
                        d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 10v2a7 7 0 0 1-14 0v-2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>

                  {/* Send / Stop button */}
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!inputValue.trim() && !isRunning}
                    className="bg-[#6161ff] flex items-center justify-center p-2 rounded shrink-0 disabled:opacity-40"
                    aria-label={isRunning ? "Stoppen" : "Verzenden"}
                  >
                    {isRunning ? (
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor" aria-hidden="true">
                        <rect x="6" y="6" width="12" height="12" rx="1" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" aria-hidden="true">
                        <path
                          d="M12 19V5M5 12l7-7 7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-sm leading-6 text-[#67687f]">
              We use AI, check important info.{" "}
              <a href="#" className="underline text-[#67687f]">
                More info
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
