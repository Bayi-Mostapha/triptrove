import {
    WifiIcon,
    Tv,
    LucideCookingPot,
    LucideLampDesk,
    TreeDeciduous,
    WashingMachine
} from 'lucide-react';
import { FaUmbrellaBeach } from 'react-icons/fa';

const PlaceFeatures = ({ place }) => {
    const features = [
        { hasFeature: place.hasWifi, Icon: WifiIcon, label: 'Wifi' },
        { hasFeature: place.hasPool, Icon: FaUmbrellaBeach, label: 'Pool' },
        { hasFeature: place.hasTv, Icon: Tv, label: 'TV' },
        { hasFeature: place.hasWasher, Icon: WashingMachine, label: 'Washer' },
        { hasFeature: place.hasPark, Icon: TreeDeciduous, label: 'Park' },
        { hasFeature: place.hasKitchen, Icon: LucideCookingPot, label: 'Kitchen' },
        { hasFeature: place.hasDesk, Icon: LucideLampDesk, label: 'Desk' },
    ];

    return (
        <>
            {
                features.length > 0 ?
                    <div className="mt-2 grid grid-cols-5 gap-2">
                        {features.map(
                            (feature, index) =>
                                feature.hasFeature && (
                                    <div key={index} className="p-2 flex flex-col justify-center gap-1 items-center border rounded-md">
                                        <feature.Icon className="w-7 h-7 text-primary" />
                                        <span className='font-medium text-xs'>{feature.label}</span>
                                    </div>
                                )
                        )}
                    </div>
                    :
                    <div className='mt-14 flex items-center justify-center font-medium'>This property has no sepecial amenities</div>
            }
        </>
    );
};

export default PlaceFeatures;
