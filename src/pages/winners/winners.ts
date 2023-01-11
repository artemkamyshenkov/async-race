import createDomElement from '@src/helpers/createDomElement';

export default function winnersPage() {
  const winners = document.createElement('section');
  winners.className = 'winners';
  createDomElement(winners, 'div', 'garage__wrapper', 'winners');
  return winners;
}
