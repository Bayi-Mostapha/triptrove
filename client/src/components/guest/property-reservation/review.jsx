import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns";
import StarRating from "./star-rating";

function Review({ review }) {
    return (
        <div>
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src={review.author.image} />
                    <AvatarFallback className='uppercase'>{review.author.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium capitalize">{review.author.fullName}</p>
                    <p className="text-xs text-gray-600">{formatDistanceToNow(review.createdAt)} ago</p>
                </div>
            </div>
            <StarRating size={13} rating={review.stars} gap={0} />
            <p>{review.content}</p>
        </div>
    );
}

export default Review;