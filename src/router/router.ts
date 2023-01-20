import '@src/index.css';
import '@src/assets/styles/normalize.css';
import { createBrowserHistory } from 'history';
import type { Location } from 'history';
import renderCars from '@src/race/cars/cars';
import { renderWinners } from '@src/race/winners/winnersTable';
import { updateWinnersState } from '@src/race/state/updateState';
import paginationWinners from '@src/race/pagination/paginationWinners';
import sortWinners from '@src/race/winners/winnersSort';
import { garagePage } from '@src/pages/garage/garage';
import winnersPage from '../pages/winners/winners';

export default function router() {
  const history = createBrowserHistory();

  function routePage() {
    const btnWinners = document.querySelector('.btn__winners');
    const btnGarage = document.querySelector('.btn__garage');

    btnWinners?.addEventListener('click', async () => {
      history.push('/winners');
      await updateWinnersState();
      renderWinners();
      paginationWinners();
      sortWinners();
    });

    btnGarage?.addEventListener('click', () => {
      history.push('/');
      renderCars();
    });
  }

  const PATHS = {
    root: '/',
    winners: '/winners',
  };

  const ROUTES: Record<(typeof PATHS)[keyof typeof PATHS], (location: Location) => HTMLElement> = {
    [PATHS.root]: garagePage,
    [PATHS.winners]: winnersPage,
  };

  function processRoutes(location: Location) {
    const contentContainerHTML = document.querySelector('.content');
    const route = ROUTES[location.pathname];
    if (route) {
      if (contentContainerHTML) contentContainerHTML.innerHTML = '';
      contentContainerHTML?.append(route(location));
    }
  }
  routePage();
  history.listen(({ location }) => {
    processRoutes(location);
  });

  processRoutes(history.location);
}
