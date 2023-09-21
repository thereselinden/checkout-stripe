// stripe message
export const STRIPE_CONNECT_ERROR = "Could not connect to stripe";
export const STRIPE_SESSION_ERROR = "Could not create checkout session";
export const STRIPE_LINEITEMS_ERROR = "Could not get line items";
export const STRIPE_PRICE_OBJECT_ERROR = "Price information not available for";

// create customer message
export const CUSTOMER_DUPLICATE_VALUES = "Email already registered";
export const CUSTOMER_STRIPE_ERROR = "Could not create customer on stripe";
export const CUSTOMER_CREATED = "User created";
export const CUSTOMER_ERROR = "Could not create user";

// login customer message
export const CUSTOMER_LOGIN_CREDENTIALS_ERROR = "Wrong credentials";
export const CUSTOMER_LOGIN_ERROR = "Could not login";

// logut customer message
export const CUSTOMER_LOGUT_ERROR = "Already logged out";

// authorize customer message
export const CUSTOMER_AUTH_ERROR = "User is not logged in";

// order message
export const ORDER_SESSIONID_ERROR = "No sessionId provided";
export const ORDER_VERIFY_ERROR = "Could not verify order";
export const ORDER_NOTHING_TO_DISPLAY = "No orders available";
export const ORDER_ERROR = "Could not get orders";
