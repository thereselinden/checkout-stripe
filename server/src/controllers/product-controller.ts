import { Request, Response } from "express";

import { initStripe } from "../stripe/stripe";

const stripe = initStripe();

export const getProducts = async (req: Request, res: Response) => {
  try {
    if (!stripe)
      return res.status(500).json({ message: "Could not connect to stripe" });

    const products = await stripe.products.list({
      limit: 10,
      expand: ["data.default_price"],
    });

    if (!products)
      return res.status(400).json({ message: "Could not get products" });

    res.status(200).json(products.data);
  } catch (err) {
    console.log(err);
  }
};
