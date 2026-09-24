import express from "express";
import { config } from "./config";
import { suppliersRouter } from "./routes/suppliers";
import { hotelsRouter } from "./routes/hotels";
import { healthRouter } from "./routes/health";

const app = express();
app.use(express.json());

app.use(suppliersRouter);
app.use(hotelsRouter);
app.use(healthRouter);

app.listen(config.port, () => {
  console.log(`[server] listening on port ${config.port}`);
});
