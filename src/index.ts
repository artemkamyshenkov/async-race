import '@src/index.css';
import '@src/assets/styles/normalize.css';
import router from './router/router';
import createMainPage from './widgets/main/main';
import startRace from './race/race';

createMainPage();
router();
startRace();
