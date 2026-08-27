import type { ProductOffer } from "@/types/offer";

/**
 * Ofertas comerciales de ElectroSpainPro.
 *
 * Esta colección será la fuente temporal del Data Engine
 * hasta la futura migración a Prisma.
 *
 * NO introducir precios, stock o URLs inventadas.
 *
 * Las ofertas se incorporarán únicamente cuando hayan
 * sido verificadas.
 */
export const offers: ProductOffer[] = [];