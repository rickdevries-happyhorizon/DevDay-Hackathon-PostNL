import { z } from "zod";
import type { CatalogDefinitions } from "@copilotkit/a2ui-renderer";

export const stampDefinitions = {
  TrackingCard: {
    description:
      "Shows a PostNL parcel tracking status: barcode, current status label, and optional estimated delivery date. Use this when the user asks about their package.",
    props: z.object({
      barcode: z.string(),
      status: z.string(),
      estimatedDelivery: z.string().optional(),
    }),
  },

  PriceRow: {
    description:
      "One line in a shipping price breakdown: a label and a formatted euro amount. Use multiple PriceRows inside a Column to build a price table. Mark the total row with isTotal.",
    props: z.object({
      label: z.string(),
      amount: z.string(),
      isTotal: z.boolean().optional(),
    }),
  },

  ServiceCard: {
    description:
      "A clickable PostNL shipping service option. Use when presenting shipping methods after destination and weight are known. " +
      "Render three cards: Standaard, Express, and Economy. The user clicks a card to select — do NOT ask them to type the service name. " +
      "Each card shows name, description, price, and optional badge (e.g. 'Aangeraden', 'Snel').",
    props: z.object({
      name: z.string(),
      description: z.string(),
      price: z.string(),
      badge: z.string().optional(),
    }),
  },

  QuickReplies: {
    description:
      "Clickable answer chips shown below a question. Use when asking the user to pick from known options " +
      "(e.g. countries: 'Nederland', 'België', 'Duitsland' or weights: '0-2 kg', '2-5 kg', '5-10 kg'). " +
      "Always include QuickReplies together with your question text.",
    props: z.object({
      options: z
        .array(z.string())
        .describe("Clickable options the user can choose from"),
    }),
  },

  ConfirmationActions: {
    description:
      "Bevestig/annuleer knoppen na een prijsopbouw. Toon dit wanneer de gebruiker klaar is om te bevestigen of af te breken.",
    props: z.object({
      confirmLabel: z.string().optional().describe("Label for confirm button, default 'Bevestigen'"),
      cancelLabel: z.string().optional().describe("Label for cancel button, default 'Annuleren'"),
    }),
  },
} satisfies CatalogDefinitions;

export type StampDefinitions = typeof stampDefinitions;
