import { createCar } from '@src/api/api';
import state from '@src/race/state/statePage';
import { renderCars } from '@src/race/cars/cars';
import updateGarageState from '@src/race/state/updateState';

export default function getRandomCars() {
  const randomBtn: HTMLButtonElement | null = document.querySelector('.btn__generate');
  const trackWrapperHTML: HTMLElement | null = document.querySelector('.track__items');
  randomBtn?.addEventListener('click', async () => {
    randomBtn.disabled = true;
    const randomCars = getRandomCar();
    await Promise.all(
      randomCars.map(async (car) => {
        await createCar(car);
      })
    );
    await updateGarageState();
    (trackWrapperHTML as HTMLElement).innerHTML = '';
    renderCars();
    randomBtn.disabled = false;
  });
}

function getRandomColor() {
  const colorLetters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += colorLetters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomName() {
  const carsName: string[] = [
    'Honda',
    'Hyundai',
    'Kia',
    'Mazda',
    'Ferrari',
    'Mitsubishi',
    'Nissan',
    'Renault',
    'Skoda',
    'Toyota',
    'Volkswagen',
  ];
  const carsModel: string[] = [
    'Solaris',
    'Land Cruiser',
    'Vesta',
    'TT',
    'Logan',
    'Octavia',
    'Civic',
    'Jazz',
    'California',
    'Fabia',
    'Camry',
    'Gallardo',
    'Murciélago',
  ];
  const randomName: string = carsName[Math.floor(Math.random() * carsName.length)];
  const randomModel: string = carsModel[Math.floor(Math.random() * carsModel.length)];

  return `${randomName} ${randomModel}`;
}

function getRandomCar() {
  const count = 100;
  const carId = Number(state.carsCount) + 1;
  return new Array(count).fill(1).map((_, i) => {
    return { id: carId + i, name: getRandomName(), color: getRandomColor() };
  });
}
