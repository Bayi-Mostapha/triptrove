import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Plus, SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { axiosClient } from '@/api/axios';

const dummyProblemReports = [
    {
        _id: '1',
        user: 'User1',
        title: 'Problem with Booking',
        category: 'Booking',
        description: 'I am unable to book a property.',
        status: 'open',
        createdAt: '2024-05-27T08:00:00.000Z',
    },
    {
        _id: '2',
        user: 'User2',
        title: 'Payment Issue',
        category: 'Payment',
        description: 'My payment did not go through.',
        status: 'open',
        createdAt: '2024-05-23T08:30:00.000Z',
    },
    {
        _id: '3',
        user: 'User3',
        title: 'Property Issue',
        category: 'Property',
        description: 'The property was not as described.',
        status: 'closed',
        createdAt: '2024-01-11T09:00:00.000Z',
    }
];

function USupport() {
    const [problems, setProblems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReports = problems.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    async function fetchData() {
        try {
            const res = await axiosClient.get('/problems');
            setProblems(res.data)
        } catch (error) {
            console.error(error);
        }
    }
    useState(() => {
        // fetchData()
        setProblems(dummyProblemReports)
    }, [])

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
                <Link
                    className='bg-primary rounded text-white py-2.5 px-3 flex items-center gap-1'
                >
                    <Plus size={18} /> New ticket
                </Link>
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
                            <Link
                                // to={'/' + report._id}
                                className='text-sm flex items-center gap-0.5 hover:underline'
                            >
                                view <Eye size={11} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default USupport;