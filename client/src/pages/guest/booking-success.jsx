import { axiosClient } from '@/api/axios';
import { BOOKINGS } from '@/router';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function BookingSucces() {
    const location = useLocation();
    const navigate = useNavigate()
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
                })
                toast.success('Payment saved!')
                navigate(BOOKINGS)
            } catch (error) {
                console.error(error)
                toast.error('Something went wrong! please refresh the page')
            }
        }
        savePayment()
    }, [])

    return (
        <div>
            Please hold while we save the payment
        </div>
    );
}

export default BookingSucces;