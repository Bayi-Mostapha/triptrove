import { bookingsColumns } from "@/components/admin/bookings/columns";
import MyTable from "@/components/admin/table";
import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

const data = [
    {
        _id: "reviewReportId1",
        guest: {
            _id: "authorId1",
            fullName: "John Doe",
            image: "authorImageUrl",
            email: "johndoe@example.com"
        },
        property: {
            _id: "propertyId2",
            title: "Cozy Cabin",
            owner: {
                fullName: "Mohammed Ali",
            }
        },
        status: 'paid',
        fullPrice: 1000,
        checkIn: "2024-06-23T00:00:00.000Z",
        checkOut: "2024-06-29T00:00:00.000Z",
        createdAt: "2024-05-17T00:00:00.000Z",
    },
    {
        _id: "reviewReportId2",
        guest: {
            _id: "authorId2",
            fullName: "Mohamed Doe",
            image: "authorImageUrl",
            email: "mohamedali@example.com"
        },
        property: {
            _id: "propertyId2",
            title: "Cozy Cabin",
            owner: {
                fullName: "Mohammed Ali",
            }
        },
        status: 'canceled',
        fullPrice: 550,
        checkIn: "2024-05-15T00:00:00.000Z",
        checkOut: "2024-05-20T00:00:00.000Z",
        createdAt: "2024-05-19T00:00:00.000Z",
    },
]

function HostBookings() {
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState("all");

    const filteredData = bookings.filter(booking =>
        filter === "all" || booking.status === filter
    );

    function getBookings() {
        axiosClient.get(`/book/host`).then(response => {
            setBookings(response.data);
        }).catch(err => {
            toast.error('something went wrong, please refresh the page')
        });
    }
    useEffect(() => {
        // getBookings()
        setBookings(data)
    }, [])

    return (
        <div className="mt-5">
            <h1 className="text-xl font-medium">Bookings</h1>
            <DropdownMenu>
                <DropdownMenuTrigger className="ml-auto block">
                    <Button className="my-4 flex items-center gap-1" variant='outline'>
                        Filter <ChevronDown size={16} color="gray" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilter("all")}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("paid")}>Paid</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("canceled")}>Canceled</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <MyTable columns={bookingsColumns} data={filteredData} />
        </div>
    );
}

export default HostBookings;
