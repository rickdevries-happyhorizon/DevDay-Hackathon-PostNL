"use client";

import { Heading, Text, LabelEmphasis } from "@design-system/react";
import { useChatActions } from "@/components/chat/ChatActionContext";

interface InteractiveServiceCardProps {
  name: string;
  description: string;
  price: string;
  badge?: string;
}

export function InteractiveServiceCard({
  name,
  description,
  price,
  badge,
}: InteractiveServiceCardProps) {
  const { sendUserMessage, isRunning } = useChatActions();

  return (
    <button
      type="button"
      disabled={isRunning}
      onClick={() => sendUserMessage(`Ik kies ${name}`)}
      className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col gap-2 shadow-sm w-full text-left transition-colors hover:border-[#6161ff] hover:bg-[#f8f8ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6161ff] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      aria-label={`Kies ${name}`}
    >
      <div className="flex items-start justify-between gap-2">
        <Heading level={3} size="s">
          {name}
        </Heading>
        {badge && <LabelEmphasis>{badge}</LabelEmphasis>}
      </div>
      <Text size="s" variant="subtle">
        {description}
      </Text>
      <Text size="m">
        <strong>{price}</strong>
      </Text>
    </button>
  );
}
