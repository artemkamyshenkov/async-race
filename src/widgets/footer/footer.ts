import createDomElement from '@src/helpers/createDomElement';
import './footer.css';

export default function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  const footerContainer = createDomElement(footer, 'div', 'container footer__container');
  const footerWrapper = createDomElement(footerContainer, 'div', 'footer__wrapper');
  const footerSocial = createDomElement(footerWrapper, 'ul', 'footer__social');
  const socialItemGit = createDomElement(footerSocial, 'li', 'social__item');
  const itemIconGit = createDomElement(socialItemGit, 'a', 'item__icon');
  (itemIconGit as HTMLAnchorElement).href = 'https://github.com/artemkamyshenkov';
  createDomElement(itemIconGit, 'div', 'item__icon_img');

  const footerTitle = createDomElement(footerSocial, 'li', 'footer__logo', 'Async Race 2023');
  createDomElement(footerTitle, 'sup', 'title__year', 'Ⓡ');

  const socialItemLogo = createDomElement(footerSocial, 'li', 'social__item');
  const itemIconLogo = createDomElement(socialItemLogo, 'a', 'item__icon');
  (itemIconLogo as HTMLAnchorElement).href = 'https://rs.school/';
  createDomElement(itemIconLogo, 'div', 'item__icon_logo');

  return footer;
}
