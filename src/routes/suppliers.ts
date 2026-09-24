import { Router } from "express";
import { getSupplierAHotels, getSupplierBHotels } from "../mocks/supplierData";

export const suppliersRouter = Router();


suppliersRouter.get("/supplierA/hotels", (req, res) => {
  if (req.query.simulateDown === "true") {
    return res.status(503).json({ error: "Supplier A is temporarily unavailable" });
  }
  const city = String(req.query.city || "delhi");
  res.json(getSupplierAHotels(city));
});

suppliersRouter.get("/supplierB/hotels", (req, res) => {
  if (req.query.simulateDown === "true") {
    return res.status(503).json({ error: "Supplier B is temporarily unavailable" });
  }
  const city = String(req.query.city || "delhi");
  res.json(getSupplierBHotels(city));
});
