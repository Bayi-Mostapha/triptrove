import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Input } from "antd";
import React, { useState, useContext, useEffect } from "react";
import { axiosClient } from "../../api/axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/AuthWrapper';
import { CircleCheck  } from 'lucide-react';


function CheckoutForm() {
  const userContext = useContext(authContext);
  const navigate = useNavigate()
  // collect data from the user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [priceId, setPriceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState(0);
  const [plans, setPlans] = useState([])
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
        name: userContext.user.firstName + " " + userContext.user.lastName ,
        email: userContext.user.email,
        priceId,
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
          navigate("/explore");
      }
    } catch (error) {
      setLoading(false)
      toast.error("something went wrong");
    }
  };
  const createFreeSubscription = async () => {
    try {
        navigate("/explore");
    } catch (error) { 
      toast.error("something went wrong");
    }
  };

  const getPlans = async () => {
    try {
      const response = await axiosClient.post("http://localhost:5555/payment/get-plans");
      setPlans(response.data.subscriptionPlans)
    } catch (error) {
      setLoading(false)
      toast.error("something went wrong while getting plans");
    }
  };
  useEffect(()=>{
    getPlans();
  },[]);
  const handleSubscriptionChange = (event) => {
    setPriceId(event.target.value);
    if (event.target.id === "premium" || event.target.id === "business") {
      setIsPaid(true);
      if(event.target.id === "premium"){
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
    <div className='basis-1/2 w-3/4 lg:h-screen justify-end hidden lg:flex lg:pr-16 '>
         <div className='relative h-full'>
           <img src="/assets/image1.jpg" alt="" className='h-full rounded-xl '/>
           <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center w-full text-white">
              <h3 className='text-4xl  font-semibold px-12'>Welcome to Hostify</h3>
              <p className='text-sm font-medium '>Take your next travel to onather level</p>
           </div>
         </div>
      </div>
    <div className="grid gap-4 m-auto lg:basis-1/2 md:w-2/3 w-full ">
    <h3 className="text-3xl font-semibold text-center ">Choose a Plan</h3>
      <div>
          <label className="mb-3 flex  ps-4 border border-[#7065f0] rounded flex-col py-2">
          <div className="flex items-center">
              <input id="free" checked={!isPaid} type="radio" value="null" onChange={handleSubscriptionChange} name="subscription" className="accent-primary" />
              <label htmlFor="free" className="w-full py-4 ms-2 text-xl font-medium text-gray-900 dark:text-gray-300">free  0dh /month</label> 
          </div>
          <div className="flex flex-col ml-1">
                  <div className="flex items-center gap-2">
                    <CircleCheck  size={15} color="green"/>
                    <p>up to 5 properties</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleCheck  size={15} color="green"/>
                    <p>10%  fees on transactions</p>
                  </div>
                 
                </div>
          </label>
          {
            plans.length !== 0 && 
            <>
            <label className="mb-3 flex  ps-4 border border-[#7065f0] rounded flex-col py-2" >
               <div className="flex items-center">
                <input id={plans[0].title} type="radio" value={plans[0].priceId} onChange={handleSubscriptionChange} name="subscription" className="accent-primary" />
                <label htmlFor={plans[0].title} className="w-full py-4 ms-2 text-xl font-medium text-gray-900 dark:text-gray-300">{plans[0].title}  {plans[0].price}dh /month</label> 
               </div>
                <div className="flex flex-col ml-1">
                  <div className="flex items-center gap-1">
                    <CircleCheck  size={15} color="green"/>
                    <p>up to 15 properties</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <CircleCheck  size={15} color="green"/>
                    <p>10%  fees on transactions</p>
                  </div>
                </div>
          </label>
          <label className="mb-3 flex  ps-4 border border-[#7065f0] rounded flex-col py-2" >
          <div className="flex items-center">
            <input id={plans[1].title} type="radio" value={plans[1].priceId} onChange={handleSubscriptionChange} name="subscription" className="accent-primary" />
            <label htmlFor={plans[1].title} className="w-full py-4 ms-2 text-xl font-medium text-gray-900 dark:text-gray-300">{plans[1].title}  {plans[1].price}dh /month</label> 
         </div>
         
            <div className="flex flex-col ml-1">
                  <div className="flex items-center gap-1">
                    <CircleCheck  size={15} color="green"/>
                    <p>unlimited properties</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <CircleCheck  size={15} color="green"/>
                    <p>0%  fees on transactions</p>
                  </div>
                </div>
          </label></>
          }
         
      </div>
      
       <ToastContainer />
       {
        isPaid && 
        <>
          <CardElement className="border-2 border-gray-200 py-5 px-5" />
          <button onClick={createSubscription} disabled={!stripe} className="bg-black text-white text-lg py-3 px-5">
            Pay {price}$
            { loading
                    && 
                    <div className="inline-block h-5 w-5 ml-3 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"></div>
                  }
          </button>
        </>
       }
       {
        !isPaid && 
          <button onClick={createFreeSubscription}  className="bg-black text-white font-medium text-xl py-2 px-5">
          submit 
          { loading
                  && 
                  <div className="inline-block h-5 w-5 ml-3 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"></div>
                }
         </button>
       }
    </div>
      </div></div>
   
   
  );
}

export default CheckoutForm;