import createDomElement from '@src/helpers/createDomElement';
import './header.css';

export default function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';
  const headerContainer = createDomElement(header, 'div', 'container header__container');
  const headerWrapper = createDomElement(headerContainer, 'div', 'header__wrapper');
  createDomElement(headerWrapper, 'div', 'header__logo', 'Async Race');
  const headerButtons = createDomElement(headerWrapper, 'div', 'header__buttons');
  createDomElement(headerButtons, 'button', 'header__btn btn__garage', 'GARAGE');
  createDomElement(headerButtons, 'button', 'header__btn btn__winners', 'WINNER');

  return header;
}
