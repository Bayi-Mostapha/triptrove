import { axiosClient } from "@/api/axios";
import ReviewHost from "@/components/host/review-host";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PropertyReviews() {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);

    async function getReviews() {
        axiosClient.get(`/reviews/${id}`).then(response => {
            setReviews(response.data);
        });
    }
    useEffect(() => {
        if (!id) {
            return;
        }
        getReviews()
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