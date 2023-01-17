import state from '@src/race/state/statePage';
import { renderWinnerTableCell } from '@src/pages/winners/winners';
import paginationWinners from '@src/race/pagination/paginationWinners';
import { updateWinnersState } from '../state/updateState';

export default async function winnersTable() {
  paginationWinners();
  renderWinners();
  updateWinnersState();
}

export function renderWinners() {
  const winnersTableHTML: HTMLElement | null = document.querySelector('.table__body');
  const winnersCount: HTMLElement | null = document.querySelector('.winner__count');
  if (winnersCount) winnersCount.textContent = `${state.winnersCount}`;
  state.winners.forEach((winner, index) => {
    winnersTableHTML?.append(renderWinnerTableCell(winner, index));
  });
}
