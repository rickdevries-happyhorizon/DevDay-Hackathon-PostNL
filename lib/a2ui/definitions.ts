import { z } from "zod";
import type { CatalogDefinitions } from "@copilotkit/a2ui-renderer";

export const stampDefinitions = {
  TrackingCard: {
    description:
      "PostNL pakketstatuskaart met barcode, huidige status en optionele bezorgdatum. " +
      "Gebruik ALLEEN wanneer de gebruiker naar een pakket vraagt en een barcode of trackingcode noemt (bijv. '3SPOST123456'). " +
      "Do NOT use for shipping quotes, service selection, addresses, or general questions.",
    props: z.object({
      barcode: z.string().describe("De tracking- of barcode van het pakket"),
      status: z.string().describe("Huidige status in het Nederlands, bijv. 'Onderweg'"),
      estimatedDelivery: z
        .string()
        .optional()
        .describe("Verwachte bezorgdatum, bijv. 'morgen 15:00'"),
    }),
  },

  PriceRow: {
    description:
      "Eén regel in een prijsopbouw: label + bedrag in euro's. " +
      "Gebruik PriceBreakdown (niet meerdere PriceRows) voor een volledige prijsopbouw na servicekeuze. " +
      "Do NOT use before the user has chosen a service. Do NOT wrap in Column or List.",
    props: z.object({
      label: z.string().describe("Regelomschrijving, bijv. 'Verzendkosten'"),
      amount: z.string().describe("Bedrag met valuta, bijv. '€ 8,95'"),
      isTotal: z.boolean().optional().describe("true op de totaalregel"),
    }),
  },

  PriceBreakdown: {
    description:
      "Volledige prijsopbouw als één component. Gebruik dit (niet meerdere PriceRows in Column/List) " +
      "direct nadat de gebruiker een verzendoptie kiest. Zet isTotal: true op de laatste regel. " +
      "Do NOT use before the user has chosen a service.",
    props: z.object({
      rows: z
        .array(
          z.object({
            label: z.string().describe("Regelomschrijving, bijv. 'Verzendkosten'"),
            amount: z.string().describe("Bedrag met valuta, bijv. '€ 8,95'"),
            isTotal: z.boolean().optional().describe("true op de totaalregel"),
          }),
        )
        .describe("Prijsregels in volgorde; laatste regel meestal totaal met isTotal: true"),
    }),
  },

  ServiceCard: {
    description:
      "Klikbare PostNL verzendoptie-kaart. Gebruik wanneer je zowel bestemmingsland als gewicht kent " +
      "en de gebruiker een verzendmethode moet kiezen. " +
      "Render drie kaarten: Standaard, Express en Economy. De gebruiker klikt om te kiezen — vraag niet om typen. " +
      "Elke kaart toont naam (bijv. 'Pakket Standaard'), korte omschrijving, prijs en optionele badge ('Aangeraden', 'Snel'). " +
      "Do NOT use for tracking, addresses, confirmation, or when country/weight is still unknown.",
    props: z.object({
      name: z.string().describe("Naam van de dienst, bijv. 'Pakket Standaard'"),
      description: z.string().describe("Korte omschrijving in het Nederlands"),
      price: z.string().describe("Prijs inclusief valuta, bijv. '€ 8,95'"),
      badge: z.string().optional().describe("Optionele badge, bijv. 'Aangeraden'"),
    }),
  },

  QuickReplies: {
    description:
      "Clickable answer chips shown below a question. Use when asking the user to pick from known options " +
      "(e.g. countries: 'Nederland', 'België', 'Duitsland' or weights: '0-2 kg', '2-5 kg', '5-10 kg'). " +
      "Always include QuickReplies together with your question text. Requires QuestionCard above it.",
    props: z.object({
      options: z
        .array(z.string())
        .describe("Clickable options the user can choose from"),
    }),
  },

  QuestionCard: {
    description:
      "Toon de vraag prominent aan de gebruiker. Gebruik dit bij ELKE vraag in de flow — " +
      "altijd vóór QuickReplies, SaveConfigurationAction of andere keuze-componenten. " +
      "Do NOT use basic-catalog Text instead of this component.",
    props: z.object({
      question: z.string().describe("De vraag in het Nederlands"),
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

  SaveConfigurationAction: {
    description:
      "Knop waarmee de gebruiker op elk moment de huidige voortgang kan opslaan voor afhandeling in de winkel. " +
      "Toon deze knop onder vragen of samenvattingen zodat opslaan altijd mogelijk is. " +
      "Gebruik GEEN formulieren of TextField — alleen deze knop.",
    props: z.object({
      label: z
        .string()
        .optional()
        .describe("Knoplabel, standaard 'Configuratie opslaan voor winkel'"),
    }),
  },

  DeliveryOptionCard: {
    description:
      "Klikbare kaart voor een aanbiedwijze. Toon vier kaarten bij 'Hoe wil je het aanbieden?': " +
      "PostNL-locker, Wegbrengen naar pakketpunt, Ophalen, Regel het maar voor me. " +
      "De gebruiker klikt om te kiezen — vraag niet om typen. " +
      "Zet available: false op PostNL-locker wanneer die niet kan (locker vol, pakket te groot/gewicht te hoog).",
    props: z.object({
      name: z.string(),
      description: z.string(),
      priceFrom: z.string(),
      badge: z.string().optional(),
      available: z
        .boolean()
        .optional()
        .describe("false = optie is niet beschikbaar en wordt grijs getoond (niet klikbaar). Standaard true."),
    }),
  },

  AlertBanner: {
    description:
      "Opvallend bericht voor tips, waarschuwingen of info. " +
      "type 'tip' = verpakkingstips, 'warning' = te groot/breekbaar/locker vol, 'info' = algemene info/upsell.",
    props: z.object({
      type: z.enum(["tip", "warning", "info"]),
      title: z.string(),
      message: z.string(),
    }),
  },

  PickupPointCard: {
    description:
      "Toont een fictief dichtstbijzijnd PostNL-punt met adres, afstand en openingstijden. " +
      "Gebruik wanneer de gebruiker naar pakketpunt gaat of wordt doorverwezen (geen printer, locker vol, te groot).",
    props: z.object({
      name: z.string(),
      address: z.string(),
      distance: z.string(),
      openingHours: z.string(),
    }),
  },

  BarcodeCard: {
    description:
      "Scannable PostNL barcode + opgeslagen winkel-configuratie. Gebruik wanneer: " +
      "(1) normale afhandeling niet lukt (geen printer, locker vol, te groot), " +
      "(2) de gebruiker info niet weet (gewicht, afmetingen, adres), " +
      "(3) de gebruiker wil verder in de winkel, " +
      "(4) het gesprek incompleet is maar de gebruiker wil alvast opslaan, of " +
      "(5) de gebruiker op 'Configuratie opslaan voor winkel' klikt. " +
      "Vul fields met ALLE tot nu toe verzamelde vragen/antwoorden uit het gesprek. " +
      "Markeer ontbrekende info als status 'missing'. Schattingen als 'estimated'. " +
      "Barcode-formaat: 3SPOSTNL + 10 cijfers (bijv. 3SPOSTNL4829173650).",
    props: z.object({
      barcode: z.string().describe("Unieke barcode, formaat 3SPOSTNL + 10 cijfers"),
      reason: z.string().describe("Waarom de gebruiker naar de winkel gaat"),
      summary: z.string().optional().describe("Korte samenvatting voor de klant"),
      fields: z
        .array(
          z.object({
            label: z.string().describe("Vraag of veldnaam, bijv. 'Gewicht'"),
            value: z.string().optional().describe("Antwoord; leeg laten bij missing"),
            status: z
              .enum(["confirmed", "estimated", "missing"])
              .describe("confirmed = zeker, estimated = inschatting, missing = nog onbekend"),
          }),
        )
        .describe("Alle verzamelde gespreksgegevens voor in de winkel"),
      pendingQuestions: z
        .array(z.string())
        .optional()
        .describe("Vragen die nog in de winkel beantwoord moeten worden"),
    }),
  },

  ShipmentSummaryCard: {
    description:
      "Afrondingsoverzicht met verzendoptie, kosten, benodigde handelingen en eventuele waarschuwingen. " +
      "Toon dit vlak voor ConfirmationActions bij afronding van de flow. Do NOT use after the user has already confirmed.",
    props: z.object({
      deliveryMethod: z.string(),
      totalCost: z.string(),
      actions: z.array(z.string()),
      warnings: z.array(z.string()).optional(),
    }),
  },

  ConfirmationCard: {
    description:
      "Bevestigingsscherm na een succesvolle boeking. Toont orderreferentie, dienstnaam en een vriendelijk succesbericht. " +
      "Gebruik dit ALLEEN aan het EINDE van het gesprek wanneer de gebruiker expliciet heeft bevestigd (via Bevestigen-knop of 'Bevestigen' in tekst). " +
      "Do NOT use before confirmation, and do NOT use for price breakdowns or service selection.",
    props: z.object({
      orderReference: z
        .string()
        .describe("Unieke referentie, bijv. '3SPOST-2026-001'"),
      serviceName: z
        .string()
        .describe("Naam van de geboekte dienst, bijv. 'Pakket Standaard'"),
      message: z
        .string()
        .describe("Kort bevestigingsbericht in het Nederlands, bijv. 'Je pakket is aangemeld!'"),
    }),
  },
} satisfies CatalogDefinitions;

export type StampDefinitions = typeof stampDefinitions;
