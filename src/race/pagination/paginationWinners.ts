import state from '@src/race/state/statePage';
import { updateWinnersState } from '@src/race/state/updateState';
import { renderWinners } from '@src/race/winners/winnersTable';

export default function paginationWinners() {
  const paginationBtnWrapper: HTMLElement | null = document.querySelector('.pagination__buttons-winner');
  const winnersTableHTML: HTMLElement | null = document.querySelector('.table__body');

  paginationBtnWrapper?.addEventListener('click', async (e: Event) => {
    const { target } = e;

    if ((target as HTMLElement).classList.contains('pagination__btn-winner-next')) {
      state.winnersPage += 1;
      await updateWinnersState();
      (winnersTableHTML as HTMLElement).innerHTML = '';
      renderWinners();
    }

    if ((target as HTMLElement).classList.contains('pagination__btn-winner-prev')) {
      state.winnersPage -= 1;
      await updateWinnersState();
      (winnersTableHTML as HTMLElement).innerHTML = '';
      renderWinners();
    }
  });
}
