import '@src/index.css';
import '@src/assets/styles/normalize.css';
import createDomElement from '@src/helpers/createDomElement';
import createHeader from '../header/header';
import createFooter from '../footer/footer';
import createError from '../error/error';

export default function createMainPage() {
  const wrapper: HTMLElement | null = createDomElement(document.body, 'div', 'wrapper');
  const header = createHeader();
  wrapper.append(header);
  const main: HTMLElement | null = createDomElement(wrapper, 'main', 'main');
  const contentContainer: HTMLElement = createDomElement(main, 'div', 'container');
  createDomElement(contentContainer, 'div', 'content');
  contentContainer.append(createError());
  const footer = createFooter();
  wrapper.append(footer);
}
