import s1i1 from '/landing-page/s1-i1.png';
import s1i2 from '/landing-page/s1-i2.png';
import s1bg from '/landing-page/s1-bg.png';

import s2i1 from '/landing-page/s2-i1.png';
import s2i2 from '/landing-page/s2-i2.png';
import s2i3 from '/landing-page/s2-i3.png';
import s2i4 from '/landing-page/s2-i4.png';
import shadow from '/landing-page/shadow.png';

import s3 from '/landing-page/s3.png';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { axiosClient } from '@/api/axios';
import PropertyCard from '@/components/guest/PropertyCard';
import { ExchangeRateContext } from '@/contexts/exchangeRatesWrapper';

function LandingPage() {
    const [city, setCity] = useState('');
    const [properties, setProperties] = useState([]);
    const { convert, selectedCurrency } = useContext(ExchangeRateContext)

    useEffect(() => {
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                        const { city } = response.data;
                        const lowerCaseCity = city.toLowerCase();
                        setCity(lowerCaseCity);
                    } catch (error) {
                        console.error('Error getting location:', error);
                    }
                });
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        getUserLocation();
    }, []);

    useEffect(() => {
        if (city) {
            const getProperties = async () => {
                try {
                    const res = await axiosClient.get('/properties/location/' + "Agadir");
                    setProperties(res.data)
                } catch (error) {
                    console.error('Error getting properties:', error);
                }
            };

            getProperties();
        }
    }, [city]);

    return (
        <div>
            <section className='overflow-hidden h-screen relative bg-[#F7F7FD]'>
                <div className='pt-16 pl-36'>
                    <h1 className='text-4xl font-semibold w-[450px]'>
                        Unlock effortless renting for your property with us
                    </h1>
                    <p className='mt-5 w-96 text-sm'>A great platform to rent your properties without any complications.</p>
                    <div className='mt-10 w-72 flex justify-evenly'>
                        <div className='pl-3 border-l-2 border-gray-200'>
                            <p className='text-primary text-2xl font-medium'>50k+</p>
                            <p className='text-xs'>renters</p>
                        </div>
                        <div className='pl-3 border-l-2 border-gray-200'>
                            <p className='text-primary text-2xl font-medium'>10k+</p>
                            <p className='text-xs'>properties</p>
                        </div>
                    </div>

                    <Button className='mt-10 flex items-center gap-1'>Browse properties <ArrowRight size={16} /></Button>
                </div>

                <img src={s1bg} alt="background map" className="absolute top-0 -right-14 w-1/2 h-full object-contain" />
                <img src={s1i1} alt="property" className="absolute top-16 right-96 w-64" />
                <img src={s1i2} alt="property" className="absolute top-80 right-10 w-44" />
            </section>

            <section className='mt-24'>
                <h2 className='text-2xl font-semibold w-72 mx-auto text-center'>
                    We are available in many well-known cities
                </h2>
                <div className='mt-10 flex justify-between px-16'>
                    <div className='relative w-fit'>
                        <img className='absolute top-0 inset-0' src={shadow} alt="" />
                        <h3 className='uppercase absolute inset-0 top-3 text-2xl text-white font-semibold text-center'>
                            Agadir
                        </h3>
                        <img src={s2i1} alt="agadir" />
                    </div>
                    <div className='relative w-fit'>
                        <img className='absolute top-0 inset-0 opacity-50' src={shadow} alt="" />
                        <h3 className='uppercase absolute inset-0 top-3 text-2xl text-white font-semibold text-center'>
                            Marrakesh
                        </h3>
                        <img src={s2i2} alt="marrakesh" />
                    </div>
                    <div className='relative w-fit'>
                        <img className='absolute top-0 inset-0' src={shadow} alt="" />
                        <h3 className='uppercase absolute inset-0 top-3 text-2xl text-white font-semibold text-center'>
                            Tangier
                        </h3>
                        <img src={s2i3} alt="tangier" />
                    </div>
                    <div className='relative w-fit'>
                        <img className='absolute top-0 inset-0 opacity-90' src={shadow} alt="" />
                        <h3 className='uppercase absolute inset-0 top-3 text-2xl text-white font-semibold text-center'>
                            Rabat
                        </h3>
                        <img src={s2i4} alt="rabat" />
                    </div>
                </div>
            </section>

            <section className='mt-24 flex justify-center gap-32 px-10'>
                <img src={s3} alt="" className='w-[40%]' />
                <div className='w-[40%] mt-20'>
                    <Tabs defaultValue="guest" className='w-full'>
                        <TabsList>
                            <TabsTrigger value="guest">For guests</TabsTrigger>
                            <TabsTrigger value="host">For hosts</TabsTrigger>
                        </TabsList>
                        <TabsContent value="guest" className='mt-10'>
                            <h2 className='text-2xl font-semibold'>
                                We make it easy for guests.
                            </h2>
                            <p className='text-sm font-thin mt-5'>
                                Looking for the perfect getaway? Whether you're planning a holiday or a quick escape, we make booking your ideal property easy and efficient. The best part? You'll save both time and money with our services, ensuring a stress-free and memorable experience
                            </p>
                            <Button className="flex gap-1 items-center mt-4">
                                See more <ChevronRight size={16} />
                            </Button>
                        </TabsContent>
                        <TabsContent value="host" className='mt-10'>
                            <h2 className='text-2xl font-semibold'>
                                We make it easy for hosts.
                            </h2>
                            <p className='text-sm font-thin mt-5'>
                                Ready to list your property and start earning? We make it easy and efficient for you to showcase your home to potential guests. The best part? You'll maximize your earnings while minimizing your effort with our comprehensive services.
                            </p>
                            <Button className="flex gap-1 items-center mt-4">
                                See more <ChevronRight size={16} />
                            </Button>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            <section className='mt-24 px-10'>
                <div className='flex justify-between'>
                    <div>
                        <h2 className='text-3xl font-semibold'>
                            Based on your location
                        </h2>
                        <p className='mt-2 text-xs font-thin'>
                            Some of our picked properties near you location.
                        </p>
                    </div>
                    <Button>Browse more properties</Button>
                </div>
                <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
                    {properties.length > 0
                        ?
                        properties.splice(0, 6).map(property => (
                            <PropertyCard
                                key={property._id}
                                property={property}
                                convert={convert}
                                selectedCurrency={selectedCurrency}
                            />
                        ))
                        :
                        <div className='flex items-center justify-center font-medium'>No properties found at your location</div>
                    }
                </div>
            </section>
        </div>
    );
}

export default LandingPage;