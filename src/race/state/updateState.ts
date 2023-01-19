import state from '@src/race/state/statePage';
import { getCars, getWinners } from '@src/api/api';

export async function updateGarageState() {
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
  } else if (btnPaginationNext) {
    btnPaginationNext.disabled = true;
  }
  if (state.carsPage > 1) {
    if (btnPaginationPrev) {
      btnPaginationPrev.disabled = false;
    }
  } else if (btnPaginationPrev) {
    btnPaginationPrev.disabled = true;
  }
}

export async function updateWinnersState() {
  const { items, count } = await getWinners(state.winnersPage, state.sortBy, state.sortOrder);
  state.winners = items;
  state.winnersCount = count;

  const btnPaginationNext: HTMLButtonElement | null = document.querySelector('.pagination__btn-winner-next');
  const btnPaginationPrev: HTMLButtonElement | null = document.querySelector('.pagination__btn-winner-prev');
  const currentPage: HTMLElement | null = document.querySelector('.pagination__winner-current');
  const totalPages: HTMLElement | null = document.querySelector('.pagination__winner-total');

  if (totalPages) totalPages.textContent = `${Math.ceil(Number(state.winnersCount) / 10) || '1'}`;
  if (currentPage) currentPage.textContent = `${state.winnersPage}`;

  if (Number(state.winnersPage * 10) < Number(state.winnersCount)) {
    if (btnPaginationNext) {
      btnPaginationNext.disabled = false;
    }
  } else if (btnPaginationNext) {
    btnPaginationNext.disabled = true;
  }
  if (state.winnersPage > 1) {
    if (btnPaginationPrev) {
      btnPaginationPrev.disabled = false;
    }
  } else if (btnPaginationPrev) {
    btnPaginationPrev.disabled = true;
  }
}
