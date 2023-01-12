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
