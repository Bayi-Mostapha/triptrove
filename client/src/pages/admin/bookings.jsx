import { bookingsColumns } from "@/components/admin/bookings/columns";
import MyTable from "@/components/admin/table";
import { useEffect } from "react";

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
        createdAt: "2024-05-19T00:00:00.000Z",
    },
]

function AdminBookings() {
    useEffect(() => {
        //     axiosClient.get(`/properties/${id}`).then(response => {
        //         setReviews(response.data);
        //     });
    }, [])
    return (
        <div className="mt-5">
            <MyTable columns={bookingsColumns} data={data} />
        </div>
    );
}

export default AdminBookings;