import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";

function Property() {
    const [adults, setAdults] = useState(1);
    const maxAdults = 12;
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [pets, setPets] = useState(0);

    function decrement(toInc) {
        switch (toInc) {
            case 'adults':
                setAdults(prev => {
                    if (prev > 1)
                        return prev - 1
                    return 1
                })
                break;
        }
    }
    function increment(toInc) {
        switch (toInc) {
            case 'adults':
                setAdults(prev => {
                    if (prev < maxAdults)
                        return prev + 1
                    return maxAdults
                })
                break;
        }
    }

    return (
        <div>
            <div>Guests</div>
            <Popover>
                <PopoverTrigger className="border px-4 py-2 rounded">
                    {adults + children} Guest(s) {infants > 0 && `, ${infants} infant(s)`} {pets > 0 && `, ${pets} pet(s)`}
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium">Adults</p>
                            <p className="text-sm font-thin">Age +16</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="w-8 h-8 flex justify-center items-center border rounded-full text-lg" onClick={() => decrement('adults')}>-</button>
                            <div>{adults}</div>
                            <button className="w-8 h-8 flex justify-center items-center border rounded-full text-lg" onClick={() => increment('adults')}>+</button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default Property;