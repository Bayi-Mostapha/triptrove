import Booking from "@/components/guest/property-reservation/booking";

function Property() {
    // date range 
    const disabledDates = [new Date('2024-05-15'), new Date('2024-05-20')];
    // guests input 
    const maxAdults = 12;
    const maxInfants = 5;
    const maxPets = 3;

    return (
        <>
            <Booking
                disabledDates={disabledDates}
                maxAdults={maxAdults}
                maxInfants={maxInfants}
                maxPets={maxPets}
            />
        </>
    );
}

export default Property;