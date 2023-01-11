import createDomElement from '@src/helpers/createDomElement';
import './footer.css';

export default function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  const footerContainer = createDomElement(footer, 'div', 'container footer__container');
  const footerWrapper = createDomElement(footerContainer, 'div', 'footer__wrapper');
  createDomElement(footerWrapper, 'div', 'footer__logo', 'Async Race 2023');
  createDomElement(footerWrapper, 'div', 'footer__github');
  createDomElement(footerWrapper, 'div', 'footer__rs');

  return footer;
}
