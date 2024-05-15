import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Booking from "@/components/guest/property-reservation/booking";
import { axiosClient } from "@/api/axios";
import AddressLink from "@/components/guest/property-reservation/address-link";
import PlaceGallery from "@/components/guest/property-reservation/gallery";
import MapContainer from "@/components/guest/property-reservation/map";

function Property() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    // date range 
    const disabledDates = [new Date('2024-05-15'), new Date('2024-05-20')];
    // guests input 
    const maxAdults = 12;
    const maxInfants = 5;
    const maxPets = 3;

    useEffect(() => {
        // if (!id) {
        //     return;
        // }
        // axiosClient.get(`/properties/${id}`).then(response => {
        //     setPlace(response.data);
        // });
        setPlace({
            _id: 1,
            title: 'The Best Place',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
            city: 'Agadir',
            streetAddress: 'sidi youssef',
            photos: ['/img1.webp', '/img2.webp', '/img3.webp'],
            price: 100,
        })
    }, [id]);

    if (!place) return '';

    return (
        <div>
            <Link className="w-fit block mt-5 text-primary text-sm">Back to home</Link>
            <h1 className="mt-1 text-3xl font-medium">{place.title}</h1>
            <AddressLink className='mb-5 text-sm w-fit'>{place.city}, {place.streetAddress}</AddressLink>
            <PlaceGallery place={place} />
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-medium text-xl">Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn}<br />
                    Check-out: {place.checkOut}<br />
                    Max number of guests: {place.maxGuests}

                    <h2 className="font-medium text-xl">What this place offers</h2>
                    <div>

                    </div>
                </div>
                <Booking
                    disabledDates={disabledDates}
                    maxAdults={maxAdults}
                    maxInfants={maxInfants}
                    maxPets={maxPets}
                />
            </div>
            <div>
                <h2 className="font-medium text-xl">Location</h2>
                <MapContainer location={[30.296117, -9.462425]} />
            </div>
            <div>
                <div>
                    <h2 className="font-medium text-xl">Overall rating</h2>
                    <p className="text-6xl font-semibold">4.5</p>
                    <div>

                    </div>
                    <p>Based on 184 reviews</p>
                </div>
                <div>

                </div>
            </div>

        </div>
    );
}

export default Property;