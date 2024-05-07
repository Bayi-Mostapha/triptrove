import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Input } from "antd";
import React, { useState, useContext, useEffect } from "react";
import { axiosClient } from "../../api/axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/AuthWrapper';

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
         navigate("/home");
      }
    } catch (error) {
      setLoading(false)
      toast.error("something went wrong");
    }
  };
  const createFreeSubscription = async () => {
    try {
        navigate("/home");
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
    <div className='basis-1/2 w-3/4 lg:h-screen justify-end hidden lg:flex'>
         <div className='relative h-full'>
           <img src="/assets/image1.jpg" alt="" className='h-full rounded-xl '/>
           <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center w-full text-white">
              <h3 className='text-4xl  font-semibold px-12'>Welcome to Hostify</h3>
              <p className='text-sm font-medium '>Take your next travel to onather level</p>
           </div>
         </div>
      </div>
    <div className="grid gap-4 m-auto lg:pl-16 lg:basis-1/2 md:w-2/3 w-full ">
    <h3 className="text-3xl font-semibold text-center ">Choose a Plan</h3>
      <div>
          <label className="mb-3 flex items-center ps-4 border-2 border-green-600 rounded ">
              <input id="free" checked={!isPaid} type="radio" value="null" onChange={handleSubscriptionChange} name="subscription" className="w-4 h-4 text-green-800  bg-gray-100 border-gray-300 " />
              <label htmlFor="free" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">free  0/mo</label> 
          </label>
        {
          plans.map((plan, index)=>(
            <label className="mb-3 flex items-center ps-4 border-2 border-green-600 rounded " key={index}>
                <input id={plan.title} type="radio" value={plan.priceId} onChange={handleSubscriptionChange} name="subscription" className="w-4 h-4 text-green-800  bg-gray-100 border-gray-300 " />
                <label htmlFor={plan.title} className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{plan.title}  {plan.price}/mo</label> 
            </label>
          ))
        }
      </div>
      
       <ToastContainer />
       {
        isPaid && 
        <>
          <CardElement className="border-2 border-gray-200 py-5 px-5" />
          <button onClick={createSubscription} disabled={!stripe} className="bg-black text-white text-lg py-3 px-5">
            checkout {price}$
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