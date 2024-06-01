import { useState, useEffect } from "react";
import Booking from "@/components/guest/bookings/booking";
import { axiosClient } from "@/api/axios";

function Bookings() {
    const [bookings, setBookings] = useState([]);

    async function getBookings() {
        const res = await axiosClient.get('/book')
        console.log(res)
        setBookings(res.data)
    }
    useEffect(() => {
        getBookings()
    }, []);

    return (
        <div>
            <h1 className="my-4 text-2xl font-medium">Your bookings</h1>
            {
                bookings.length > 0 ?
                    bookings.map((booking, index) => {
                        return (
                            <Booking key={index} booking={booking} />
                        );
                    })
                    :
                    <p className="text-center text-gray-500">You have no bookings</p>
            }
        </div>
    );
}

export default Bookings;
