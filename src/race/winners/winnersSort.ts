import { renderWinners } from '@src/race/winners/winnersTable';
import state from '../state/statePage';
import { updateWinnersState } from '../state/updateState';

export default function sortWinners() {
  sortWinnersByWins();
  sortWinnersByTime();
}

function sortWinnersByWins() {
  const sortByWinsBtn: HTMLButtonElement | null = document.querySelector('.table__data_wins');
  const winnersTableHTML: HTMLElement | null = document.querySelector('.table__body');
  sortByWinsBtn?.addEventListener('click', async () => {
    state.sortBy = 'wins';
    if (sortByWinsBtn.classList.contains('wins__sort_asc')) {
      sortByWinsBtn.classList.remove('wins__sort_asc');
      sortByWinsBtn.classList.add('wins__sort_desc');
      state.sortOrder = 'desc';
    } else if (sortByWinsBtn.classList.contains('wins__sort_desc')) {
      sortByWinsBtn.classList.remove('wins__sort_desc');
      sortByWinsBtn.classList.add('wins__sort_asc');
      state.sortOrder = 'asc';
    }
    await updateWinnersState();
    (winnersTableHTML as HTMLElement).innerHTML = '';
    renderWinners();
  });
}

function sortWinnersByTime() {
  const sortByTimeBtn: HTMLButtonElement | null = document.querySelector('.table__data_time');
  const winnersTableHTML: HTMLElement | null = document.querySelector('.table__body');
  sortByTimeBtn?.addEventListener('click', async () => {
    state.sortBy = 'time';
    if (sortByTimeBtn.classList.contains('time__sort_asc')) {
      sortByTimeBtn.classList.remove('time__sort_asc');
      sortByTimeBtn.classList.add('time__sort_desc');
      state.sortOrder = 'desc';
    } else if (sortByTimeBtn.classList.contains('time__sort_desc')) {
      sortByTimeBtn.classList.remove('time__sort_desc');
      sortByTimeBtn.classList.add('time__sort_asc');
      state.sortOrder = 'asc';
    }
    await updateWinnersState();
    (winnersTableHTML as HTMLElement).innerHTML = '';
    renderWinners();
  });
}
