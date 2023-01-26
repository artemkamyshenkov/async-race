import { CreateCar, Winners } from '@src/types/types';

const baseURL = 'http://127.0.0.1:3000';
const garage = `${baseURL}/garage`;
const engine = `${baseURL}/engine`;
const winners = `${baseURL}/winners`;

async function getCars(page: number, limit = 7) {
  const errHTML: HTMLElement | null = document.querySelector('.error__wrapper');
  try {
    if (errHTML) errHTML.style.display = 'none';
    const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
    return {
      items: await response.json(),
      count: response.headers.get('X-Total-Count'),
    };
  } catch (err) {
    if (errHTML) errHTML.style.display = 'block';
    console.log('Failed to connect');
  }
  return {
    items: [],
    count: 0,
  };
}

async function getCar(id: number) {
  const response = await fetch(`${garage}/${id}`);
  const item = response.json();
  return item;
}

async function createCar(body: CreateCar) {
  const response = await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const car = await response.json();
  return car;
}

async function deleteCar(id: number) {
  const response = await fetch(`${garage}/${id}`, {
    method: 'DELETE',
  });
  const deletedCar = response.json();
  return deletedCar;
}

async function updateCar(id: number, body: CreateCar) {
  const response = await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const updatedCar = response.json();
  return updatedCar;
}

async function startEngine(id: number) {
  const response = await fetch(`${engine}?id=${id}&status=started`, {
    method: 'PATCH',
  });
  const isStartted = response.json();
  return isStartted;
}

async function stopEngine(id: number) {
  const response = await fetch(`${engine}?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
  const isStopped = response.json();
  return isStopped;
}

async function driveCar(id: number) {
  const response = await fetch(`${engine}?id=${id}&status=drive`, {
    method: 'PATCH',
  }).catch();
  return response.status !== 200 ? { succees: false } : { ...(await response.json()) };
}

function getSortWinners(sort: string, order: string) {
  if (sort && order) {
    return `&_sort=${sort}&_order=${order}`;
  }
  return '';
}

async function getWinners(page: number, sort?: string, order?: string, limit = 10) {
  try {
    const response = await fetch(
      `${winners}?_page=${page}&_limit=${limit}${getSortWinners(sort as string, order as string)}`
    );
    const items = await response.json();
    return {
      items: await Promise.all(items.map(async (winner: Winners) => ({ ...winner, car: await getCar(winner.id) }))),
      count: response.headers.get('X-Total-Count'),
    };
  } catch (err) {
    console.log(err);
    return {
      items: [],
      count: 0,
    };
  }
}

async function getWinner(id: number) {
  const response = await fetch(`${winners}/${id}`);
  const item = await response.json();
  return item;
}

async function getWinnerStatus(id: number) {
  const response = await (await fetch(`${winners}/${id}`)).status;
  return response;
}

async function deleteWinner(id: number) {
  const response = await fetch(`${winners}/${id}`, {
    method: 'DELETE',
  });
  const item = response.json();
  return item;
}

async function createWinner(body: Winners) {
  const response = await fetch(`${winners}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const createdItem = response.json();
  return createdItem;
}

async function updateWinner(id: number, body: Winners) {
  const response = await fetch(`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const updatedItem = response.json();
  return updatedItem;
}

async function saveWinner(id: number, time: number) {
  const status = await getWinnerStatus(id);
  if (status === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
}
export {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
  startEngine,
  stopEngine,
  driveCar,
  getSortWinners,
  getWinners,
  getWinner,
  getWinnerStatus,
  deleteWinner,
  createWinner,
  saveWinner,
};
