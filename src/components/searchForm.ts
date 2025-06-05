import { Paginator, FetchFunction } from './pagination';
import { searchMovies } from '../api/movieApi';

export function initSearch(paginator: Paginator) {
  const inputEl = document.getElementById('search') as HTMLInputElement;
  const buttonEl = document.getElementById('search-submit') as HTMLButtonElement;
  if (!inputEl || !buttonEl) {
    throw new Error('Search input or button not found');
  }

  async function doSearch() {
    const query = inputEl.value.trim();
    if (!query) {
      alert('Пожалуйста, введите название фильма.');
      return;
    }
    const fetchFn: FetchFunction = (page) => searchMovies(query, page);
    await paginator.switchFetchFn(fetchFn);
  }

  buttonEl.addEventListener('click', () => {
    doSearch();
  });

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      doSearch();
    }
  });
}
