import { axiosClient } from "@/api/axios";
import { Button } from "@/components/ui/button";
import { CheckIcon, HandCoinsIcon, Home, Wallet } from "lucide-react";
import { FaCreditCard } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import HostBookings from "./bookings";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";


function HostDashboard() {
    const [amount, setAmount] = useState(0);
    const [properties, setProperties] = useState(0);
    const [bookings, setBookings] = useState(0);
    const [revenue, setRevenue] = useState(0);

    async function getStats() {
        try {
            const res = await axiosClient.get('/host-stats')
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    useState(() => {
        getStats()
    }, [])

    const handleChange = (e) => {
        setAmount(e.target.value)
    }

    const handleCheckout = async () => {
        try {
            const hasAccountResponse = await axiosClient.get('/wallet/has-account');
            const hasAccount = hasAccountResponse.data;

            if (hasAccount) {
                await axiosClient.post('/wallet/checkout', { amount });
            } else {
                await axiosClient.post('/wallet/create-link');
                await axiosClient.post('/wallet/checkout', { amount });
            }

            console.log('Checkout process completed successfully');
        } catch (error) {
            console.error('Error during the wallet process:', error);
        }
    };

    return (
        <div>
            <div className="mt-6 grid grid-cols-[3fr_1fr] gap-5">
                <div className="border px-5 pt-4 pb-5 rounded-md">
                    <h2 className="mb-4 text-xl font-medium">Stats</h2>
                    <div className="flex gap-4">
                        <div className="flex-1 p-3 rounded-lg bg-yellow-50 text-yellow-500">
                            <HandCoinsIcon
                                size={26}
                            />
                            <p className="mt-3 text-xl font-semibold text-gray-800">{revenue} MAD</p>
                            <p className="text-sm text-gray-600 font-medium">Total revenue</p>
                        </div>
                        <div className="flex-1 p-3 rounded-lg bg-green-50 text-green-500">
                            <Home
                                size={25}
                            />
                            <p className="mt-3 text-xl font-semibold text-gray-800">{properties}</p>
                            <p className="text-sm text-gray-600 font-medium">Total properties</p>
                        </div>
                        <div className="flex-1 p-3 rounded-lg bg-pink-50 text-pink-500">
                            <TiDocumentText
                                size={26}
                            />
                            <p className="mt-3 text-xl font-semibold text-gray-800">{bookings}</p>
                            <p className="text-sm text-gray-600 font-medium">Total Bookings</p>
                        </div>
                    </div>
                </div>
                <div className="border px-5 pt-4 pb-5 rounded-md flex flex-col items-center">
                    <Wallet size={80} className="stroke-primary" />
                    <p className="text-xs text-primary">Wallet ballence</p>
                    <p className="mt-2 font-semibold text-xl text-gray-900">1000 MAD</p>
                    <Dialog>
                        <DialogTrigger>
                            <Button variant='outline' className='text-primary flex items-center gap-2 font-semibold'>
                                Checkout <FaCreditCard />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Enter the Amount You Would Like to Checkout</DialogTitle>
                                <DialogDescription className='mb-4'>
                                    If you don't have a connected Stripe account, you will be prompted to connect one, and the money will then be sent to you.
                                    <Input className='my-4' type='number' onChange={handleChange} value={amount} />
                                </DialogDescription>
                                <DialogFooter>
                                    <Button
                                        onClick={handleCheckout}
                                        className='flex items-center gap-1 font-semibold'
                                    >
                                        Submit <CheckIcon size={18} />
                                    </Button>
                                </DialogFooter>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <HostBookings />
        </div>
    );
}

export default HostDashboard;