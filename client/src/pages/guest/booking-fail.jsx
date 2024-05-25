import { XCircle } from 'lucide-react';

function BookingFail() {
    return (
        <div className='flex flex-col items-center justify-center w-full h-96'>
            <XCircle className='w-16 h-16 text-red-600' />
            <h1 className='text-xl font-semibold text-red-600'>
                Payment Failed
            </h1>
            <p className='mt-1 text-gray-600'>
                The payment failed, or you cancelled the transaction.
            </p>
        </div>
    );
}

export default BookingFail;