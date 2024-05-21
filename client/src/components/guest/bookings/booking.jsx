import { useState } from 'react';
import fullStar from '/public/assets/full_star.svg';
import halfStar from '/public/assets/half_star.svg';
import emptyStar from '/public/assets/empty_star.svg';
import { differenceInDays, parseISO, isAfter, format } from 'date-fns';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';


function Booking({ booking }) {
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');

    const handleReviewSubmit = () => {
        const review = {
            stars: rating,
            content,
            property: booking.property._id
        };
        console.log(review);
    };

    const cancelBooking = () => {

    }

    const renderStars = () => {
        let starsToRender = (!rating || rating < 0) ? 0 : rating;
        starsToRender = starsToRender > 5 ? 5 : starsToRender;
        console.log(starsToRender)

        const fullStars = Math.floor(starsToRender);
        const halfStarFlag = starsToRender % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStarFlag ? 1 : 0);

        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, index) => (
                    <img key={index} src={fullStar} alt="full star" className="w-5 h-5" />
                ))}
                {halfStarFlag && <img src={halfStar} alt="half star" className="w-5 h-5" />}
                {[...Array(emptyStars)].map((_, index) => (
                    <img key={index} src={emptyStar} alt="empty star" className="w-5 h-5" />
                ))}
            </div>
        );
    };

    const checkInDate = parseISO(booking.checkIn);
    const canReview = isAfter(new Date(), checkInDate);
    const nightsBooked = differenceInDays(parseISO(booking.checkOut), checkInDate);

    return (
        <div className="mb-4 p-4 border shadow-sm rounded-lg">
            <div className="md:flex md:gap-6">
                <div className="mb-2">
                    <img
                        src={booking.property.photos[0]}
                        alt={booking.property.title}
                        className="w-full h-64 md:h-36 object-cover rounded"
                    />
                </div>
                <div>
                    <h2 className="text-lg font-medium">{booking.property.title}</h2>
                    <p><span className="text-gray-700">Check-in:</span> {format(booking.checkIn, 'eeee, dd MMMM')}</p>
                    <p><span className="text-gray-700">Check-out:</span> {format(booking.checkOut, 'eeee, dd MMMM')}</p>
                    <p><span className="text-gray-700">Nights Booked:</span> {nightsBooked}</p>
                    <p><span className="text-gray-700">Total Price:</span> {booking.totalPrice} MAD</p>
                </div>
            </div>
            <div className='flex gap-4 items-center justify-end'>
                <Dialog>
                    <DialogTrigger className='px-4 py-2 bg-red-500 rounded text-white font-medium'>
                        Cancel Booking
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to cancel this booking?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. You will receive a refund within 15 days.
                            </DialogDescription>
                            <DialogFooter>
                                <DialogClose>
                                    <Button variant='outline'>
                                        Close
                                    </Button>
                                </DialogClose>
                                <Button
                                    onclick={cancelBooking} variant='destructive'>
                                    Confirm Cancel
                                </Button>
                            </DialogFooter>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {canReview && (
                    <Dialog>
                        <DialogTrigger className='px-4 py-2 bg-primary rounded text-white font-medium'>
                            Leave a review
                        </DialogTrigger>
                        <DialogContent>
                            <h3 className="text-lg font-medium">Leave a Review</h3>
                            <div className="flex justify-between items-center gap-4">
                                <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    className="w-28 p-2 border rounded"
                                    placeholder="Rating (0-5)"
                                    value={rating}
                                    onChange={(e) => setRating(parseFloat(e.target.value))}
                                />
                                {renderStars()}
                            </div>
                            <textarea
                                className="w-full p-2 border rounded"
                                placeholder="Write your review here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <Button
                                className='block my-3 ml-auto'
                                onClick={handleReviewSubmit}
                            >
                                Submit Review
                            </Button>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    );
}

export default Booking;
