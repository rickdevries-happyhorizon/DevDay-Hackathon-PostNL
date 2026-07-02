"use client";

import { useChatActions } from "@/components/chat/ChatActionContext";
import { SAVE_CONFIGURATION_MESSAGE } from "@/lib/store-configuration";

interface SaveConfigurationActionProps {
  label?: string;
}

export function SaveConfigurationAction({
  label = "Configuratie opslaan voor winkel",
}: SaveConfigurationActionProps) {
  const { sendUserMessage, isRunning } = useChatActions();

  return (
    <button
      type="button"
      disabled={isRunning}
      onClick={() => sendUserMessage(SAVE_CONFIGURATION_MESSAGE)}
      className="px-4 py-2 rounded-lg border border-[#6161ff]/40 bg-white text-sm text-[#6161ff] font-medium hover:bg-[#f8f8ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto"
    >
      {label}
    </button>
  );
}
