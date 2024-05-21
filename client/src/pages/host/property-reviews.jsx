import { axiosClient } from "@/api/axios";
import ReviewHost from "@/components/host/review-host";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PropertyReviews() {
    const dummyRatings = [
        {
            _id: 'ffff',
            stars: 4,
            content: 'nice, i guess',
            author: {
                fullName: 'Moha Moha',
                image: '/img2.webp',
            },
            created_at: '2024-06-17T14:00:00.000Z'
        },
        {
            _id: 'dddd',
            stars: 3,
            content: 'not that nice!',
            author: {
                fullName: 'hi hi',
                image: '/img3.webp',
            },
            created_at: '2024-06-15T12:00:00.000Z'
        },
    ]

    const { id } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // if (!id) {
        //     return;
        // }
        // make this async and stuff :) 
        //     axiosClient.get(`/properties/${id}`).then(response => {
        //         setReviews(response.data);
        //     });
        // }

        setReviews(dummyRatings)
    }, [id]);

    return (
        <div>
            <h1 className="text-2xl font-semibold">Property Reviews</h1>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                {
                    reviews.map(review =>
                        <ReviewHost key={review.id} review={review} />
                    )
                }
            </div>
        </div>
    );
}

export default PropertyReviews;