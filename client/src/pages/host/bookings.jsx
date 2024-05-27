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
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { axiosClient } from "@/api/axios";

function HostBookings({ limit }) {
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState("all");

    const filteredData = bookings.filter(booking =>
        filter === "all" || booking.status === filter
    );

    const displayedData = limit ? filteredData.slice(0, 3) : filteredData;

    function getBookings() {
        axiosClient.get(`/book/host`).then(response => {
            setBookings(response.data);
        }).catch(err => {
            toast.error('something went wrong, please refresh the page');
        });
    }

    useEffect(() => {
        getBookings();
    }, []);

    return (
        <div className="mt-5">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-medium">Bookings</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger className="ml-auto block">
                        <Button className="my-4 flex items-center gap-1" variant="outline">
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
            </div>
            <MyTable columns={bookingsColumns} data={displayedData} />
        </div>
    );
}

export default HostBookings;