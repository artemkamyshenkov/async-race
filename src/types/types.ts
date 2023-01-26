export type AttributesElement = {
  key: string;
  value: string;
};

export type CreateCar = {
  id: number;
  name: string;
  color: string;
  isEngineStarted?: boolean;
};

export type Winners = {
  id: number;
  wins: number;
  time: number;
  car?: CreateCar;
};

export type RaceState = {
  id: number | null;
};

export type StatePage = {
  carsPage: number;
  cars: string[];
  carsCount: number | string | null;
  winnersPage: number;
  winners: string[];
  winnersCount: number | string | null;
  animation: {
    id: null | number;
  };
  view: string;
  sortBy: string | null;
  sortOrder: string | null;
};

export type PromisesCars = {
  success: boolean;
  id: number;
  time: number;
};

export type WinnerCar = {
  id: number;
  time: number;
};

export type Callback = (arg: number) => void;
