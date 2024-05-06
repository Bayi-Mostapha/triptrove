import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Input } from "antd";
import React, { useState } from "react";
import { axiosClient } from "../../api/axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      if(response.status !== 200){
        toast.success("Subscription created successfully!");
      }
      const confirmPayment = await stripe?.confirmCardPayment(
        response.data.clientSecret
      );
  
      if (confirmPayment?.error) {
        toast.error("something went wrong");
      } else {
        toast.success("Subscription created successfully!");
      }
    } catch (error) {
      toast.error("something went wrong");
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
       <ToastContainer />
      <CardElement className="border-2 border-gray-200 py-2 px-5" />
      <button onClick={createSubscription} disabled={!stripe} className="bg-black text-white py-2 px-5">
        Subscribe
      </button>
    </div>
   
  );
}

export default CheckoutForm;