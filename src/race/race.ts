import state from '@src/race/statePage';
import { createCar, driveCar, deleteCar, deleteWinner } from '@src/api/api';
import { renderCar } from '@src/pages/garage/garage';
import { CreateCar } from '@src/types/types';

export default async function startRace() {
  createCarBtn();
  deleteCarBtn();
  renderCars();
  // editCarBtn();
}

export function renderCars() {
  const trackItemsHTML: HTMLElement | null = document.querySelector('.track__items');
  const carCount: HTMLElement | null = document.querySelector('.info__count');
  if (carCount) {
    carCount.textContent = `${state.carsCount}`;
  }
  state.cars.forEach((car: CreateCar) => {
    trackItemsHTML?.append(renderCar(car));
  });
}

function createCarBtn() {
  const formCreateHTML: HTMLFormElement | null = document.querySelector('.controls__create');
  const createInputHTML: HTMLInputElement | null = document.querySelector('.create__input');
  const colorInputHTML: HTMLInputElement | null = document.querySelector('.create__color');
  const createCarBtnHTML: HTMLButtonElement | null = document.querySelector('.create__btn');
  const trackWrapperHTML: HTMLElement | null = document.querySelector('.track__items');

  createCarBtnHTML?.addEventListener('click', async (e) => {
    e.preventDefault();
    const carName = createInputHTML?.value;
    const carColor = colorInputHTML?.value;
    const carId = Number(state.carsCount);

    const body = {
      id: carId + 1,
      name: carName as string,
      color: carColor as string,
    };
    await createCar(body);
    formCreateHTML?.submit();
  });
}

function deleteCarBtn() {
  const trackWrapperHTML: HTMLElement | null = document.querySelector('.track__items');
  trackWrapperHTML?.addEventListener('click', async (e: Event) => {
    const { target } = e;
    if ((target as HTMLElement).classList.contains('info__btn-delete')) {
      const id = Number((target as HTMLElement).id.split('info__btn-delete-')[1]);
      await deleteCar(id);
      await deleteWinner(id);
      // window.location.reload();
      setTimeout(() => {
        console.log(state.cars);
      }, 2000);
    }
  });
}

// function editCarBtn() {
//   const trackWrapperHTML: HTMLElement | null = document.querySelector('.track__items');
//   trackWrapperHTML?.addEventListener('click', async (e: Event) => {
//     const { target } = e;
//     if ((target as HTMLElement).classList.contains('info__btn-edit')) {
//       const id = Number((target as HTMLElement).id.split('info__btn-delete-')[1]);
//       const trackItemsHTML: HTMLElement | null = document.querySelector('.track__items');
//       await deleteCar(id);
//       await deleteWinner(id);
//       if (trackItemsHTML) {
//         trackItemsHTML.innerHTML = '';
//       }
//     }
//   });
// }
