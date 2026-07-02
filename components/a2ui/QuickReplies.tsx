"use client";

import { useChatActions } from "@/components/chat/ChatActionContext";

interface QuickRepliesProps {
  options: string[];
}

export function QuickReplies({ options }: QuickRepliesProps) {
  const { sendUserMessage, isRunning } = useChatActions();

  if (!options.length) return null;

  return (
    <div className="flex flex-wrap gap-2 w-full">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          disabled={isRunning}
          onClick={() => sendUserMessage(option)}
          className="px-4 py-2 rounded-full border border-[#bec0cb] bg-white text-sm text-[#1f1e2f] hover:border-[#6161ff] hover:bg-[#f8f8ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
