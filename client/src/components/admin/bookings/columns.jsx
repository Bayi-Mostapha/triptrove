import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Trash } from "lucide-react"
import { format } from 'date-fns';

export const bookingsColumns = [
    {
        accessorKey: "guest",
        header: "Guest",
        cell: ({ row }) => {
            const guest = row.original.guest;
            return (
                <div className="flex gap-2 items-center">
                    <Avatar>
                        <AvatarImage src={guest.image} />
                        <AvatarFallback>{guest.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{guest.fullName}</p>
                        <p className="text-xs text-gray-700">{guest.email}</p>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "property",
        header: "Property",
        cell: ({ row }) => {
            const property = row.original.property;
            return <div>
                <p className="font-medium">{property.title}</p>
                <p className="text-xs text-gray-700">By: {property.owner.fullName}</p>
            </div>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return <div className={`w-fit rounded-lg px-3 py-1 ${status == 'paid' ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className={`font-medium ${status == 'paid' ? 'text-green-700' : 'text-red-700'}`}>{status}</p>
            </div>
        },
    },
    {
        accessorKey: "fullPrice",
        header: "Ammount",
        cell: ({ row }) => {
            const price = row.original.fullPrice;
            return <p>{price} MAD</p>
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
                    Transaction date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = row.original.createdAt;
            return <p className="text-xs text-gray-600">{format(date, 'MMMM dd, yyyy - hh:mm a')}</p>
        },
    },
]
