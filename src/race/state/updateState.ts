import state from '@src/race/state/statePage';
import { getCars } from '@src/api/api';

export default async function updateGarageState() {
  const { items, count } = await getCars(state.carsPage);
  state.cars = items;
  state.carsCount = count;
  const btnPaginationNext: HTMLButtonElement | null = document.querySelector('.pagination__btn-next');
  const btnPaginationPrev: HTMLButtonElement | null = document.querySelector('.pagination__btn-prev');
  const currentPage: HTMLElement | null = document.querySelector('.pagination__num-current');
  const totalPages: HTMLElement | null = document.querySelector('.pagination__num-total');
  if (totalPages) {
    totalPages.textContent = `${Math.ceil(Number(state.carsCount) / 7)}`;
  }
  if (currentPage) {
    currentPage.textContent = `${state.carsPage}`;
  }
  if (Number(state.carsPage * 7) < Number(state.carsCount)) {
    if (btnPaginationNext) {
      btnPaginationNext.disabled = false;
    }
  } else {
    (btnPaginationNext as HTMLButtonElement).disabled = true;
  }
  if (state.carsPage > 1) {
    if (btnPaginationPrev) {
      btnPaginationPrev.disabled = false;
    }
  } else {
    (btnPaginationPrev as HTMLButtonElement).disabled = true;
  }
}
