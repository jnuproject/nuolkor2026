import type { Language } from "@/lib/language";
import type { Reading } from "@/lib/readings";

export function getLocalizedReadings(
  _day: number,
  language: Language,
  readings: Reading[],
): Reading[] {
  return readings.map(({ translations, ...reading }) => {
    const translated =
      language === "ko" ? translations?.ko : undefined;
    return translated ? { ...reading, ...translated } : reading;
  });
}
