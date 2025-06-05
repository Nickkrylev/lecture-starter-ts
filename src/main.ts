import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieDetails,
} from './api/movieApi';
import { getFavoriteIds } from './utils/favorites';
import { mapResultsToMovies } from './utils/mapper';
import { showMovieBanner } from './components/randomBanner';
import { Paginator } from './components/pagination';
import { initSearch } from './components/searchForm';
import { renderMovieCard } from './components/movieCard';

async function renderFavoritesInOffcanvas() {
  const favContainer = document.getElementById('favorite-movies') as HTMLElement;
  if (!favContainer) return;
  favContainer.innerHTML = ''; 

  const favIds = Array.from(getFavoriteIds());
  if (favIds.length === 0) {
    favContainer.textContent = 'No favorite movies found.';
    return;
  }

  
  for (const id of favIds) {
    try {
      const raw = await getMovieDetails(id);
      const movies = mapResultsToMovies([raw], new Set(favIds));
      const movie = movies[0];
      const cardEl = renderMovieCard(movie);
      favContainer.appendChild(cardEl);
    } catch (err) {
      console.error(`Ошибка загрузки фильма ${id}:`, err);
    }
  }
}

async function main() {
  const filmContainer = document.getElementById('film-container') as HTMLElement;
  const loadMoreBtn = document.getElementById('load-more') as HTMLButtonElement;
  const popularRadio = document.getElementById('popular') as HTMLInputElement;
  const upcomingRadio = document.getElementById('upcoming') as HTMLInputElement;
  const topRatedRadio = document.getElementById('top_rated') as HTMLInputElement;
  const offcanvasEl = document.getElementById('offcanvasRight') as HTMLElement;

  const paginator = new Paginator(filmContainer, loadMoreBtn, (page) =>
    getPopularMovies(page)
  );
  await paginator.init();
  try {
    const resp = await getPopularMovies(1);
    const favIds = getFavoriteIds();
    const mappedList = mapResultsToMovies(resp.results, favIds);
    const randomIndex = Math.floor(Math.random() * mappedList.length);
    showMovieBanner(mappedList[randomIndex]);
  } catch (err) {
    console.error('Ошибка при рендере начального баннера:', err);
  }


  if (popularRadio) {
    popularRadio.addEventListener('change', async () => {
      if (popularRadio.checked) {
        await paginator.switchFetchFn((page) => getPopularMovies(page));
      }
    });
  }
  if (upcomingRadio) {
    upcomingRadio.addEventListener('change', async () => {
      if (upcomingRadio.checked) {
        await paginator.switchFetchFn((page) => getUpcomingMovies(page));
      }
    });
  }
  if (topRatedRadio) {
    topRatedRadio.addEventListener('change', async () => {
      if (topRatedRadio.checked) {
        await paginator.switchFetchFn((page) => getTopRatedMovies(page));
      }
    });
  }


  initSearch(paginator);

  if (offcanvasEl) {
    offcanvasEl.addEventListener('show.bs.offcanvas', () => {
      renderFavoritesInOffcanvas();
    });
  }
}

main().catch((err) => console.error(err));
