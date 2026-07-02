import { Heading, Text, LabelBasic, LabelEmphasis } from "@design-system/react";
import type { CatalogRenderers, PropsOf } from "@copilotkit/a2ui-renderer";
import type { StampDefinitions } from "./definitions";
import { InteractiveBarcodeCard } from "@/components/a2ui/InteractiveBarcodeCard";
import { InteractiveServiceCard } from "@/components/a2ui/InteractiveServiceCard";
import { InteractiveDeliveryOptionCard } from "@/components/a2ui/InteractiveDeliveryOptionCard";
import { QuickReplies } from "@/components/a2ui/QuickReplies";
import { ConfirmationActions } from "@/components/a2ui/ConfirmationActions";
import { SaveConfigurationAction } from "@/components/a2ui/SaveConfigurationAction";

const ALERT_STYLES = {
  tip: {
    border: "border-[#6161ff]/30",
    bg: "bg-[#f8f8ff]",
    icon: "💡",
  },
  warning: {
    border: "border-amber-300",
    bg: "bg-amber-50",
    icon: "⚠️",
  },
  info: {
    border: "border-blue-200",
    bg: "bg-blue-50",
    icon: "ℹ️",
  },
} as const;

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

  PriceBreakdown: ({
    props,
  }: {
    props: PropsOf<StampDefinitions, "PriceBreakdown">;
  }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col shadow-sm w-full">
      {props.rows.map((row, index) => (
        <div
          key={`${row.label}-${index}`}
          className={[
            "flex items-baseline justify-between gap-4 py-2",
            row.isTotal
              ? "border-t border-gray-200 mt-1 pt-3"
              : "border-b border-gray-100 last:border-b-0",
          ].join(" ")}
        >
          <Text size="s" variant={row.isTotal ? "default" : "subtle"}>
            {row.label}
          </Text>
          <Text size="s">
            {row.isTotal ? <strong>{row.amount}</strong> : row.amount}
          </Text>
        </div>
      ))}
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

  QuestionCard: ({ props }: { props: PropsOf<StampDefinitions, "QuestionCard"> }) => (
    <p className="text-base leading-6 text-[#1f1e2f] whitespace-pre-wrap w-full">
      {props.question}
    </p>
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

  SaveConfigurationAction: ({
    props,
  }: {
    props: PropsOf<StampDefinitions, "SaveConfigurationAction">;
  }) => (
    <SaveConfigurationAction label={props.label} />
  ),

  DeliveryOptionCard: ({
    props,
  }: {
    props: PropsOf<StampDefinitions, "DeliveryOptionCard">;
  }) => (
    <InteractiveDeliveryOptionCard
      name={props.name}
      description={props.description}
      priceFrom={props.priceFrom}
      badge={props.badge}
      available={props.available}
    />
  ),

  AlertBanner: ({ props }: { props: PropsOf<StampDefinitions, "AlertBanner"> }) => {
    const style = ALERT_STYLES[props.type];
    return (
      <div
        className={`rounded-xl border ${style.border} ${style.bg} p-4 flex flex-col gap-2 w-full`}
      >
        <div className="flex items-center gap-2">
          <span aria-hidden="true">{style.icon}</span>
          <Heading level={3} size="s">
            {props.title}
          </Heading>
        </div>
        <Text size="s">{props.message}</Text>
      </div>
    );
  },

  PickupPointCard: ({
    props,
  }: {
    props: PropsOf<StampDefinitions, "PickupPointCard">;
  }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col gap-2 shadow-sm w-full">
      <div className="flex items-start justify-between gap-2">
        <Heading level={3} size="s">
          {props.name}
        </Heading>
        <LabelEmphasis>{props.distance}</LabelEmphasis>
      </div>
      <Text size="s" variant="subtle">
        {props.address}
      </Text>
      <Text size="s">
        Openingstijden: <strong>{props.openingHours}</strong>
      </Text>
    </div>
  ),

  BarcodeCard: ({ props }: { props: PropsOf<StampDefinitions, "BarcodeCard"> }) => (
    <InteractiveBarcodeCard
      barcode={props.barcode}
      reason={props.reason}
      summary={props.summary}
      fields={props.fields}
      pendingQuestions={props.pendingQuestions}
    />
  ),

  ConfirmationCard: ({
    props,
  }: {
    props: PropsOf<StampDefinitions, "ConfirmationCard">;
  }) => (
    <div className="rounded-xl border border-green-200 bg-green-50 p-6 flex flex-col gap-3 w-full">
      <div className="flex items-center gap-3">
        <div className="bg-green-500 rounded-full p-1.5 shrink-0">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <Heading level={3} size="s">
          {props.message}
        </Heading>
      </div>
      <Text size="s" variant="subtle">
        Dienst: <strong>{props.serviceName}</strong>
      </Text>
      <Text size="s" variant="subtle">
        Referentie: <strong>{props.orderReference}</strong>
      </Text>
    </div>
  ),

  ShipmentSummaryCard: ({
    props,
  }: {
    props: PropsOf<StampDefinitions, "ShipmentSummaryCard">;
  }) => (
    <div className="rounded-xl border border-[#6161ff]/30 bg-[#f8f8ff] p-4 flex flex-col gap-3 w-full">
      <Heading level={3} size="s">
        Overzicht zending
      </Heading>
      <div className="flex justify-between gap-4">
        <Text size="s" variant="subtle">
          Aanbiedwijze
        </Text>
        <Text size="s">
          <strong>{props.deliveryMethod}</strong>
        </Text>
      </div>
      <div className="flex justify-between gap-4">
        <Text size="s" variant="subtle">
          Totale kosten
        </Text>
        <Text size="s">
          <strong>{props.totalCost}</strong>
        </Text>
      </div>
      {props.actions.length > 0 && (
        <div className="flex flex-col gap-1">
          <Text size="s" variant="subtle">
            Benodigde handelingen
          </Text>
          <ul className="list-disc list-inside">
            {props.actions.map((action) => (
              <li key={action}>
                <Text size="s">{action}</Text>
              </li>
            ))}
          </ul>
        </div>
      )}
      {props.warnings && props.warnings.length > 0 && (
        <div className="flex flex-col gap-1 pt-2 border-t border-[#6161ff]/20">
          <Text size="s" variant="subtle">
            Waarschuwingen
          </Text>
          {props.warnings.map((warning) => (
            <Text key={warning} size="s">
              ⚠️ {warning}
            </Text>
          ))}
        </div>
      )}
    </div>
  ),
};
