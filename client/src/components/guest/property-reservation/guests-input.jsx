function GeustsInput() {
    function decrement(toInc) {
        switch (toInc) {
            case 'adults':
                setAdults(prev => {
                    if (prev > 1)
                        return prev - 1
                    return 1
                })
                break;
            case 'children':
                setChildren(prev => {
                    if (prev > 0)
                        return prev - 1
                    return 0
                })
                break;
            case 'infants':
                setInfants(prev => {
                    if (prev > 0)
                        return prev - 1
                    return 0
                })
                break;
            case 'pets':
                setPets(prev => {
                    if (prev > 0)
                        return prev - 1
                    return 0
                })
                break;
        }
    }
    function increment(toInc) {
        switch (toInc) {
            case 'adults':
                setAdults(prev => {
                    if (prev + children < maxAdults)
                        return prev + 1
                    return prev
                })
                break;
            case 'children':
                setChildren(prev => {
                    if (prev + adults < maxAdults)
                        return prev + 1
                    return prev
                })
                break;
            case 'infants':
                setInfants(prev => {
                    if (prev < maxInfants)
                        return prev + 1
                    return prev
                })
                break;
            case 'pets':
                setPets(prev => {
                    if (prev < maxPets)
                        return prev + 1
                    return prev
                })
                break;
        }
    }
    return (
        <div>
            <div className="font-medium">Guests</div>
            <Popover>
                <PopoverTrigger className="border px-4 py-2 rounded text-sm">
                    {adults + children} Guest{adults + children > 1 && 's'} {infants > 0 && `, ${infants} infant`}{infants > 1 && 's'} {pets > 0 && `, ${pets} pet`}{pets > 1 && 's'}
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium">Adults</p>
                            <p className="text-sm font-thin">Age +16</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button disabled={adults == 1} className="group w-8 h-8 flex justify-center items-center border border-gray-300 rounded-full text-lg hover:bg-gray-50 disabled:border-gray-100 disabled:cursor-not-allowed transition-all" onClick={() => decrement('adults')}>
                                <Minus className="stroke-gray-500 group-disabled:stroke-gray-300" size='14px' />
                            </button>
                            <div>{adults}</div>
                            <button disabled={(children + adults) == maxAdults} className="group w-8 h-8 flex justify-center items-center border border-gray-300 rounded-full text-lg hover:bg-gray-50 disabled:border-gray-100 disabled:cursor-not-allowed transition-all" onClick={() => increment('adults')}>
                                <Plus className="stroke-gray-500 group-disabled:stroke-gray-300" size='14px' />
                            </button>
                        </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                        <div>
                            <p className="font-medium">Children</p>
                            <p className="text-sm font-thin">Ages 2 to 15</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button disabled={children == 0} className="group w-8 h-8 flex justify-center items-center border border-gray-300 rounded-full text-lg hover:bg-gray-50 disabled:border-gray-100 disabled:cursor-not-allowed transition-all" onClick={() => decrement('children')}>
                                <Minus className="stroke-gray-500 group-disabled:stroke-gray-300" size='14px' />
                            </button>
                            <div>{children}</div>
                            <button disabled={(children + adults) == maxAdults} className="group w-8 h-8 flex justify-center items-center border border-gray-300 rounded-full text-lg hover:bg-gray-50 disabled:border-gray-100 disabled:cursor-not-allowed transition-all" onClick={() => increment('children')}>
                                <Plus className="stroke-gray-500 group-disabled:stroke-gray-300" size='14px' />
                            </button>
                        </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                        <div>
                            <p className="font-medium">Infants</p>
                            <p className="text-sm font-thin">Under 2</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button disabled={infants == 0} className="group w-8 h-8 flex justify-center items-center border border-gray-300 rounded-full text-lg hover:bg-gray-50 disabled:border-gray-100 disabled:cursor-not-allowed transition-all" onClick={() => decrement('infants')}>
                                <Minus className="stroke-gray-500 group-disabled:stroke-gray-300" size='14px' />
                            </button>
                            <div>{infants}</div>
                            <button disabled={infants == maxInfants} className="group w-8 h-8 flex justify-center items-center border border-gray-300 rounded-full text-lg hover:bg-gray-50 disabled:border-gray-100 disabled:cursor-not-allowed transition-all" onClick={() => increment('infants')}>
                                <Plus className="stroke-gray-500 group-disabled:stroke-gray-300" size='14px' />
                            </button>
                        </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                        <div>
                            <p className="font-medium">Pets</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button disabled={pets == 0} className="group w-8 h-8 flex justify-center items-center border border-gray-300 rounded-full text-lg hover:bg-gray-50 disabled:border-gray-100 disabled:cursor-not-allowed transition-all" onClick={() => decrement('pets')}>
                                <Minus className="stroke-gray-500 group-disabled:stroke-gray-300" size='14px' />
                            </button>
                            <div>{pets}</div>
                            <button disabled={pets == maxPets} className="group w-8 h-8 flex justify-center items-center border border-gray-300 rounded-full text-lg hover:bg-gray-50 disabled:border-gray-100 disabled:cursor-not-allowed transition-all" onClick={() => increment('pets')}>
                                <Plus className="stroke-gray-500 group-disabled:stroke-gray-300" size='14px' />
                            </button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default GeustsInput;