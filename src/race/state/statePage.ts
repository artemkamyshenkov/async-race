import { getCars, getWinners } from '@src/api/api';

const { items: cars, count: carsCount } = await getCars(1);
const { items: winners, count: winnersCount } = await getWinners(1);

const state = {
  carsPage: 1,
  cars,
  carsCount,
  winnersPage: 1,
  winners,
  winnersCount,
  animation: {
    id: null,
  },
  view: 'garage',
  sortBy: null,
  sortOrder: null,
};

export default state;
