import { startEngine, stopEngine, driveCar, saveWinner } from '@src/api/api';
import { getDistanceRoad, animationRace } from '@src/race/cars/animation';
import state from '@src/race/state/statePage';
import { PromisesCars, CreateCar, WinnerCar, Callback } from '@src/types/types';
import { updateWinnersState } from '../state/updateState';

export default function race() {
  controlsRaceAll();
  controlRace();
}

function controlRace() {
  const trackWrapperHTML: HTMLElement | null = document.querySelector('.track__items');
  trackWrapperHTML?.addEventListener('click', async (e: Event) => {
    const { target } = e;
    if ((target as HTMLElement).classList.contains('road__btn-start')) {
      const id = Number((target as HTMLElement).id.split('road__btn-start-')[1]);
      startRace(id);
    }
    if ((target as HTMLElement).classList.contains('road__btn-stop')) {
      const id = Number((target as HTMLElement).id.split('road__btn-stop-')[1]);
      stopRace(id);
    }
  });
}

function controlsRaceAll() {
  const modalWin: HTMLElement | null = document.querySelector('.modal');
  const modalInfo: HTMLElement | null = document.querySelector('.modal__info');
  const controlsRaceAllHTML: HTMLElement | null = document.querySelector('.controls__race');
  const btnRaceStart: HTMLButtonElement | null = document.querySelector('.btn__race');
  const btnRaceReset: HTMLButtonElement | null = document.querySelector('.btn__reset');
  controlsRaceAllHTML?.addEventListener('click', async (e: Event) => {
    const { target } = e;
    if ((target as HTMLElement).classList.contains('btn__race')) {
      if (btnRaceStart) btnRaceStart.disabled = true;
      const { id, time } = await raceCars(startRace);
      await saveWinner(id, time);
      if (modalWin) modalWin.classList.add('open');
      const winner = state.cars.find((car: CreateCar) => car.id === id);
      if (modalInfo)
        modalInfo.textContent = `The winner of this race was Vin Diesel on his ${winner.name}, his time is ${time} sec.`;
      if (btnRaceReset) btnRaceReset.disabled = false;
      closeWinModal();
      await updateWinnersState();
    }

    if ((target as HTMLElement).classList.contains('btn__reset')) {
      if (btnRaceReset) btnRaceReset.disabled = true;
      state.cars.map((car: CreateCar) => stopRace(car.id));
      if (modalWin) modalWin.classList.remove('open');
      if (btnRaceStart) btnRaceStart.disabled = false;
    }
  });
}

async function startRace(id: number) {
  const startRaceBtn: HTMLElement | null = document.getElementById(`road__btn-start-${id}`);
  const stopRaceBtn: HTMLElement | null = document.getElementById(`road__btn-stop-${id}`);
  const car: HTMLElement | null = document.getElementById(`car-${id}`);
  const finishFlag: HTMLElement | null = document.getElementById(`flag-${id}`);
  const distanceHTML: number = Math.floor(getDistanceRoad(car as HTMLElement, finishFlag as HTMLElement) + 30);

  if (startRaceBtn) (startRaceBtn as HTMLButtonElement).disabled = true;

  const { velocity, distance } = await startEngine(id);
  const time: number = Math.round(distance / velocity);

  if (stopRaceBtn) (stopRaceBtn as HTMLButtonElement).disabled = false;

  state.animation[id] = animationRace(car as HTMLElement, distanceHTML, time);

  const { success } = await driveCar(id);
  if (!success) window.cancelAnimationFrame(state.animation[id].id);

  return { success, id, time };
}

async function stopRace(id: number) {
  const startRaceBtn: HTMLButtonElement | null = document.querySelector(`#road__btn-start-${id}`);
  const stopRaceBtn: HTMLButtonElement | null = document.querySelector(`#road__btn-stop-${id}`);
  const car: HTMLElement | null = document.querySelector(`#car-${id}`);

  if (stopRaceBtn) stopRaceBtn.disabled = true;

  await stopEngine(id);

  if (startRaceBtn) startRaceBtn.disabled = false;

  if (car) car.style.transform = 'translateX(0)';

  if (state.animation[id]) window.cancelAnimationFrame(state.animation[id].id);
}

async function raceAllCars(promises: PromisesCars[], carsId: number[]): Promise<WinnerCar> {
  const { success, id, time } = await Promise.race(promises);

  if (!success) {
    const brokenCarId = carsId.findIndex((index) => index === id);
    const succeessCars = [...promises.slice(0, brokenCarId), ...promises.slice(brokenCarId + 1, promises.length)];
    const succeessCarsId = [...carsId.slice(0, brokenCarId), ...carsId.slice(brokenCarId + 1, promises.length)];
    return raceAllCars(succeessCars, succeessCarsId);
  }
  return { ...state.cars.find((car: CreateCar) => car.id === id), time: Number(time / 1000).toFixed(2) };
}

async function raceCars(action: Callback) {
  const promises = state.cars.map((car: CreateCar) => action(car.id));
  const winCar = await raceAllCars(
    promises,
    state.cars.map((car: CreateCar) => car.id)
  );
  return winCar;
}

function closeWinModal() {
  const closeModalBtn: HTMLButtonElement | null = document.querySelector('.btn__modal');
  const modal: HTMLElement | null = document.querySelector('.modal');
  closeModalBtn?.addEventListener('click', () => {
    if (modal?.classList.contains('open')) {
      modal.classList.remove('open');
    }
  });
}
