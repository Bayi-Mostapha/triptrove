import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Input } from "antd";
import React, { useState } from "react";
import { axiosClient } from "../api/axios"
function CheckoutForm() {
  
  // collect data from the user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [priceId, setPriceId] = useState("");
  
  const stripe = useStripe();
  const elements = useElements();

  const createSubscription = async () => {
    try {
      // create a payment method
      const cardElement = elements.getElement(CardElement);
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name,
          email,
        },
      });
  
      const response = await axiosClient.post("http://localhost:5555/payment/create-subscription", {
        paymentMethod: paymentMethod?.paymentMethod?.id,
        name,
        email,
        priceId
      });

      const confirmPayment = await stripe?.confirmCardPayment(
        response.data.clientSecret
      );
  
      if (confirmPayment?.error) {
        //here use toast 
      } else {
        //here use toast 
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="grid gap-4 m-auto w-2/4">
      <input  
        placeholder="Price Id"
        type="text"
        value={priceId}
        onChange={(e) => setPriceId(e.target.value)}
      />
      <input
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <CardElement />
      <button onClick={createSubscription} disabled={!stripe}>
        Subscribe
      </button>
    </div>
  );
}

export default CheckoutForm;