import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Booking from "@/components/guest/property-reservation/booking";
import { axiosClient } from "@/api/axios";
import AddressLink from "@/components/guest/property-reservation/address-link";
import PlaceGallery from "@/components/guest/property-reservation/gallery";
import MapContainer from "@/components/guest/property-reservation/map";

function Property() {
    const dummyPlace = {
        _id: 1,
        title: 'The Best Place',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
        city: 'Agadir',
        checkIn: '14:00',
        checkOut: '16:00',
        streetAddress: 'sidi youssef',
        photos: ['/img1.webp', '/img2.webp', '/img3.webp'],
        price: 100,
        owner: {
            image: '/img2.webp',
            fullName: 'Sara Sanchez',
            created_at: '2024-08-05'
        },
        guests: 12,
        bedrooms: 3,
        bathrooms: 2,
        beds: 5,
    }
    const dummyRatings = [
        {
            stars: 4,
            content: 'nice, i guess',
            author: {
                fullName: 'Moha Moha',
                image: '/img2.webp',
            }
        },
        {
            stars: 3,
            content: 'not that nice!',
            author: {
                fullName: 'hi hi',
                image: '/img3.webp',
            }
        }
    ]
    const dummyReservations = [
        '2024-06-13',
        '2024-06-14',
        '2024-06-15',
        '2024-06-16',
        '2024-07-09',
        '2024-06-10',
        '2024-06-11',
    ]

    const { id } = useParams();
    const [place, setPlace] = useState(null);
    // date range 
    const [disabledDates, setDisabledDates] = useState([]);
    //ratings
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    // guests input 
    const maxInfants = 5;
    const maxPets = 3;

    useEffect(() => {
        // if (!id) {
        //     return;
        // }
        // axiosClient.get(`/properties/${id}`).then(response => {
        //     setPlace(response.data);
        // });
        setPlace(dummyPlace)

        setReviews(dummyRatings)
        const starsArray = dummyRatings.map(rating => rating.stars);
        const avgRating = starsArray.reduce((acc, cur) => acc + cur, 0) / starsArray.length;
        setRating(avgRating)

        setDisabledDates(dummyReservations)
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
                    <div className="p-4 pr-0 grid grid-cols-4 border rounded">
                        <div>
                            <h4 className="text-[#808494] text-sm font-bold">Bedrooms</h4>
                            <div className="flex items-center gap-1">
                                <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="#808494" fill-rule="evenodd" clip-rule="evenodd"><path d="M2.75 6a.75.75 0 0 0-1.5 0v12a.75.75 0 0 0 1.5 0v-1.25h18.5V18a.75.75 0 0 0 1.5 0v-2.531c0-1.828 0-2.944-.323-3.868A5.75 5.75 0 0 0 18.9 8.073c-.924-.324-2.04-.323-3.868-.323h-.3c-.673 0-1.195-.001-1.64.154a2.75 2.75 0 0 0-1.687 1.688c-.155.444-.155.966-.154 1.64v4.018h-8.5zm18.5 9.25h-8.5v-3.893c0-.86.01-1.1.07-1.27a1.25 1.25 0 0 1 .767-.767c.17-.06.41-.07 1.27-.07c2.058 0 2.895.01 3.547.239a4.25 4.25 0 0 1 2.608 2.607c.212.608.236 1.38.238 3.154" /><path d="M7 7.75a3.25 3.25 0 1 0 0 6.5a3.25 3.25 0 0 0 0-6.5M5.25 11a1.75 1.75 0 1 1 3.5 0a1.75 1.75 0 0 1-3.5 0" /></g></svg>
                                <p className="text-lg font-medium">{place.bedrooms}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[#808494] text-sm font-bold">Bathrooms</h4>
                            <div className="flex items-center gap-1">
                                <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#808494" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bath"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /><line x1="10" x2="8" y1="5" y2="7" /><line x1="2" x2="22" y1="12" y2="12" /><line x1="7" x2="7" y1="19" y2="21" /><line x1="17" x2="17" y1="19" y2="21" /></svg>
                                <p className="text-lg font-medium">{place.bathrooms}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[#808494] text-sm font-bold">Beds</h4>
                            <div className="flex items-center gap-1">
                                <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#808494" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bed-double"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" /><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" /><path d="M12 4v6" /><path d="M2 18h20" /></svg>
                                <p className="text-lg font-medium">{place.beds}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[#808494] text-sm font-bold">Guests</h4>
                            <div className="flex items-center gap-1">
                                <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><g fill="none" stroke="#808494" stroke-linecap="round" stroke-width="4"><path d="M10 19s-5.143 2-6 9m34-9s5.143 2 6 9m-26-9s4.8 1.167 6 7m6-7s-4.8 1.167-6 7m-4 8s-4.2.75-6 6m14-6s4.2.75 6 6" /><circle cx="24" cy="31" r="5" stroke-linejoin="round" /><circle cx="34" cy="14" r="6" stroke-linejoin="round" /><circle cx="14" cy="14" r="6" stroke-linejoin="round" /></g></svg>
                                <p className="text-lg font-medium">{place.guests}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 mb-6">
                        <h2 className="mt-1 font-medium text-xl">Hosted By</h2>
                        <div className="flex items-center gap-2">
                            <img className="w-14 h-14 object-cover rounded-full" src={place.owner.image} alt={`${place.owner.fullName} picture`} />
                            <div>
                                <p className="font-medium">{place.owner.fullName}</p>
                                <p className="text-sm text-gray-400">Hosting since {place.owner.created_at}</p>
                            </div>
                        </div>
                    </div>
                    <div className="my-4">
                        <h2 className="font-medium text-xl">Description</h2>
                        <p className="text-sm">{place.description}</p>
                    </div>
                    <p className="flex gap-1 items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7065F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-3"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16.5 12" /></svg>
                        Check-in: <span className="font-medium">{place.checkIn}</span>
                    </p>
                    <p className="flex gap-1 items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7065F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-3"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16.5 12" /></svg>
                        Check-out: <span className="font-medium">{place.checkOut}</span>
                    </p>

                    <h2 className="mt-3 font-medium text-xl">What this place offers</h2>
                    <div>

                    </div>
                </div>
                <Booking
                    place={place}
                    disabledDates={disabledDates}
                    maxInfants={maxInfants}
                    maxPets={maxPets}
                />
            </div>
            <div>
                <h2 className="mb-2 font-medium text-xl">Location</h2>
                <MapContainer location={[30.296117, -9.462425]} />
            </div>
            <div>
                <div className="flex flex-col items-center">
                    <h2 className="font-medium text-xl">Overall rating</h2>
                    <p className="text-6xl font-semibold">{rating}</p>
                    <div>

                    </div>
                    <p className="text-sm">Based on {reviews.length} reviews</p>
                </div>
                <div>

                </div>
            </div>

        </div>
    );
}

export default Property;