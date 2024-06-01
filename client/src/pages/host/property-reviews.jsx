import { axiosClient } from "@/api/axios";
import ReviewHost from "@/components/host/review-host";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PropertyReviews() {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getReviews() {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/reviews/${id}`);
            setReviews(response.data);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!id) {
            return;
        }
        getReviews();
    }, [id]);

    return (
        <div>
            <h1 className="text-2xl font-semibold mt-8">Property Reviews</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                    {reviews.map(review => (
                        <ReviewHost key={review.id} review={review} />
                    ))}
                    
                </div>
            )}
            <div className="w-full">
            {
                        reviews.length === 0 && 
                        <div className="flex items-center justify-center w-full min-h-80 ">
                        <div className='flex items-end justify-center'>
                             <p className='text-3xl ml-3 font-medium '>no reviews yet</p>
                        </div>
                    </div>
                    }
            </div>
        </div>
    );
}

export default PropertyReviews;