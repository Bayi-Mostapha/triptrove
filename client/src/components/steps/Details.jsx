import React, { useContext } from 'react';
import { StepperContext } from '@/contexts/StepperContext';
import { Input } from '@/components/ui/input';

const MoroccanCities = [
  'Casablanca',
  'Rabat',
  'Marrakech',
  'Fes',
  'Tangier',
  'Agadir',
  'Meknes',
  'Oujda',
  'Kenitra',
  'Tetouan',
  'Safi',
  'Khouribga',
  'Beni Mellal',
  'Mohammedia',
  'El Jadida',
  'Nador',
  'Khemisset',
  'Settat',
  'Larache',
  'Ksar El Kebir',
  'Guelmim',
  'Ouarzazate',
  'Al Hoceima',
  'Taza',
  'Errachidia',
  'Berkane',
  'Inezgane',
  'Tiznit',
  'Sidi Kacem',
  'Taroudant'
];


const Details = () => {
  const { userData, updateUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUserData({ [name]: value });
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col gap-2'>
        <label className='text-[#7B7F8E]'>Title</label>
        <Input name="title" value={userData.title} onChange={handleChange} />
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-[#7B7F8E]'>Description</label>
        <Input name="description" value={userData.description} onChange={handleChange} className='h-28' />
      </div>
      <div className='flex gap-6'>
        <div className='flex flex-col gap-2'>
          <label className='text-[#7B7F8E]'>Street address</label>
          <Input
            name="streetAddress"
            value={userData.streetAddress}
            onChange={handleChange}
            className='h-12 w-full max-w-xs rounded-md border border-[#D7E0ED] px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-[#7B7F8E]'>City / town</label>
          <select
            name="city"
            value={userData.city}
            onChange={handleChange}
            className='h-12 w-full  max-w-xs rounded-md border border-[#D7E0ED] bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          >
            <option value="" disabled >Select a city</option>
            {MoroccanCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Details;
