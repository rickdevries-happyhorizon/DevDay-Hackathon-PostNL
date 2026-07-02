"use client";

import { Heading, Text, LabelEmphasis } from "@design-system/react";
import { useChatActions } from "@/components/chat/ChatActionContext";

interface InteractiveDeliveryOptionCardProps {
  name: string;
  description: string;
  priceFrom: string;
  badge?: string;
  available?: boolean;
}

export function InteractiveDeliveryOptionCard({
  name,
  description,
  priceFrom,
  badge,
  available = true,
}: InteractiveDeliveryOptionCardProps) {
  const { sendUserMessage, isRunning } = useChatActions();
  const isDisabled = isRunning || !available;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => sendUserMessage(`Ik kies ${name}`)}
      className={[
        "rounded-xl border p-4 flex flex-col gap-2 shadow-sm w-full text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6161ff]",
        available
          ? "border-gray-200 bg-white hover:border-[#6161ff] hover:bg-[#f8f8ff] cursor-pointer"
          : "border-gray-200 bg-gray-50 text-gray-400 opacity-60 cursor-not-allowed",
        isRunning && available ? "disabled:opacity-50 disabled:cursor-not-allowed" : "",
      ].join(" ")}
      aria-label={available ? `Kies ${name}` : `${name} — niet beschikbaar`}
      aria-disabled={!available}
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
      <Text size="s">
        Vanaf <strong>{priceFrom}</strong>
      </Text>
    </button>
  );
}
