import state from '@src/race/state/statePage';
import { createCar, deleteCar, deleteWinner, getCar, updateCar } from '@src/api/api';
import { renderCar } from '@src/pages/garage/garage';
import { CreateCar } from '@src/types/types';
import { updateGarageState } from '@src/race/state/updateState';
import paginationGarage from '@src/race/pagination/paginationGarage';
import generateRandomCars from '@src/race/cars/generateCars';
import race from '@src/race/cars/race';

export default async function garageCar() {
  paginationGarage();
  createCarBtn();
  deleteCarBtn();
  renderCars();
  editCarBtn();
  updateGarageState();
  generateRandomCars();
  race();
}

export function renderCars() {
  const trackItemsHTML: HTMLElement | null = document.querySelector('.track__items');
  const carCount: HTMLElement | null = document.querySelector('.info__count');
  if (carCount) carCount.textContent = `${state.carsCount}`;

  state.cars.forEach((car: CreateCar) => {
    trackItemsHTML?.append(renderCar(car));
  });
}

function createCarBtn() {
  const formCreateHTML: HTMLFormElement | null = document.querySelector('.controls__create');
  const createInputHTML: HTMLInputElement | null = document.querySelector('.create__input');
  const colorInputHTML: HTMLInputElement | null = document.querySelector('.create__color');
  const trackWrapperHTML: HTMLElement | null = document.querySelector('.track__items');

  // Сохранение текста input в local storage
  createInputHTML?.addEventListener('input', () => {
    localStorage.setItem('carName', `${createInputHTML?.value}`);
  });

  colorInputHTML?.addEventListener('input', () => {
    localStorage.setItem('carColor', `${colorInputHTML?.value}`);
  });

  if (createInputHTML) createInputHTML.value = `${localStorage.getItem('carName') || ''}`;
  if (colorInputHTML) colorInputHTML.value = `${localStorage.getItem('carColor') || '#000000'}`;

  formCreateHTML?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const carName = createInputHTML?.value;
    const carColor = colorInputHTML?.value;
    const carId = Number(state.cars.id);
    const body = {
      id: carId + 1,
      name: carName as string,
      color: carColor as string,
    };
    await createCar(body);
    await updateGarageState();
    (trackWrapperHTML as HTMLElement).innerHTML = '';
    renderCars();
    localStorage.removeItem('carName');
    localStorage.removeItem('carColor');
    if (createInputHTML) {
      createInputHTML.value = '';
      createInputHTML.focus();
    }
    if (colorInputHTML) colorInputHTML.value = '#000000';
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
      await updateGarageState();
      (trackWrapperHTML as HTMLElement).innerHTML = '';
      renderCars();
    }
  });
}

function editCarBtn() {
  const trackWrapperHTML: HTMLElement | null = document.querySelector('.track__items');
  const editInputHTML: HTMLInputElement | null = document.querySelector('.edit__input');
  const editColorHTML: HTMLInputElement | null = document.querySelector('.edit__color');
  const editBtnHTML: HTMLButtonElement | null = document.querySelector('.edit__btn');
  const formEditHTML: HTMLFormElement | null = document.querySelector('.controls__edit');

  trackWrapperHTML?.addEventListener('click', async (e: Event) => {
    const { target } = e;
    if ((target as HTMLElement).classList.contains('info__btn-edit')) {
      const editCarId = Number((target as HTMLElement).id.split('info__btn-edit-')[1]);
      const editCar = await getCar(editCarId);
      if (editInputHTML) {
        editInputHTML.disabled = false;
        editInputHTML.value = editCar.name;
      }
      if (editColorHTML) {
        editColorHTML.value = editCar.color;
        editColorHTML.disabled = false;
      }
      if (editBtnHTML) {
        editBtnHTML.disabled = false;
      }
      formEditHTML?.addEventListener('submit', async () => {
        e.preventDefault();
        const carName = editInputHTML?.value;
        const carColor = editColorHTML?.value;
        const body = {
          id: editCarId,
          name: carName as string,
          color: carColor as string,
        };
        await updateCar(editCarId, body);
      });
    }
  });
}
