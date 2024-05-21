import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns";
import StarRating from "../guest/property-reservation/star-rating";
import { axiosClient } from "@/api/axios";
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
import { Button } from "../ui/button";
import { useState } from "react";


function ReviewHost({ review }) {
    const [reason, setReason] = useState('');
    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    function handleClick(id) {
        // axiosClient.post('/review-reports/' + id, {
        //     reason
        // })
    }
    return (
        <div className="p-3 border rounded-lg">
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={review.author.image} />
                        <AvatarFallback className='uppercase'>{review.author.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium capitalize">{review.author.fullName}</p>
                        <p className="text-xs text-gray-600">{formatDistanceToNow(review.created_at)} ago</p>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Review Report</DialogTitle>
                            <DialogDescription>
                                Reporting this review will trigger an investigation by our support team. Once reported, this action cannot be undone. The review may be deleted or retained based on the investigation results.
                            </DialogDescription>
                        </DialogHeader>

                        <textarea
                            name="reason"
                            id="reason"
                            value={reason}
                            onChange={handleReasonChange}
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter the reason for reporting"
                        ></textarea>

                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Close
                                </Button>
                            </DialogClose>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                                onClick={() => handleClick(review._id)}
                            >
                                Report
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
            <StarRating size={13} rating={review.stars} gap={0} />
            <p>{review.content}</p>
        </div>
    );
}

export default ReviewHost;