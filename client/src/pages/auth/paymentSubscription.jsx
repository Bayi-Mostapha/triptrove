import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./subscription";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY); 

function Test() {

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Test;