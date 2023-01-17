import '@src/index.css';
import '@src/assets/styles/normalize.css';
import garageCar from '@src/race/cars/cars';
import router from './router/router';
import createMainPage from './widgets/main/main';
import winnersTable from './race/winners/winnersTable';
import race from './race/cars/race';

createMainPage();
router(); // TODO: исправить рендер без работы сервера
winnersTable();
garageCar();
race();
