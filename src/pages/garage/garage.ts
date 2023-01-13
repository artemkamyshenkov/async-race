import createDomElement from '@src/helpers/createDomElement';
import { CreateCar } from '@src/types/types';
import './garage.css';

export function garagePage() {
  const garage = document.createElement('section');
  garage.className = 'garage';
  const garageWrapper = createDomElement(garage, 'div', 'garage__wrapper');
  const garageControls = createDomElement(garageWrapper, 'div', 'car__controls');
  const constolsCreate = createDomElement(garageControls, 'form', 'controls__create');
  createDomElement(constolsCreate, 'input', 'controls__input create__input', '', [
    { key: 'type', value: 'text' },
    { key: 'placeholder', value: 'Car name' },
    { key: 'maxlength', value: '25' },
    { key: 'value', value: '' },
  ]);
  createDomElement(constolsCreate, 'input', 'controls__color create__color', '', [
    { key: 'type', value: 'color' },
    { key: 'value', value: '#000000' },
  ]);
  createDomElement(constolsCreate, 'button', 'controls__btn create__btn', 'Create car', [
    { key: 'type', value: 'button' },
  ]);

  const controlsEdit = createDomElement(garageControls, 'form', 'controls__edit');
  createDomElement(controlsEdit, 'input', 'controls__input edit__input', '', [
    { key: 'type', value: 'text' },
    { key: 'placeholder', value: 'Car name' },
    { key: 'maxlength', value: '25' },
    { key: 'value', value: '' },
    { key: 'disabled', value: '' },
  ]);
  createDomElement(controlsEdit, 'input', 'controls__color edit__color', '', [
    { key: 'type', value: 'color' },
    { key: 'value', value: '#000000' },
    { key: 'disabled', value: '' },
  ]);
  createDomElement(controlsEdit, 'button', 'controls__btn edit__btn', 'Edit car', [{ key: 'disabled', value: '' }]);

  const controlsRace = createDomElement(garageControls, 'div', 'controls__race');
  createDomElement(controlsRace, 'button', 'controls__btn btn__race', 'Race');
  createDomElement(controlsRace, 'button', 'controls__btn btn__reset', 'Reset');
  createDomElement(controlsRace, 'button', 'controls__btn btn__generate', 'Generate Cars');

  const garageInfo = createDomElement(garageWrapper, 'div', 'garage__info');
  const infoTitle = createDomElement(garageInfo, 'h2', 'info__title', 'Cars: ');
  createDomElement(infoTitle, 'span', 'info__count');

  const garagePagination = createDomElement(garageInfo, 'div', 'garage__pagination');
  const paginationTitle = createDomElement(garagePagination, 'h2', 'pagination__title', 'Page: ');
  createDomElement(paginationTitle, 'span', 'pagination__num pagination__num-current', '1');
  createDomElement(paginationTitle, 'span', 'pagination__dot', '/');
  createDomElement(paginationTitle, 'span', 'pagination__num pagination__num-total', '3');
  const paginationButtons = createDomElement(garagePagination, 'div', 'pagination__buttons');
  createDomElement(paginationButtons, 'button', 'pagination__btn pagination__btn-prev', 'prev');
  createDomElement(paginationButtons, 'button', 'pagination__btn pagination__btn-next', 'next');

  createDomElement(garageWrapper, 'ul', 'track__items track');
  return garage;
}

export function renderCar(car: CreateCar) {
  const trackItem = document.createElement('li');
  trackItem.className = 'track__item';
  const trackInfo = createDomElement(trackItem, 'div', 'track__info');
  createDomElement(trackInfo, 'p', 'car__name', `${car.name}`);

  const infoButtons = createDomElement(trackInfo, 'div', 'info__buttons');
  createDomElement(infoButtons, 'button', `info__btn info__btn-edit`, 'Edit', [
    { key: 'id', value: `info__btn-edit-${car.id}` },
  ]);
  createDomElement(infoButtons, 'button', 'info__btn info__btn-delete', 'Delete', [
    { key: 'id', value: `info__btn-delete-${car.id}` },
  ]);

  const trackRoad = createDomElement(trackItem, 'div', 'track__road');
  createDomElement(trackRoad, 'button', 'road__btn road__btn-start', 'Start', [
    { key: 'id', value: `road__btn-start-${car.id}` },
    { key: `${car.isEngineStarted ? 'disabled' : 'start'}`, value: '' },
  ]);
  createDomElement(trackRoad, 'button', 'road__btn road__btn-stop', 'Stop', [
    { key: 'id', value: `road__btn-stop-${car.id}` },
    { key: `${!car.isEngineStarted ? 'disabled' : 'stop'}`, value: '' },
  ]);

  const trackAnimation = createDomElement(trackRoad, 'div', 'track__animation');
  trackAnimation.innerHTML = `${renderCarImg(car.color)}`;

  return trackItem;
}

export function renderCarImg(color: string) {
  return `<?xml version="1.0" encoding="iso-8859-1"?>
  <svg class="car__img" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     viewBox="0 0 512.001 512.001" xml:space="preserve">
  <path style="fill:${color};" d="M328.089,228.784c-6.84-7.89-70.373-41.549-92.537-47.828c-2.036-0.577-4.05,0.97-4.05,3.086v12.601
    c0,1.311,0.799,2.488,2.017,2.972c9.093,3.617,46.207,18.808,55.026,29.169L328.089,228.784L328.089,228.784z"/>
  <path style="opacity:0.2;fill:${color};enable-background:new    ;" d="M243.991,183.857c2.023,12.703,13.023,22.412,26.295,22.412
    c5.036,0,9.744-1.399,13.761-3.828C269.755,195.084,254.844,188.044,243.991,183.857z"/>
  <path style="fill:${color};" d="M160.764,230.611l8.636-29.231c1.51-5.111,6.389-8.469,11.703-8.052l0,0
    c5.871,0.46,10.401,5.359,10.401,11.249v24.386L160.764,230.611z"/>
  <path style="fill:${color};" d="M16.946,292.039L16.946,292.039c13.616,9.484,29.81,14.568,46.404,14.568h380.742
    c8.288,0,16.563-0.667,24.744-1.994l27.398-4.443c4.513-0.732,7.83-4.63,7.83-9.202v-17.949c0-5.445-2.893-10.481-7.599-13.223
    l-15.43-8.993c-28.237-16.456-60.333-25.127-93.014-25.127H287.016h-93.295c-4.989,0-9.951-0.726-14.731-2.154l-27.863-8.326
    c-16.045-4.795-33.176-4.553-49.08,0.692l0,0c-5.51,1.817-11.275,2.743-17.077,2.743H46.254c-26.36,0-37.948,21.981-37.948,40.069
    l-0.363,15.595C7.779,281.344,11.16,288.008,16.946,292.039z"/>
  <path style="fill:${color};" d="M281.74,234.421l-27.632,1.733c-3.178,0.199-5.924-2.194-6.163-5.368l-0.721-9.596
    c-0.299-3.989,3.424-7.082,7.291-6.055l27.865,7.4c1.849,0.491,3.183,2.098,3.326,4.005l0.23,3.061
    C286.124,232.097,284.237,234.264,281.74,234.421z"/>
  <path style="opacity:0.1;enable-background:new    ;" d="M95.869,240.613c-27.095,0-49.059,21.965-49.059,49.06
    c0,5.497,0.917,10.777,2.585,15.711c4.587,0.801,9.254,1.223,13.955,1.223h78.576c1.942-5.278,3.003-10.982,3.003-16.934
    C144.929,262.578,122.964,240.613,95.869,240.613z"/>
  <circle style="fill:${color};" cx="95.873" cy="289.671" r="41.502"/>
  <circle style="fill:${color};" cx="95.873" cy="289.671" r="18.639"/>
  <path style="opacity:0.1;enable-background:new    ;" d="M366.212,249.876l-13.154,12.168c-2.261,2.091-5.339,3.061-8.39,2.644
    L231.08,249.17c-0.897-0.123-0.821-1.443,0.085-1.462l133.101-2.662C366.825,244.995,368.092,248.137,366.212,249.876z"/>
  <path style="opacity:0.2;enable-background:new    ;" d="M482.227,285.415l-13.39,19.199l27.398-4.443
    c2.779-0.451,5.099-2.104,6.476-4.372l-12.359-11.288C487.926,282.296,484.106,282.721,482.227,285.415z"/>
  <path style="fill:${color};" d="M481.037,250.804c-12.52-7.296-25.8-13.054-39.551-17.212l18.826,25.858
    c2.66,3.655,7.44,5.074,11.663,3.463l18.04-6.877L481.037,250.804z"/>
  <g>
    <path style="opacity:0.2;fill:${color};enable-background:new    ;" d="M408.258,226.811c11.47,12.295,27.805,19.993,45.946,19.993
      c5.422,0,10.684-0.687,15.703-1.978C450.552,235.253,429.683,229.172,408.258,226.811z"/>
    <path style="opacity:0.2;fill:${color};enable-background:new    ;" d="M496.466,259.796l-12.144-7.078
      c-0.279,1.289-0.435,2.624-0.435,3.997c0,10.396,8.427,18.824,18.824,18.824c0.457,0,0.905-0.036,1.353-0.068v-2.451
      C504.064,267.574,501.171,262.538,496.466,259.796z"/>
    <path style="opacity:0.2;fill:${color};enable-background:new    ;" d="M151.128,215.197c-11.685-3.492-23.943-4.299-35.886-2.462
      c6.341,9.663,17.266,16.05,29.687,16.05c8.816,0,16.875-3.221,23.081-8.542L151.128,215.197z"/>
  </g>
  <path style="opacity:0.1;enable-background:new    ;" d="M406.207,240.613c-27.095,0-49.06,21.965-49.06,49.06
    c0,5.952,1.061,11.656,3.003,16.934h83.943c2.753,0,5.505-0.08,8.252-0.228c1.889-5.215,2.922-10.84,2.922-16.707
    C455.267,262.578,433.302,240.613,406.207,240.613z"/>
  <circle style="fill:${color};" cx="406.21" cy="289.671" r="41.502"/>
  <circle style="fill:${color};" cx="406.21" cy="289.671" r="18.639"/>
  <path style="opacity:0.1;enable-background:new    ;" d="M299.343,295.258H177.756c-4.384,0-7.936-3.553-7.936-7.936
    c0-4.383,3.552-7.936,7.936-7.936h121.587c4.384,0,7.936,3.553,7.936,7.936C307.28,291.704,303.726,295.258,299.343,295.258z"/>
  <path d="M500.462,252.939l-15.43-8.993c-29.418-17.145-62.963-26.206-97.011-26.206h-61.122
    c-17.991-12.235-68.389-38.53-89.184-44.421c-3.379-0.959-6.924-0.29-9.725,1.828c-2.77,2.095-4.425,5.42-4.425,8.893v12.601
    c0,4.588,2.756,8.649,7.02,10.347c2.386,0.949,6.715,2.702,11.926,4.943c-1.413,1.686-2.395,3.676-2.876,5.81h-40.193v-13.164
    c0-9.964-7.782-18.381-17.717-19.161c-9.007-0.706-17.38,5.065-19.933,13.714l-2.978,10.079l-5.411-1.617
    c-17.691-5.287-36.309-5.023-53.839,0.759c-4.716,1.556-9.625,2.344-14.591,2.344H46.255c-18.264,0-29.148,8.83-35.061,16.236
    c-6.86,8.593-10.802,20.131-10.824,31.673l-0.362,15.507c-0.225,9.738,4.411,18.874,12.403,24.44
    c12.004,8.362,25.883,13.613,40.385,15.342c8.488,15.037,24.609,25.218,43.073,25.218c18.196,0,34.116-9.889,42.699-24.567h224.941
    c8.583,14.678,24.503,24.567,42.698,24.567c18.23,0,34.174-9.925,42.746-24.649c7.081-0.213,14.177-0.883,21.154-2.015l27.399-4.442
    c8.4-1.363,14.495-8.527,14.495-17.036V273.02C512,264.781,507.579,257.087,500.462,252.939z M239.438,193.441v-2.825
    c14.177,5.273,37.81,16.848,56.516,27.125h-6.312c-1.453-1.339-3.229-2.346-5.224-2.875l-1.257-0.333
    C269.757,206.14,248.966,197.316,239.438,193.441z M269.228,227.254l-13.524,0.849l-0.34-4.53L269.228,227.254z M177.012,203.627
    c0.443-1.506,1.894-2.509,3.469-2.386c1.73,0.135,3.086,1.601,3.086,3.337v11.941c-0.771-0.185-1.543-0.371-2.305-0.599
    l-7.243-2.164L177.012,203.627z M95.869,323.237c-18.507,0-33.564-15.057-33.564-33.565c0-18.507,15.057-33.564,33.564-33.564
    c18.508,0,33.565,15.057,33.565,33.564C129.434,308.18,114.378,323.237,95.869,323.237z M406.207,323.237
    c-18.507,0-33.564-15.057-33.564-33.565c0-18.507,15.057-33.564,33.564-33.564c18.508,0,33.565,15.057,33.565,33.564
    C439.772,308.18,424.715,323.237,406.207,323.237z M496.128,290.969c0,0.683-0.49,1.258-1.164,1.367l-27.398,4.442
    c-4.193,0.68-8.433,1.162-12.684,1.476c0.491-2.789,0.761-5.654,0.761-8.582c0-27.26-22.178-49.437-49.438-49.437
    s-49.437,22.178-49.437,49.437c0,3.074,0.296,6.078,0.836,8.998H144.472c0.54-2.92,0.836-5.924,0.836-8.998
    c0-27.26-22.178-49.437-49.438-49.437s-49.437,22.178-49.437,49.437c0,2.418,0.183,4.794,0.52,7.121
    c-9.104-2.089-17.759-5.895-25.47-11.267c-3.612-2.515-5.708-6.645-5.605-11.047l0.364-15.595c0.001-0.061,0.002-0.124,0.002-0.185
    c0-11.113,6.273-32.132,30.012-32.132H84.97c6.658,0,13.24-1.057,19.562-3.143c14.433-4.761,29.76-4.978,44.324-0.624l27.862,8.326
    c5.521,1.65,11.241,2.487,17.004,2.487h46.677c1.489,6.062,6.993,10.489,13.345,10.489c0.286,0,0.572-0.008,0.861-0.026
    l27.632-1.734c3.341-0.21,6.393-1.715,8.591-4.24c1.158-1.329,1.994-2.855,2.499-4.488h94.694c31.242,0,62.025,8.315,89.019,24.048
    l15.43,8.993c2.257,1.315,3.658,3.754,3.658,6.366v17.949H496.128z M180.42,235.905h-21.19c-4.384,0-7.936,3.553-7.936,7.936
    c0,4.383,3.552,7.936,7.936,7.936h21.19c4.384,0,7.936-3.553,7.936-7.936C188.356,239.459,184.803,235.905,180.42,235.905z
     M95.869,263.097c-14.654,0-26.576,11.922-26.576,26.576s11.923,26.576,26.576,26.576s26.576-11.922,26.576-26.576
    C122.445,275.018,110.523,263.097,95.869,263.097z M95.869,300.375c-5.902,0-10.703-4.801-10.703-10.703
    c0-5.902,4.801-10.703,10.703-10.703c5.902,0,10.703,4.801,10.703,10.703C106.572,295.574,101.771,300.375,95.869,300.375z
     M406.207,263.097c-14.654,0-26.575,11.922-26.575,26.576s11.922,26.576,26.575,26.576c14.654,0,26.576-11.922,26.576-26.576
    C432.783,275.018,420.861,263.097,406.207,263.097z M406.207,300.375c-5.901,0-10.702-4.801-10.702-10.703
    c0-5.902,4.801-10.703,10.702-10.703c5.902,0,10.703,4.801,10.703,10.703C416.91,295.574,412.109,300.375,406.207,300.375z"/>
  </svg>`;
}
