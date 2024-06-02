import { axiosClient } from '@/api/axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CheckCircle } from 'lucide-react';

function BookingSuccess() {
    const navigate = useNavigate()
    const location = useLocation();
    const [paymentSaved, setPaymentSaved] = useState(false);
    const searchParams = new URLSearchParams(location.search);
    const pid = searchParams.get('pid');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const totalPrice = searchParams.get('totalPrice');

    useEffect(() => {
        async function savePayment() {
            try {
                await axiosClient.post('/book/' + pid, {
                    checkIn, checkOut, totalPrice
                });
                setPaymentSaved(true);
                toast.success('Payment saved!');
                navigate('/bookings')
            } catch (error) {
                console.error(error);
                toast.error('Something went wrong! Please refresh the page');
            }
        }
        savePayment();
    }, [pid, checkIn, checkOut, totalPrice]);

    return (
        <div className='flex flex-col items-center justify-center w-full h-96'>
            {paymentSaved ? (
                <>
                    <CheckCircle className='w-16 h-16 text-green-600' />
                    <h1 className='text-xl font-semibold text-green-600'>
                        Payment Saved
                    </h1>
                    <p className='mt-1 text-gray-600'>
                        Your payment has been successfully saved.
                    </p>
                </>
            ) : (
                <h1 className='text-lg font-medium'>
                    Please hold while we save the payment
                </h1>
            )}
        </div>
    );
}

export default BookingSuccess;
