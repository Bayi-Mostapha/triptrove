import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/property-dialog";
import Review from "@/components/guest/property-reservation/review";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";

function Reviews({ reviews }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("mostRecent");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    const filterAndSortReviews = (reviews) => {
        let filteredReviews = reviews.filter(review =>
            review.content.toLowerCase().includes(searchTerm.toLowerCase())
        );

        switch (sortOption) {
            case "highestRating":
                filteredReviews.sort((a, b) => b.stars - a.stars);
                break;
            case "lowestRating":
                filteredReviews.sort((a, b) => a.stars - b.stars);
                break;
            case "mostRecent":
            default:
                filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
        }

        return filteredReviews;
    };

    return (
        <>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                    reviews.slice(0, 6).map(review =>
                        <Review key={review.id} review={review} />
                    )
                }
            </div>
            <Dialog>
                <DialogTrigger className="my-6 px-3 py-1 border border-black rounded-md shadow-sm">Show All</DialogTrigger>
                <DialogContent className='p-10 z-[99999]'>
                    <h3 className='text-xl font-semibold'>All reviews</h3>
                    <div className="flex justify-between items-center mb-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search reviews"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="border border-gray-300 rounded-md pl-10 pr-3 py-2"
                            />
                            <svg className="absolute top-1/2 left-3 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 border border-gray-300 rounded-md px-4 py-2">
                                Sort By <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-up-down"><path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5 5" /></svg>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='z-[9999999]'>
                                <DropdownMenuLabel>Sort Reviews</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleSortChange("mostRecent")}>Most Recent</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSortChange("highestRating")}>Highest Rating</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSortChange("lowestRating")}>Lowest Rating</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="max-h-96 overflow-auto grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-2">
                        {
                            filterAndSortReviews(reviews).length > 0 ?
                                filterAndSortReviews(reviews).map(review =>
                                    <Review key={review.id} review={review} />
                                )
                                :
                                <div className='text-center'>No reviews found</div>
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Reviews;
