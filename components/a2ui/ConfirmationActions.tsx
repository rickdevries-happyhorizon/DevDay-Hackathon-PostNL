"use client";

import { useChatActions } from "@/components/chat/ChatActionContext";

interface ConfirmationActionsProps {
  confirmLabel?: string;
  cancelLabel?: string;
}

export function ConfirmationActions({
  confirmLabel = "Bevestigen",
  cancelLabel = "Annuleren",
}: ConfirmationActionsProps) {
  const { sendUserMessage, isRunning } = useChatActions();

  return (
    <div className="flex flex-wrap gap-3 w-full">
      <button
        type="button"
        disabled={isRunning}
        onClick={() => sendUserMessage(confirmLabel)}
        className="px-5 py-2.5 rounded-lg bg-[#6161ff] text-white text-sm font-medium hover:bg-[#5050e0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {confirmLabel}
      </button>
      <button
        type="button"
        disabled={isRunning}
        onClick={() => sendUserMessage(cancelLabel)}
        className="px-5 py-2.5 rounded-lg border border-[#bec0cb] bg-white text-[#1f1e2f] text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {cancelLabel}
      </button>
    </div>
  );
}
