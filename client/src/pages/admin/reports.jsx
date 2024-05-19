import { reportColumns } from "@/components/admin/reports/columns";
import MyTable from "@/components/admin/table";

const data = [
    {
        _id: "reviewReportId1",
        review: {
            _id: "reviewId1",
            stars: 5,
            content: "Great property!",
            author: {
                _id: "authorId1",
                fullName: "John Doe",
                image: "authorImageUrl",
                email: "johndoe@example.com"
            },
            property: {
                _id: "propertyId1",
                title: "Beautiful Beach House",
                owner: {
                    fullName: "Alice Johnson",
                }
            },
            createdAt: "2024-05-18T00:00:00.000Z",
            updatedAt: "2024-05-18T00:00:00.000Z"
        },
        reason: "Inappropriate content",
        createdAt: "2024-05-18T00:00:00.000Z",
        updatedAt: "2024-05-18T00:00:00.000Z"
    },
    {
        _id: "reviewReportId2",
        review: {
            _id: "reviewId2",
            stars: 3,
            content: "Average experience.",
            author: {
                _id: "authorId2",
                fullName: "Jane Smith",
                image: "authorImageUrl",
                email: "janesmith@example.com"
            },
            property: {
                _id: "propertyId2",
                title: "Cozy Cabin",
                owner: {
                    fullName: "Mohammed Ali",
                }
            },
            createdAt: "2024-05-17T00:00:00.000Z",
            updatedAt: "2024-05-17T00:00:00.000Z"
        },
        reason: "Spam",
        createdAt: "2024-05-17T00:00:00.000Z",
        updatedAt: "2024-05-17T00:00:00.000Z"
    }
]

function Reports() {
    return (
        <div className="mt-5">
            <MyTable columns={reportColumns} data={data} />
        </div>
    );
}

export default Reports;