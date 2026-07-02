import { Heading, Text, LabelBasic } from "@design-system/react";
import type { CatalogRenderers, PropsOf } from "@copilotkit/a2ui-renderer";
import type { StampDefinitions } from "./definitions";
import { InteractiveServiceCard } from "@/components/a2ui/InteractiveServiceCard";
import { QuickReplies } from "@/components/a2ui/QuickReplies";
import { ConfirmationActions } from "@/components/a2ui/ConfirmationActions";

export const stampRenderers: CatalogRenderers<StampDefinitions> = {
  TrackingCard: ({ props }: { props: PropsOf<StampDefinitions, "TrackingCard"> }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col gap-2 shadow-sm w-full">
      <div className="flex items-center justify-between gap-2">
        <Heading level={3} size="s">
          Pakketstatus
        </Heading>
        <LabelBasic>{props.status}</LabelBasic>
      </div>
      <Text size="s" variant="subtle">
        Barcode: {props.barcode}
      </Text>
      {props.estimatedDelivery && (
        <Text size="s">
          Verwachte bezorging: <strong>{props.estimatedDelivery}</strong>
        </Text>
      )}
    </div>
  ),

  PriceRow: ({ props }: { props: PropsOf<StampDefinitions, "PriceRow"> }) => (
    <div
      className={[
        "flex items-baseline justify-between gap-4 py-2",
        props.isTotal
          ? "border-t border-gray-200 mt-1 pt-3"
          : "border-b border-gray-100 last:border-b-0",
      ].join(" ")}
    >
      <Text size="s" variant={props.isTotal ? "default" : "subtle"}>
        {props.label}
      </Text>
      <Text size="s">
        {props.isTotal ? <strong>{props.amount}</strong> : props.amount}
      </Text>
    </div>
  ),

  ServiceCard: ({ props }: { props: PropsOf<StampDefinitions, "ServiceCard"> }) => (
    <InteractiveServiceCard
      name={props.name}
      description={props.description}
      price={props.price}
      badge={props.badge}
    />
  ),

  QuickReplies: ({ props }: { props: PropsOf<StampDefinitions, "QuickReplies"> }) => (
    <QuickReplies options={props.options} />
  ),

  ConfirmationActions: ({
    props,
  }: {
    props: PropsOf<StampDefinitions, "ConfirmationActions">;
  }) => (
    <ConfirmationActions
      confirmLabel={props.confirmLabel}
      cancelLabel={props.cancelLabel}
    />
  ),
};
