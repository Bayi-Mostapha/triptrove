import { useState, useEffect } from "react";
import Booking from "@/components/guest/bookings/booking";

const dummybookings = [
    {
        totalPrice: 100,
        checkIn: '2024-05-18T00:00:00.000Z',
        checkOut: '2024-05-20T00:00:00.000Z',
        property: {
            title: 'Beautiful Beach House',
            photos: ['/img1.webp', '/img2.webp']
        }
    },
    {
        totalPrice: 200,
        checkIn: '2024-06-01T00:00:00.000Z',
        checkOut: '2024-06-05T00:00:00.000Z',
        property: {
            title: 'Mountain Cabin Retreat',
            photos: ['/img2.webp', '/img3.webp']
        }
    }
];

function Bookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        setBookings(dummybookings);
    }, []);

    return (
        <div>
            <h1 className="mb-4 text-2xl font-semibold">Your bookings</h1>
            {
                bookings.length > 0 ?
                    bookings.map((booking, index) => {
                        return (
                            <Booking key={index} booking={booking} />
                        );
                    })
                    :
                    <p className="text-center text-gray-500">No bookings</p>
            }
        </div>
    );
}

export default Bookings;
