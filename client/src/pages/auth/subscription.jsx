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
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  const createSubscription = async () => {
    try {
      // create a payment method
      setLoading(true);
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
      setLoading(false)
      if(response.status !== 200){
        toast.error("something went wrong");
        return ;
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
      setLoading(false)
      toast.error("something went wrong");
    }
  };
  const handleSubscriptionChange = (event) => {
    if (event.target.value === "premium" || event.target.value === "business") {
      setIsPaid(true);
      if(event.target.value === "premium"){
        setPrice(20)
      }else{
        setPrice(50)
      }
    } else {
      setIsPaid(false);
    }
  };
  return (
    <div className="max-w-6xl  mx-auto">
    <div className='flex items-center justify-center  p-4'>
    <div className='basis-1/2 w-3/4 lg:h-screen justify-end hidden lg:flex'>
         <div className='relative h-full'>
           <img src="/assets/image1.jpg" alt="" className='h-full rounded-xl '/>
           <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center w-full text-white">
              <h3 className='text-4xl  font-semibold px-12'>Welcome to Hostify</h3>
              <p className='text-sm font-medium '>Take your next travel to onather level</p>
           </div>
         </div>
      </div>
    <div className="grid gap-4 m-auto pl-16 basis-1/2 ">
      <div>
        <label htmlFor="free" className="py-5 pl-10 flex items-center justify-start border-2 border-green-800 rounded-xl mb-3">
          <input type="radio" id="free" name="subscription" value="free" onChange={handleSubscriptionChange} className="mr-8" />
          <span>Free</span>
        </label>
        <label htmlFor="premium" className="py-5 pl-10 flex items-center justify-start border-2 border-green-800 rounded-xl mb-3">
          <input type="radio" id="premium" name="subscription" value="premium" onChange={handleSubscriptionChange} className="mr-8" />
          <span>Premium</span>
        </label>
        <label htmlFor="business" className="py-5 pl-10 flex items-center justify-start border-2 border-green-800 rounded-xl mb-3">
          <input type="radio" id="business" name="subscription" value="business" onChange={handleSubscriptionChange} className="mr-8" />
          <span>Business</span>
        </label>
      </div>
      
       <ToastContainer />
       {
        isPaid && 
        <>
          <CardElement className="border-2 border-gray-200 py-2 px-5" />
          <button onClick={createSubscription} disabled={!stripe} className="bg-black text-white font-medium text-lg py-2 px-5">
            Pay {price}$
            { loading
                    && 
                    <div className="inline-block h-5 w-5 ml-3 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"></div>
                  }
          </button>
        </>
       }
     
    </div>
      </div></div>
   
   
  );
}

export default CheckoutForm;