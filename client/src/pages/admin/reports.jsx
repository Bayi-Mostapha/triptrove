import { reportColumns } from "@/components/admin/reports/columns";
import { propertyReportsColumns } from "@/components/admin/reports/propertyColumns";
import MyTable from "@/components/admin/table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "react-toastify";
import { axiosClient } from "@/api/axios";

function Reports() {
    const [propertyReports, setPropertyReports] = useState([]);
    const [reviewReports, setReviewReports] = useState([]);
    const { id } = useParams()

    async function getPropertyReports() {
        if (!id) {
            return;
        }

        try {
            let response;
            if (id === 'all') {
                response = await axiosClient.get(`/property-reports`);
            } else {
                response = await axiosClient.get(`/property-reports/${id}`);
            }
            setPropertyReports(response.data);
        } catch (error) {
            console.error("Failed to fetch property reports:", error);
            toast.error("Failed to fetch property reports. Please try again later.");
        }
    }
    async function getReviewReports() {
        if (!id) {
            return;
        }

        try {
            let response;
            if (id === 'all') {
                response = await axiosClient.get(`/review-reports`);
            } else {
                response = await axiosClient.get(`/review-reports/${id}`);
            }
            setReviewReports(response.data);
        } catch (error) {
            console.error("Failed to fetch review reports:", error);
            toast.error("Failed to fetch review reports. Please try again later.");
        }
    }
    useEffect(() => {
        getPropertyReports()
        getReviewReports()
    }, [])
    return (
        <div className="mt-5 px-5 pt-16 pl-24 p-3 pr-5">
            
            <Tabs defaultValue="reviews" className="w-full">
                <div className="flex items-center justify-between">
                    <h1 className="mb-5 text-3xl font-semibold text-[#141414]">Reports</h1>
                    <TabsList>
                        <TabsTrigger value="reviews">Review reports</TabsTrigger>
                        <TabsTrigger value="properties">Property reports</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="reviews">
                    <h2 className="mb-4 text-lg font-medium">Review reports</h2>
                    <MyTable columns={reportColumns} data={reviewReports} />
                </TabsContent>
                <TabsContent value="properties">
                    <h2 className="mb-4 text-lg font-medium">Property reports</h2>
                    <MyTable columns={propertyReportsColumns} data={propertyReports} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Reports;