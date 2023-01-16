import { RaceState } from '@src/types/types';

export function getDistanceRoad(elemA: HTMLElement, elemB: HTMLElement) {
  const positionElemA = getPositionElements(elemA);
  const positionElemB = getPositionElements(elemB);

  return Math.hypot(positionElemA.x - positionElemB.x, positionElemA.y - positionElemB.y);
}

export function animationRace(car: HTMLElement, distance: number, animationTime: number) {
  let start: number | null = null;
  const carHTML = car;
  const raceState: RaceState = {
    id: null,
  };

  function animationStep(timestamp: number) {
    if (!start) start = timestamp;
    const time: number = timestamp - start;
    const passed: number = Math.round(time * (distance / animationTime));

    if (carHTML) {
      carHTML.style.transform = `translateX(${Math.min(passed, distance)}px)`;
      carHTML.style.marginBottom = '-2rem';
    }

    if (passed < distance) {
      raceState.id = window.requestAnimationFrame(animationStep);
    }
  }
  raceState.id = window.requestAnimationFrame(animationStep);

  return raceState;
}

function getPositionElements(element: HTMLElement) {
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}
