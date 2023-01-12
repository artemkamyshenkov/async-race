import { getCar, getCars, createCar, driveCar } from '@src/api/api';

export default async function startRace() {
  // const car = await createCar({ id: 5, name: 'audi', color: '#fff' });
  const garage = await getCar(1);
  console.log(garage);
}
