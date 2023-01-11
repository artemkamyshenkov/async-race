import { AttributesElement } from '@src/types/types';

export default function createDomElement(
  parentNode: HTMLElement | null,
  tagName: string,
  className: string,
  content?: string,
  attributes?: AttributesElement[]
) {
  const element: HTMLElement = document.createElement(tagName);
  element.className = className;
  if (content) {
    element.textContent = content;
  }

  if (Array.isArray(attributes)) {
    attributes.forEach((el) => {
      element.setAttribute(el.key, el.value);
    });
  }
  if (parentNode && parentNode instanceof HTMLElement) {
    parentNode.append(element);
  }
  return element;
}
