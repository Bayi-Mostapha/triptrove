import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Plus, SearchIcon } from 'lucide-react';
import { axiosClient } from '@/api/axios';
import { Button } from '@/components/ui/button';
import SupportProblem from '@/components/support-problem';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from 'react-toastify';

function USupport() {
    const [open, setOpen] = useState(false)
    const [actualTicket, setActualTicket] = useState(null);
    const [problems, setProblems] = useState([]);

    // **********************

    const [searchTerm, setSearchTerm] = useState('');
    const filteredReports = problems.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // **********************

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleCategoryChange = (value) => {
        setCategory(value);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    // **********************

    async function fetchData() {
        try {
            const res = await axiosClient.get('/problem/problems/user');
            setProblems(res.data)
        } catch (error) {
            console.error(error);
        }
    }
    useState(() => {
        fetchData()
    }, [])

    if (actualTicket) {
        return (
            <SupportProblem actualTicket={actualTicket} setActualTicket={setActualTicket} />
        )
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-medium">Support Tickets</h1>
            <div className="my-6 flex items-center justify-end gap-3">
                <div className='relative w-fit'>
                    <SearchIcon
                        className='absolute top-1/2 -translate-y-1/2 left-3'
                        color='gray'
                        size={16}
                    />
                    <Input
                        className='w-80 pl-9'
                        type="text"
                        placeholder="Search by title"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <Dialog onOpenChange={setOpen} open={open}>
                    <DialogTrigger
                        className='bg-primary rounded text-white py-2.5 px-3 flex items-center gap-1'
                    >
                        <Plus size={18} /> New ticket
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>New ticket</DialogTitle>
                            <DialogDescription>
                                create a new ticket, an admin will contact you soon and help you with your problem
                            </DialogDescription>
                            <Input
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="Title"
                            />
                            <Select
                                value={category}
                                onValueChange={handleCategoryChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Problem with booking">Problem with booking</SelectItem>
                                    <SelectItem value="Payment issue">Payment issue</SelectItem>
                                    <SelectItem value="Cancellation request">Cancellation request</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Description"
                            />
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                onClick={async () => {
                                    try {
                                        await axiosClient.post('/problem/create', { title, category, description })
                                        toast.success('ticket created successfully')
                                        fetchData()
                                        setCategory('')
                                        setDescription('')
                                        setTitle('')
                                        setOpen(false)
                                    } catch (error) {
                                        toast.error('someting went wrong')
                                    }
                                }}
                            >Create</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="grid gap-5">
                {filteredReports.map(report => (
                    <div key={report._id} className="px-4 py-3 bg-white shadow-sm border rounded-md">
                        <div className='flex justify-between items-center'>
                            <h2 className="text-xl font-medium">{report.title}</h2>
                            <p className={`w-fit ml-auto py-0.5 px-3 rounded-full ${report.status === 'open' ? 'text-green-900 bg-green-50' : 'text-red-900 bg-red-50'}`}>
                                {report.status}
                            </p>
                        </div>
                        <p className="text-xs text-gray-500">issued {formatDistanceToNow(report.createdAt)} ago</p>
                        <p className="mt-1 text-sm text-primary">{report.category}</p>
                        <p className='-mt-1'>Description: {report.description}</p>
                        <div className='mt-2 flex items-center justify-center'>
                            <Button
                                className='flex items-center gap-1'
                                variant='ghost'
                                onClick={() => { setActualTicket(report) }}
                            >
                                view <Eye size={11} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default USupport;