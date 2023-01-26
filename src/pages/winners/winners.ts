import createDomElement from '@src/helpers/createDomElement';
import '@src/pages/winners/winners.css';
import { Winners } from '@src/types/types';
import { renderCarImg } from '@src/pages/garage/garage';

export default function winnersPage() {
  const winners = document.createElement('section');
  winners.className = 'winners';

  const winnerWrapper = createDomElement(winners, 'div', 'winner__wrapper');

  const winnerInfo = createDomElement(winnerWrapper, 'div', 'winner__info');
  const infoTitle = createDomElement(winnerInfo, 'h2', 'winner__title', 'Total winners: ');
  createDomElement(infoTitle, 'span', 'winner__count');

  const winnerPagination = createDomElement(winnerInfo, 'div', 'winner__pagination');
  const paginationTitle = createDomElement(
    winnerPagination,
    'h2',
    'pagination__title pagination__title_winner',
    'Page: '
  );
  createDomElement(paginationTitle, 'span', 'pagination__num pagination__winner-current', '1');
  createDomElement(paginationTitle, 'span', 'pagination__dot', '/');
  createDomElement(paginationTitle, 'span', 'pagination__num pagination__winner-total', '1');
  const paginationButtons = createDomElement(winnerPagination, 'div', 'pagination__buttons-winner');
  createDomElement(paginationButtons, 'button', 'pagination__btn pagination__btn-winner-prev', 'prev');
  createDomElement(paginationButtons, 'button', 'pagination__btn pagination__btn-winner-next', 'next');

  const winnerTable = createDomElement(winnerWrapper, 'table', 'winners__table');
  const winnerTableHead = createDomElement(winnerTable, 'thead', 'winners__head');
  const winnerTableRow = createDomElement(winnerTableHead, 'tr', 'winners__head');
  createDomElement(winnerTableRow, 'th', 'table__title', 'Number');
  createDomElement(winnerTableRow, 'th', 'table__title', 'Car');
  createDomElement(winnerTableRow, 'th', 'table__title', 'Name');
  const tableRowWins = createDomElement(winnerTableRow, 'th', 'table__title', 'Wins');
  const tableRowTime = createDomElement(winnerTableRow, 'th', 'table__title', 'Time');

  createDomElement(tableRowWins, 'button', 'table__data_wins wins__sort_asc', '^');
  createDomElement(tableRowTime, 'button', 'table__data_time time__sort_asc', '^');

  createDomElement(winnerTable, 'tbody', 'table__body');
  return winners;
}

export function renderWinnerTableCell(winner: Winners, index: number) {
  const tableRow = document.createElement('tr');
  tableRow.className = 'table__row';
  tableRow.id = `${winner.id}`;
  createDomElement(tableRow, 'td', 'table__data', `${index + 1}`);
  const tableCar = createDomElement(tableRow, 'td', 'table__data');
  tableCar.innerHTML = `${renderCarImg(winner.car !== undefined ? winner.car?.color : '#fff')}`;
  createDomElement(tableRow, 'td', 'table__data', `${winner.car?.name}`);
  createDomElement(tableRow, 'td', 'table__data', `${winner.wins}`);
  createDomElement(tableRow, 'td', 'table__data table__data_time', `${winner.time} sec.`);
  return tableRow;
}
