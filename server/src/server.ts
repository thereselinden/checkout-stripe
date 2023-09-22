import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import path from "path";

import customerRouter from "./routes/customer-router";
import productRouter from "./routes/product-router";
import checkoutRouter from "./routes/checkout-route";
import orderRouter from "./routes/order-router";

const CLIENT_URL = process.env.CLIENT_URL;
const PORT: string = process.env.port || "3000";
const app: Express = express();
export const rootPath = path.dirname(__dirname);

// Middlewares
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(
  cookieSession({
    name: "session",
    secret: process.env.COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "strict",
    httpOnly: true,
  })
);

app.use(express.json());
app.use("/api/customer", customerRouter);
app.use("/api", productRouter);
app.use("/api", checkoutRouter);
app.use("/api", orderRouter);

app.listen(PORT, () => console.log(`server is up and running on ${PORT}`));
