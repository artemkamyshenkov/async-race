import '@src/index.css';
import '@src/assets/styles/normalize.css';
import garageCar from '@src/race/cars/cars';
import router from './router/router';
import createMainPage from './widgets/main/main';
import winnersTable from './race/winners/winnersTable';

createMainPage();
router();
winnersTable();
garageCar();
