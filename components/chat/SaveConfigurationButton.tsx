"use client";

import { useState } from "react";
import { useChatActions } from "@/components/chat/ChatActionContext";
import {
  SAVE_CONFIGURATION_MESSAGE,
  saveConversationDraft,
} from "@/lib/store-configuration";

interface SaveConfigurationButtonProps {
  messages: Array<{ role: string; content: string }>;
  disabled?: boolean;
}

export function SaveConfigurationButton({
  messages,
  disabled = false,
}: SaveConfigurationButtonProps) {
  const { sendUserMessage, isRunning } = useChatActions();
  const [draftSaved, setDraftSaved] = useState(false);

  const hasConversation = messages.some((m) => m.role === "user");

  function handleClick() {
    if (isRunning || disabled || !hasConversation) return;

    saveConversationDraft(messages);
    setDraftSaved(true);
    sendUserMessage(SAVE_CONFIGURATION_MESSAGE);
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <button
        type="button"
        onClick={handleClick}
        disabled={isRunning || disabled || !hasConversation}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[#6161ff]/30 bg-[#f8f8ff] text-sm font-medium text-[#6161ff] hover:bg-[#efefff] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer w-full"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 shrink-0"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="17 21 17 13 7 13 7 21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="7 3 7 8 15 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Configuratie opslaan voor winkel
      </button>
      {draftSaved && (
        <p className="text-xs text-[#67687f]">
          Concept opgeslagen — barcode wordt aangemaakt…
        </p>
      )}
    </div>
  );
}
