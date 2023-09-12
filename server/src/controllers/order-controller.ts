import { Request, Response } from 'express';
import Stripe from 'stripe';
import fs from 'fs/promises';

import { initStripe } from '../stripe/stripe';
import { rootPath } from '../server';

const stripe = initStripe();

export const verifyOrder = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;
    if (!stripe)
      return res.status(500).json({ message: 'Could not connect to stripe' });

    //const { sessionId } = req.body;
    if (!req.body.sessionId)
      return res.status(400).json({ message: 'No sessionId provided' });

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    if (session.payment_status !== 'paid')
      return res.status(400).json({ verified: false });

    const lineItems: Stripe.ApiList<Stripe.LineItem> | undefined =
      session.line_items;

    if (!lineItems)
      return res.status(400).json({ message: 'Could not get line items' });

    const orderItems = Promise.all(
      lineItems.data.map(async (item: Stripe.LineItem) => {
        if (item.price) {
          const productInfo = await stripe.products.retrieve(
            item.price.product.toString()
          );
          const productName = productInfo.name;
          const productImg = productInfo.images[0];

          const product = {
            product_id: item.price.product,
            product_name: productName,
            product_image: productImg,
            price: item.price.unit_amount,
            quantity: item.quantity,
            discount: item.amount_discount,
            total_price: item.amount_total,
          };

          return product;
        } else {
          res
            .status(200)
            .json({ message: `Price information not available for ${item}` });
        }
      })
    );

    const order = {
      order_id: session.id,
      created: session.created,
      customer: {
        id: session.customer,
        name: session.customer_details?.name,
        email: session.customer_details?.email,
      },
      products: await orderItems,
    };
    saveOrder(order);

    res.status(200).json({ verified: true, data: order });
  } catch (err) {
    res.status(400).json('Could not verify order');
  }
};

const saveOrder = async order => {
  const dataFilePath = `${rootPath}/data/orders.json`;
  const fileData = await fs.readFile(dataFilePath);

  let orders = [];

  // check if file contains data, update users array with that data
  if (fileData.length > 1) {
    // convert from buffer to string before parsing
    const fileContent = fileData.toString();
    orders = JSON.parse(fileContent);
  }

  orders.push(order);

  await fs.writeFile(dataFilePath, JSON.stringify(orders, null, 2));
};
