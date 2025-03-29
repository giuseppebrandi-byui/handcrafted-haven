export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Handcrafted Haven";
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Handcrafted Haven aims to provide a platform for artisans and crafters to showcase and sell their unique handcrafted items.";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;
export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;
export const signInDefaultValues = {
  email: "",
  password: ""
};

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const shippingAddressDefaultValues = {
  fullName: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  country: "",
}

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
? process.env.PAYMENT_METHODS.split(', ')
:['PayPal', 'Stripe', 'CashOnDelivery'];
export const DEFAULT_PAYMENT_METHOD = 
process.env.DEFAULT_PAYMENT_METHOD || 'PayPal';