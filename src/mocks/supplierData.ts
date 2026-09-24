export interface SupplierHotel {
  hotelId: string;
  name: string;
  price: number;
  city: string;
  commissionPct: number;
}


const supplierAHotels: SupplierHotel[] = [
  { hotelId: "a1", name: "Holtin", price: 6000, city: "delhi", commissionPct: 10 },
  { hotelId: "a2", name: "Radison", price: 5900, city: "delhi", commissionPct: 13 },
  { hotelId: "a3", name: "Grand Plaza", price: 7200, city: "delhi", commissionPct: 8 },
  { hotelId: "a4", name: "Taj Palace", price: 9800, city: "delhi", commissionPct: 12 },
  { hotelId: "a5", name: "Holtin", price: 4200, city: "mumbai", commissionPct: 10 },
  { hotelId: "a6", name: "Sea View Inn", price: 5100, city: "mumbai", commissionPct: 9 },
];

const supplierBHotels: SupplierHotel[] = [
  { hotelId: "b1", name: "Holtin", price: 5340, city: "delhi", commissionPct: 20 },
  { hotelId: "b2", name: "Radison", price: 6100, city: "delhi", commissionPct: 11 },
  { hotelId: "b3", name: "Grand Plaza", price: 6950, city: "delhi", commissionPct: 15 },
  { hotelId: "b4", name: "City Central", price: 4800, city: "delhi", commissionPct: 7 },
  { hotelId: "b5", name: "Holtin", price: 4500, city: "mumbai", commissionPct: 14 },
  { hotelId: "b6", name: "Ocean Pearl", price: 5600, city: "mumbai", commissionPct: 10 },
];

export function getSupplierAHotels(city: string): SupplierHotel[] {
  return supplierAHotels.filter((h) => h.city.toLowerCase() === city.toLowerCase());
}

export function getSupplierBHotels(city: string): SupplierHotel[] {
  return supplierBHotels.filter((h) => h.city.toLowerCase() === city.toLowerCase());
}
