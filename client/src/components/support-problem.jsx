import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { axiosClient } from "@/api/axios";
import { toast } from "react-toastify";

function SupportProblem({ actualTicket, setActualTicket }) {
    const [message, setMessage] = useState('');

    const messages = actualTicket.messages;

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const submitMessage = async () => {
        try {
            await axiosClient.post('/problem/' + actualTicket._id + '/messages/user', { content: message })
            messages.push({ senderRole: 'user', content: message })
            setMessage('');
        } catch (error) {
            toast.error('something went wrong')
        }
    };
    return (
        <div className='p-4'>
            <Button
                variant='outline'
                onClick={() => { setActualTicket(null) }}
            >
                <ChevronLeft size={18} /> Go back
            </Button>

            <h3 className='my-4 text-3xl font-medium  mb-3 text-violet-950'><span className='text-5xl font-semibold'>Ticket:</span> {actualTicket.title}</h3>

            <p className='text-sm text-gray-700 '><span className='font-semibold text-lg'>Category:</span> {actualTicket.category}</p>
            <p className='text-sm text-gray-700 '><span className='font-semibold text-lg'>Description:</span> {actualTicket.description}</p>
            <p className='text-sm text-gray-700 '><span className='font-semibold text-lg'>Submitted By:</span> {actualTicket.user.fullName}</p>
            <p className='text-sm text-gray-700 '><span className='font-semibold text-lg'>Submitted:</span> {formatDistanceToNow(actualTicket.createdAt)} ago</p>
            <div className="border-b-[1px] border-[#e0e0e0] w-full mt-6"></div>
            <div className='flex flex-col gap-4 py-5  w-full '>
                {
                    messages?.map((msg, index) => (
                        <div className='flex flex-col' key={index}>
                            <p className='ml-3 text-lg font-medium text-[#7065F0] '>{(msg.senderRole === "admin" || msg.senderRole === "superAdmin") ? "Admin" : actualTicket.user.firstName}:</p>
                            <p className='ml-4 text-md text-gray-600'>{msg.content}</p>
                        </div>
                    ))
                }
            </div>
            {
                actualTicket.status == "open" &&
                <div className="w-full p-3">
                    <div className='relative'>
                        <textarea
                            id="messageArea"
                            value={message}
                            onChange={(e) => handleMessageChange(e)}
                            className="rounded w-full py-4 px-5 pr-24 outline-none border-[1px] border-gray-300 min-h-24"
                            placeholder='answer ticket'
                        />
                        <button
                            className='absolute top-6 right-3 py-2 px-5 bg-[#7065F0] text-white rounded'
                            onClick={submitMessage}
                        >
                            send
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default SupportProblem;