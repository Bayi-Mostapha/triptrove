import { reportColumns } from "@/components/admin/reports/columns";
import { propertyReportsColumns } from "@/components/admin/reports/propertyColumns";
import MyTable from "@/components/admin/table";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
const data2 = [
    {
        _id: "reviewReportId1",
        property: {
            _id: "propertyId2",
            title: "Cozy Cabin",
            owner: {
                fullName: "Mohammed Ali",
            }
        },
        reporter: {
            fullName: "Khalid Zado",
            email: "test@gmail.com"
        },
        reason: "Fake property",
        createdAt: "2024-05-18T00:00:00.000Z",
        updatedAt: "2024-05-18T00:00:00.000Z"
    },
]

function Reports() {
    const { id } = useParams()
    useEffect(() => {
        // if (!id) {
        //     return;
        // }
        // if (id == 'all') {
        //     axiosClient.get(`/properties/${id}`).then(response => {
        //         setReviews(response.data);
        //     });
        // } else {
        //     axiosClient.get(`/properties/${id}`).then(response => {
        //         setReviews(response.data);
        //     });
        // }
    }, [])
    return (
        <div className="mt-5">
            <h1 className="mb-5 text-2xl font-semibold">Reports</h1>
            <Tabs defaultValue="reviews" className="w-full">
                <TabsList>
                    <TabsTrigger value="reviews">Review reports</TabsTrigger>
                    <TabsTrigger value="properties">Property reports</TabsTrigger>
                </TabsList>
                <TabsContent value="reviews">
                    <h2 className="mb-4 text-lg font-medium">Review reports</h2>
                    <MyTable columns={reportColumns} data={data} />
                </TabsContent>
                <TabsContent value="properties">
                    <h2 className="mb-4 text-lg font-medium">Property reports</h2>
                    <MyTable columns={propertyReportsColumns} data={data2} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Reports;