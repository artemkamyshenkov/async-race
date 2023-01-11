import createDomElement from '@src/helpers/createDomElement';

export default function garagePage() {
  const garage = document.createElement('section');
  garage.className = 'garage';
  createDomElement(garage, 'div', 'garage__wrapper', 'garage');
  return garage;
}
