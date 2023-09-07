import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import { IUser } from '../interfaces/interface';
import { initStripe } from '../stripe/stripe';
import Stripe from 'stripe';
import { rootPath } from '../server';
const stripe = initStripe();

export const register = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    let newUser: IUser = {
      firstname,
      lastname,
      email,
      password,
    };
    // hash incoming password
    const hashedPassword = await bcrypt.hash(password, 10);
    // update with hashed password
    newUser.password = hashedPassword;

    let users: IUser[] = [];

    const dataFilePath = `${rootPath}/data/users.json`;
    console.log('dataFilePath', dataFilePath);

    // Read current filedata
    const filedata = await fs.readFile(dataFilePath);

    // check if file contains data, update users array with that data
    if (filedata.length > 1) {
      // convert to string before parsing
      const fileContent = filedata.toString();
      users = JSON.parse(fileContent);
    }

    console.log('users', users);

    // check if req body email already exist in list
    if (users.some(user => user.email === email))
      throw new Error('User already exist');

    // create the customer at Stripe
    let stripeCustomer: Stripe.Response<Stripe.Customer> | undefined;
    if (stripe) {
      stripeCustomer = await stripe?.customers.create({
        name: `${firstname} ${lastname}`,
        email,
      });
    }
    // const stripeCustomer = await stripe?.customers.create({
    //   name: `${firstname} ${lastname}`,
    //   email,
    // });

    // update newUser obj with id after stripe customer created
    newUser = { ...newUser, id: stripeCustomer?.id };

    // add newUser obj to users array
    users.push(newUser);

    console.log('users after push', users);

    // add users array to json file
    await fs.writeFile(dataFilePath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Could not create user', err });
  }
  // res.status(201).json({ message: 'Customer register' });
};

export const login = async (req: Request, res: Response) => {
  console.log('login body', req.body);
  try {
    const { email, password } = req.body;

    const user = {
      email,
    };

    req.session = user;
    console.log('req.session', req.session);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};
