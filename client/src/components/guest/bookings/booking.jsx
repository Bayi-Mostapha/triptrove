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
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { axiosClient } from '@/api/axios';
import { toast } from 'react-toastify';

function Booking({ booking }) {
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [showReviewDialog, setShowReviewDialog] = useState(false);
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');

    const handleReviewSubmit = async () => {
        const review = {
            stars: rating,
            content,
            property: booking.property._id
        };
        try {
            await axiosClient.post('/reviews/' + booking.property._id, review)
            toast.success('property reviewed successfully')
        } catch (error) {
            toast.error('something went wrong')
        }
        setShowReviewDialog(false);
    };

    const cancelBooking = async () => {
        try {
            await axiosClient.put('/book/' + booking.property._id)
            toast.success('Booking successfully')
        } catch (error) {
            toast.error('something went wrong')
        }
        setShowCancelDialog(false);
    };

    const renderStars = () => {
        let starsToRender = (!rating || rating < 0) ? 0 : rating;
        starsToRender = starsToRender > 5 ? 5 : starsToRender;

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
    const checkOutDate = parseISO(booking.checkOut);
    const nightsBooked = differenceInDays(checkOutDate, checkInDate);

    return (
        <div className="mb-4 p-4 border shadow-sm rounded-lg flex justify-between items-start">
            <div className="md:flex md:gap-3 md:items-start">
                <div>
                    <img
                        src={booking.property.photos[0]}
                        alt={booking.property.title}
                        className="w-full h-64 md:h-36 object-cover rounded aspect-video"
                    />
                </div>
                <div className='-mt-1.5'>
                    <h2 className="text-xl font-medium">{booking.property.title}</h2>
                    <p className='text-sm'>
                        Check-in: {format(checkInDate, 'eeee, dd MMMM')}
                    </p>
                    <p className='text-sm'>
                        Check-out: {format(checkOutDate, 'eeee, dd MMMM')}
                    </p>
                    <p className='text-sm'>
                        Nights Booked: {nightsBooked}
                    </p>
                    <p className='text-sm'>
                        Total Price: {booking.totalPrice} MAD
                    </p>
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button className='p-0 h-fit' variant='ghost'>
                        <svg className='text-gray-600' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setShowCancelDialog(true)}>
                        Cancel Booking
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowReviewDialog(true)}>
                        Leave a review
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
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
                            <Button onClick={cancelBooking} variant='destructive'>
                                Confirm Cancel
                            </Button>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Leave a Review</DialogTitle>
                    </DialogHeader>
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
                    <Button className='block my-3 ml-auto' onClick={handleReviewSubmit}>
                        Submit Review
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Booking;