import createDomElement from '@src/helpers/createDomElement';
import '@src/widgets/modal/modalWin.css';

export default function showWinModal() {
  const modalWrapper = document.createElement('div');
  modalWrapper.className = 'modal';
  const modalBody = createDomElement(modalWrapper, 'div', 'modal__body');

  createDomElement(modalBody, 'h3', 'modal__title', `Champion`);
  createDomElement(modalBody, 'div', 'modal__info');
  return modalWrapper;
}
