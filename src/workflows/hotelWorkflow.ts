import { proxyActivities } from "@temporalio/workflow";
import type * as activities from "../activities";
import type { SupplierHotel } from "../mocks/supplierData";

export interface HotelOffer {
  name: string;
  price: number;
  supplier: "Supplier A" | "Supplier B";
  commissionPct: number;
}


const { fetchSupplierAHotels, fetchSupplierBHotels, saveHotelsToRedis } = proxyActivities<
  typeof activities
>({
  startToCloseTimeout: "10 seconds",
  retry: {
    initialInterval: "1 second",
    maximumAttempts: 3,
  },
});


export async function hotelOfferWorkflow(city: string): Promise<HotelOffer[]> {
  const [listA, listB] = await Promise.all([
    fetchSupplierAHotels(city),
    fetchSupplierBHotels(city),
  ]);

  const merged = dedupeByName(listA, listB);

  await saveHotelsToRedis(city, merged);

  return merged;
}

function dedupeByName(listA: SupplierHotel[], listB: SupplierHotel[]): HotelOffer[] {
  const byName = new Map<string, HotelOffer>();

  const consider = (hotel: SupplierHotel, supplier: "Supplier A" | "Supplier B") => {
    const existing = byName.get(hotel.name);
    if (!existing || hotel.price < existing.price) {
      byName.set(hotel.name, {
        name: hotel.name,
        price: hotel.price,
        supplier,
        commissionPct: hotel.commissionPct,
      });
    }
  };

  for (const hotel of listA) consider(hotel, "Supplier A");
  for (const hotel of listB) consider(hotel, "Supplier B");

  return Array.from(byName.values()).sort((a, b) => a.price - b.price);
}
