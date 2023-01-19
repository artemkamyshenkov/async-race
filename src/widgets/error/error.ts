import createDomElement from '@src/helpers/createDomElement';
import '@src/widgets/error/error.css';

export default function createError() {
  const error = document.createElement('div');
  error.className = 'error__wrapper';

  createDomElement(error, 'div', 'error__text', 'Server connection error. Try reconnecting and reload the page...');

  return error;
}
