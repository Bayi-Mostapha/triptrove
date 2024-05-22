import { axiosClient } from "@/api/axios";
import StarRating from "@/components/guest/property-reservation/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { ArrowUpDown, Trash } from "lucide-react"
import { toast } from "react-toastify";

export const reportColumns = [
    {
        accessorKey: "review.author",
        header: "Review Author",
        cell: ({ row }) => {
            const author = row.original.review.author;
            return (
                <div className="flex gap-2 items-center">
                    <Avatar>
                        <AvatarImage src={author.image} />
                        <AvatarFallback>{author.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{author.fullName}</p>
                        <p className="text-xs text-gray-700">{author.email}</p>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "review",
        header: "Review",
        cell: ({ row }) => {
            const review = row.original.review;
            return <div>
                <StarRating size={10} gap={0} rating={review.stars} />
                <p className="text-xs text-gray-700">{review.content}</p>
            </div>
        },
    },
    {
        accessorKey: "review.property",
        header: "Property",
        cell: ({ row }) => {
            const property = row.original.review.property;
            return <div>
                <p className="font-medium">{property.title}</p>
                <p className="text-xs text-gray-700">By: {property.owner.fullName}</p>
            </div>
        },
    },
    {
        accessorKey: "reason",
        header: "Reason",
        cell: ({ row }) => {
            const reason = row.original.reason;
            return <p className="text-xs">{reason}</p>
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    className='p-0'
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Reported at
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = row.original.createdAt;
            return <p className="text-xs text-gray-600">{format(date, 'MMMM dd, yyyy - hh:mm a')}</p>
        },
    },
    {
        header: "Action",
        cell: ({ row }) => {
            const id = row.original._id;
            const rid = row.original.review._id;
            return <Button
                variant='ghost'
                onClick={async () => {
                    try {
                        await axiosClient.delete('/review-reports/' + id);
                        await axiosClient.delete('/reviews/' + rid);
                        toast.success('Review and report deleted successfully');
                    } catch (error) {
                        toast.error('Something went wrong');
                    }
                }}
            >
                <Trash size={16} color="red" />
            </Button>
        },
    },
]
