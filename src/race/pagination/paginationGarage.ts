import state from '@src/race/state/statePage';
import { updateGarageState } from '@src/race/state/updateState';
import { renderCars } from '@src/race/cars/cars';

export default function paginationGarage() {
  const paginationBtnWrapper: HTMLElement | null = document.querySelector('.pagination__buttons');
  const trackItemsHTML: HTMLElement | null = document.querySelector('.track__items');
  const btnRace: HTMLButtonElement | null = document.querySelector('.btn__race');

  paginationBtnWrapper?.addEventListener('click', async (e: Event) => {
    const { target } = e;

    if ((target as HTMLElement).classList.contains('pagination__btn-next')) {
      state.carsPage += 1;
      await updateGarageState();
      (trackItemsHTML as HTMLElement).innerHTML = '';
      renderCars();
      if (btnRace?.hasAttribute('disabled')) {
        btnRace.disabled = false;
      }
    }

    if ((target as HTMLElement).classList.contains('pagination__btn-prev')) {
      state.carsPage -= 1;
      await updateGarageState();
      (trackItemsHTML as HTMLElement).innerHTML = '';
      renderCars();
      if (btnRace?.hasAttribute('disabled')) {
        btnRace.disabled = false;
      }
    }
  });
}
