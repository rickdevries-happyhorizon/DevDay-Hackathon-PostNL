/** Reference data for realistic weight/dimension estimates by product type. */

export const WEIGHT_ESTIMATES_KG: Record<string, { min: number; max: number; typical: number }> = {
  kleding: { min: 0.2, max: 1.5, typical: 0.5 },
  schoenen: { min: 0.3, max: 1.2, typical: 0.7 },
  boek: { min: 0.2, max: 1.0, typical: 0.4 },
  elektronica_klein: { min: 0.1, max: 0.5, typical: 0.3 },
  smartphone: { min: 0.2, max: 0.5, typical: 0.35 },
  laptop: { min: 1.5, max: 3.5, typical: 2.2 },
  schilderij: { min: 0.5, max: 5.0, typical: 2.0 },
  cadeau: { min: 0.3, max: 2.0, typical: 0.8 },
  voedsel: { min: 0.5, max: 5.0, typical: 1.5 },
  gereedschap: { min: 0.5, max: 8.0, typical: 2.5 },
  cosmetica: { min: 0.1, max: 1.0, typical: 0.3 },
  default: { min: 0.5, max: 3.0, typical: 1.0 },
};

export const SIZE_ESTIMATES_CM: Record<
  string,
  { label: string; length: number; width: number; height: number }
> = {
  klein: { label: "Klein (brievenbusformaat)", length: 23, width: 16, height: 4 },
  middel: { label: "Middel (schoenendoos)", length: 35, width: 25, height: 12 },
  groot: { label: "Groot (moving box)", length: 60, width: 40, height: 30 },
};

/** PostNL locker max dimensions (approximate). */
export const LOCKER_MAX = {
  lengthCm: 45,
  widthCm: 35,
  heightCm: 25,
  maxWeightKg: 10,
};

export const DELIVERY_OPTIONS = [
  {
    id: "locker",
    name: "PostNL-locker",
    description: "Zelf label printen en in locker deponeren. 24/7 beschikbaar.",
    priceFrom: "€4,25",
  },
  {
    id: "pakketpunt",
    name: "Wegbrengen naar pakketpunt",
    description: "Breng je pakket naar een PostNL-punt bij jou in de buurt.",
    priceFrom: "€3,95",
  },
  {
    id: "ophalen",
    name: "Ophalen",
    description: "PostNL haalt het pakket op bij jou thuis of op kantoor.",
    priceFrom: "€6,95",
  },
  {
    id: "regelen",
    name: "Regel het maar voor me",
    description: "Volledige afhandeling door PostNL — inpakken, label en verzenden.",
    priceFrom: "€12,95",
  },
] as const;
