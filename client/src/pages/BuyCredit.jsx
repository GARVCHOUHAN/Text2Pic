import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const BuyCredit = () => {

  const {user,backendurl,token,setShowLogin,loadCreditData} = useContext(AppContext)
  const navigate = useNavigate(); 

  const paymentRazorpay = async (planId) => {
    if (!user) {
        setShowLogin(true);
        return;
    }
    try {
        const response = await axios.post(`${backendurl}/api/user/pay-razor`, {
            planId: planId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.success) {
            const { order } = response.data;
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Imagify",
                description: "Purchase Credits",
                order_id: order.id,
                receipt: order.receipt,
                handler: async (paymentResponse) => {
                    try {
                        const { data } = await axios.post(
                            `${backendurl}/api/user/verify-razor`,
                            paymentResponse,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        if (data.success) {
                            loadCreditData();
                            navigate('/');
                            toast.success("Payment successful! Credits added to your account.");
                        }
                    } catch (error) {
                        toast.error("Payment failed!" + error.message);
                    }
                }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        }
    } catch (error) {
        console.error("Payment error:", error);
        toast.error("Payment failed! Please try again.");
    }
};

  return (
    <motion.div
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1 , y:0}}
      viewport={{once:true}}
    className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button> 
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div 
            key={index}
            className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
             <span className='text-3xl font-medium'>${item.price} </span> / {item.credits} credits</p>
             <button  
             onClick={() => paymentRazorpay(item.id)}
             className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'>{user ? 'Purchase':'Get Started'}</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default BuyCredit
