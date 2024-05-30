import s1i1 from '/landing-page/s1-i1.png';
import s1i2 from '/landing-page/s1-i2.png';
import s1bg from '/landing-page/s1-bg.png';

import s2i1 from '/landing-page/s2-i1.png';
import s2i2 from '/landing-page/s2-i2.png';
import s2i3 from '/landing-page/s2-i3.png';
import s2i4 from '/landing-page/s2-i4.png';
import shadow from '/landing-page/shadow.png';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';


function LandingPage() {
    return (
        <div>
            <section className='overflow-hidden h-screen relative bg-[#F7F7FD]'>
                <div className='pt-16 pl-32'>
                    <h1 className='text-4xl font-semibold w-96'>
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
                <img src={s1i1} alt="property" className="absolute top-16 right-80 w-64" />
                <img src={s1i2} alt="property" className="absolute top-80 right-5 w-44" />
            </section>
            <section className='mt-24'>
                <h1 className='text-2xl font-semibold w-72 mx-auto text-center'>
                    We are available in many well-known cities
                </h1>
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
        </div>
    );
}

export default LandingPage;