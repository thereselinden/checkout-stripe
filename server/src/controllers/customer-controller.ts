import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import { IUser, IUserWithoutPass } from '../interfaces/interface';
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

    // Read current filedata
    const filedata = await fs.readFile(dataFilePath);

    // check if file contains data, update users array with that data
    if (filedata.length > 1) {
      // convert from buffer to string before parsing
      const fileContent = filedata.toString();
      users = JSON.parse(fileContent);
    }

    // check if req body email already exist in list
    if (users.some(user => user.email === email)) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // create the customer on Stripe
    let stripeCustomer: Stripe.Response<Stripe.Customer> | undefined;
    if (stripe) {
      stripeCustomer = await stripe.customers.create({
        name: `${firstname} ${lastname}`,
        email,
      });
    }

    // TODO kolla att stripe reg gick bra
    console.log('stripecustomer', stripeCustomer);
    if (!stripeCustomer?.id)
      return res
        .status(400)
        .json({ message: 'Could not create customer on stripe' });

    // update newUser obj with id after stripe customer created
    newUser = { ...newUser, id: stripeCustomer?.id };

    // add newUser obj to users array
    users.push(newUser);

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
  console.log('login', req.body);
  try {
    const { email, password } = req.body;
    const dataFilePath = `${rootPath}/data/users.json`;
    const fileData = await fs.readFile(dataFilePath);
    const fileContent = fileData.toString();

    const users = JSON.parse(fileContent);

    // see if email is an registered user
    let registeredUser: IUser = users.find(
      (user: IUser) => user.email === email
    );

    const isPasswordCorrect = await bcrypt.compare(
      password,
      registeredUser.password
    );

    if (!registeredUser || !isPasswordCorrect)
      return res.status(404).json({ message: 'Wrong credentials' });

    const user: IUserWithoutPass = {
      id: registeredUser.id,
      firstname: registeredUser.firstname,
      lastname: registeredUser.lastname,
      email: registeredUser.email,
    };

    req.session = user;
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Could not login' });
  }
};

export const logout = async (req: Request, res: Response) => {
  if (!req.session?.id) {
    return res.status(400).json({ message: 'Already logged out' });
  }
  req.session = null;
  res.status(200).json(null);
};

export const authorize = async (req: Request, res: Response) => {
  try {
    if (!req.session?.id) {
      return res.status(401).json({ message: 'User is not logged in' });
    }

    res.status(200).json(req.session);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
