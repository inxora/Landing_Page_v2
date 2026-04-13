/** Ficha del lugar INXORA (Lima); abre en Google Maps en nueva pestaña. */
export const INXORA_GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/INXORA/@-12.0497841,-77.0803658,17z/data=!3m1!4b1!4m6!3m5!1s0x9105c9f1ce2026b9:0x90c554afcdbdc128!8m2!3d-12.0497841!4d-77.0803658!16s%2Fg%2F11xvgt6wfx" as const;

/**
 * Base para iframe embebido (mismas coordenadas que la ficha). Añadir `&hl=`.
 * Sin API key.
 */
export const INXORA_GOOGLE_MAPS_EMBED_BASE =
  "https://www.google.com/maps?q=-12.0497841,-77.0803658&z=15&output=embed" as const;
