import { axiosClient } from "@/api/axios";
import { Button } from "@/components/ui/button";
import { CheckIcon, HandCoinsIcon, Home, Wallet } from "lucide-react";
import { FaChartArea, FaCreditCard } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import HostBookings from "./bookings";
import { useContext, useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ExchangeRateContext } from "@/contexts/exchangeRatesWrapper";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


function HostDashboard() {
    const { selectedCurrency, convert } = useContext(ExchangeRateContext);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(0);
    const [properties, setProperties] = useState(0);
    const [bookings, setBookings] = useState({});
    const [revenue, setRevenue] = useState({});
    const [balance, setBalance] = useState(0);
    const [selectedPeriod, setSelectedPeriod] = useState('lastDay');

    async function getStats() {
        try {
            setLoading(true);
            const res = await axiosClient.get('/host-stats');
            setProperties(res.data.properties);
            setBookings(res.data.bookings);
            setRevenue(res.data.revenue);
            setBalance(res.data.balance);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getStats();
    }, []);

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

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

    const handlePeriodChange = (val) => {
        setSelectedPeriod(val);
    };

    return (
        <div className="p-4">
            {loading ? (
                <div className="h-40 flex justify-center items-center gap-1 text-primary text-xl">Loading data <FaChartArea /> ...</div>
            ) : (
                <>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-5">
                        <div className="border px-5 py-4 rounded-md">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-medium">Stats</h2>
                                <Select onValueChange={handlePeriodChange} defaultValue={selectedPeriod}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="lastDay">Today</SelectItem>
                                        <SelectItem value="lastWeek">Last week</SelectItem>
                                        <SelectItem value="lastMonth">Last month</SelectItem>
                                        <SelectItem value="lastYear">Last year</SelectItem>
                                        <SelectItem value="allTime">All time</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-3 rounded-lg bg-yellow-50 text-yellow-500">
                                    <HandCoinsIcon size={26} />
                                    <p className="mt-3 text-xl font-semibold text-gray-800">
                                        {convert(revenue[selectedPeriod])} {selectedCurrency}
                                    </p>
                                    <p className="text-sm text-gray-600 font-medium">Total revenue</p>
                                </div>
                                <div className="p-3 rounded-lg bg-green-50 text-green-500">
                                    <Home size={25} />
                                    <p className="mt-3 text-xl font-semibold text-gray-800">{properties}</p>
                                    <p className="text-sm text-gray-600 font-medium">Total properties</p>
                                </div>
                                <div className="p-3 rounded-lg bg-pink-50 text-pink-500">
                                    <TiDocumentText size={26} />
                                    <p className="mt-3 text-xl font-semibold text-gray-800">
                                        {bookings[selectedPeriod]}
                                    </p>
                                    <p className="text-sm text-gray-600 font-medium">Total Bookings</p>
                                </div>
                            </div>
                        </div>
                        <div className="border px-5 pt-4 pb-5 rounded-md flex flex-col items-center">
                            <Wallet size={80} className="stroke-primary" />
                            <p className="text-xs text-primary">Wallet balance</p>
                            <p className="mt-2 font-semibold text-xl text-gray-900">{convert(balance)} {selectedCurrency}</p>
                            <Dialog>
                                <DialogTrigger>
                                    <Button variant="outline" className="text-primary flex items-center gap-2 font-semibold">
                                        Checkout <FaCreditCard />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Enter the Amount You Would Like to Checkout</DialogTitle>
                                        <DialogDescription className="mb-4">
                                            If you don't have a connected Stripe account, you will be prompted to connect one, and the money will then be sent to you.
                                            <Input className="my-4" type="number" onChange={handleChange} value={amount} />
                                        </DialogDescription>
                                        <DialogFooter>
                                            <Button onClick={handleCheckout} className="flex items-center gap-1 font-semibold">
                                                Submit <CheckIcon size={18} />
                                            </Button>
                                        </DialogFooter>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <HostBookings limit={true} />
                </>
            )}
        </div>
    );
}

export default HostDashboard;