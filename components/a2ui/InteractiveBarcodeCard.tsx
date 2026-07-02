"use client";

import { useEffect, useState } from "react";
import { Heading, Text, LabelBasic, LabelEmphasis } from "@design-system/react";
import { ScannableBarcode } from "@/components/a2ui/ScannableBarcode";
import {
  saveStoreConfiguration,
  STORE_FIELD_STATUS_LABELS,
  type StoreConfigurationField,
} from "@/lib/store-configuration";

interface InteractiveBarcodeCardProps {
  barcode: string;
  reason: string;
  summary?: string;
  fields: StoreConfigurationField[];
  pendingQuestions?: string[];
}

function statusBadgeClass(status: StoreConfigurationField["status"]): string {
  switch (status) {
    case "confirmed":
      return "bg-green-50 text-green-800 border-green-200";
    case "estimated":
      return "bg-amber-50 text-amber-800 border-amber-200";
    case "missing":
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
}

export function InteractiveBarcodeCard({
  barcode,
  reason,
  summary,
  fields,
  pendingQuestions = [],
}: InteractiveBarcodeCardProps) {
  const [saved, setSaved] = useState(false);

  const answeredCount = fields.filter((f) => f.status !== "missing").length;
  const totalCount = fields.length;

  useEffect(() => {
    saveStoreConfiguration({
      barcode,
      reason,
      summary,
      fields,
      pendingQuestions,
    });
    setSaved(true);
  }, [barcode, reason, summary, fields, pendingQuestions]);

  function handleSave() {
    saveStoreConfiguration({
      barcode,
      reason,
      summary,
      fields,
      pendingQuestions,
    });
    setSaved(true);
  }

  return (
    <div className="rounded-xl border border-[#6161ff]/30 bg-[#f8f8ff] p-4 flex flex-col gap-4 shadow-sm w-full">
      <div className="flex items-start justify-between gap-3">
        <Heading level={3} size="s">
          Winkel-configuratie
        </Heading>
        <LabelEmphasis>
          {answeredCount}/{totalCount} ingevuld
        </LabelEmphasis>
      </div>

      <Text size="s">{reason}</Text>

      <ScannableBarcode code={barcode} />

      <Text size="s" variant="subtle">
        Laat medewerkers in de winkel deze barcode scannen om je configuratie te laden.
      </Text>

      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
          <Text size="s">
            <strong>Opgeslagen gegevens</strong>
          </Text>
        </div>
        <ul className="divide-y divide-gray-100">
          {fields.map((field) => (
            <li
              key={field.label}
              className="px-3 py-2.5 flex items-start justify-between gap-3"
            >
              <div className="flex flex-col gap-0.5 min-w-0">
                <Text size="s" variant="subtle">
                  {field.label}
                </Text>
                <Text size="s">
                  {field.value ?? "—"}
                </Text>
              </div>
              <LabelBasic>
                <span
                  className={`inline-flex px-2 py-0.5 rounded-full border text-xs font-medium whitespace-nowrap ${statusBadgeClass(field.status)}`}
                >
                  {STORE_FIELD_STATUS_LABELS[field.status]}
                </span>
              </LabelBasic>
            </li>
          ))}
        </ul>
      </div>

      {pendingQuestions.length > 0 && (
        <div className="flex flex-col gap-1">
          <Text size="s" variant="subtle">
            Nog te beantwoorden in de winkel
          </Text>
          <ul className="list-disc list-inside">
            {pendingQuestions.map((question) => (
              <li key={question}>
                <Text size="s">{question}</Text>
              </li>
            ))}
          </ul>
        </div>
      )}

      {summary && <Text size="s">{summary}</Text>}

      <button
        type="button"
        onClick={handleSave}
        className="px-5 py-2.5 rounded-lg bg-[#6161ff] text-white text-sm font-medium hover:bg-[#5050e0] transition-colors cursor-pointer w-full sm:w-auto self-start"
      >
        {saved ? "Opgeslagen op dit apparaat" : "Configuratie opslaan"}
      </button>

      {saved && (
        <Text size="s" variant="subtle">
          Je configuratie staat klaar. Neem je telefoon mee naar het PostNL-punt en scan de barcode.
        </Text>
      )}
    </div>
  );
}
