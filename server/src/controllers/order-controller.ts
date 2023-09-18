import { Request, Response } from 'express';
import Stripe from 'stripe';
import fs from 'fs/promises';

import { initStripe } from '../stripe/stripe';
import { rootPath } from '../server';
import { IOrder } from '../interfaces/interface';
import {
  STRIPE_CONNECT_ERROR,
  ORDER_SESSIONID_ERROR,
  STRIPE_LINEITEMS_ERROR,
  STRIPE_PRICE_OBJECT_ERROR,
  ORDER_VERIFY_ERROR,
} from '../variables/variables';

const stripe = initStripe();

export const verifyOrder = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;
    if (!stripe) return res.status(500).json({ message: STRIPE_CONNECT_ERROR });

    if (!sessionId)
      return res.status(400).json({ message: ORDER_SESSIONID_ERROR });

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    if (session.payment_status !== 'paid')
      return res.status(400).json({ verified: false });

    const lineItems: Stripe.ApiList<Stripe.LineItem> | undefined =
      session.line_items;

    if (!lineItems)
      return res.status(400).json({ message: STRIPE_LINEITEMS_ERROR });

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
            .json({ message: `${STRIPE_PRICE_OBJECT_ERROR} ${item}` });
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
      amount_total: session.amount_total,
    };

    saveOrder(order, sessionId);

    res.status(200).json({ verified: true, data: order });
  } catch (err) {
    console.log('catch verify order', err);
    res.status(400).json({ message: ORDER_VERIFY_ERROR });
  }
};

const saveOrder = async (order: any, sessionId: string) => {
  const dataFilePath = `${rootPath}/data/orders.json`;
  const fileData = await fs.readFile(dataFilePath);

  let orders: IOrder[] = [];

  // check if file contains data, update users array with that data
  if (fileData.length > 1) {
    // convert from buffer to string before parsing
    const fileContent = fileData.toString();

    orders = JSON.parse(fileContent);

    // if order number already exist, return (if refresh page on confirmation page)
    if (orders.some(order => order.order_id === sessionId)) return;
  }

  orders.push(order);

  await fs.writeFile(dataFilePath, JSON.stringify(orders, null, 2));
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const customer = req.session?.id;

    if (!customer)
      return res
        .status(403)
        .json({ message: 'Must be logged in for this request' });

    // get orders data read file
    const dataFilePath = `${rootPath}/data/orders.json`;
    const fileData = await fs.readFile(dataFilePath);
    const fileContent = fileData.toString();

    if (fileContent.length < 1)
      return res.status(200).json({ message: 'No orders available' });

    const orders: IOrder[] = JSON.parse(fileContent);

    // filter orders data
    const filteredOrders = orders.filter(
      order => order.customer.id === customer
    );

    res.status(200).json({ orders: filteredOrders });
  } catch (err) {
    console.error('err get orders', err);
    res.status(400).json({ message: 'Could not get orders' });
  }
};
