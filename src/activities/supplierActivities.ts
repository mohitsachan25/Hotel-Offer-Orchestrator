import axios from "axios";
import { Context } from "@temporalio/activity";
import { config } from "../config";
import type { SupplierHotel } from "../mocks/supplierData";



export async function fetchSupplierAHotels(city: string): Promise<SupplierHotel[]> {
  const log = Context.current().log;
  try {
    const { data } = await axios.get<SupplierHotel[]>(config.supplierAUrl, {
      params: { city },
      timeout: 5000,
    });
    return data;
  } catch (err) {
    log.error("Supplier A call failed", { error: (err as Error).message });
    
    return [];
  }
}

export async function fetchSupplierBHotels(city: string): Promise<SupplierHotel[]> {
  const log = Context.current().log;
  try {
    const { data } = await axios.get<SupplierHotel[]>(config.supplierBUrl, {
      params: { city },
      timeout: 5000,
    });
    return data;
  } catch (err) {
    log.error("Supplier B call failed", { error: (err as Error).message });
    return [];
  }
}
