import { Movie } from '../models/movie';
import { mapResultsToMovies } from '../utils/mapper';
import { getFavoriteIds } from '../utils/favorites';
import { renderMovieCard } from './movieCard';

export type FetchFunction = (page: number) => Promise<{ results: any[]; total_pages: number }>;

export class Paginator {
  private container: HTMLElement;
  private loadMoreBtn: HTMLButtonElement;
  private fetchFn: FetchFunction;
  private currentPage = 1;
  private totalPages = 1;
  private favoriteIds: Set<number>;

  constructor(container: HTMLElement, loadMoreBtn: HTMLButtonElement, fetchFn: FetchFunction) {
    this.container = container;
    this.loadMoreBtn = loadMoreBtn;
    this.fetchFn = fetchFn;
    this.favoriteIds = getFavoriteIds();

    this.loadMoreBtn.addEventListener('click', () => this.loadNextPage());
  }

  async init() {
    this.currentPage = 1;
    this.container.innerHTML = '';
    await this.loadPage(1);
  }

  private async loadPage(page: number) {
    const data = await this.fetchFn(page);
    this.totalPages = data.total_pages;
    this.currentPage = page;

    
    this.favoriteIds = getFavoriteIds();
    const movies: Movie[] = mapResultsToMovies(data.results, this.favoriteIds);

    movies.forEach((movie) => {
      const cardEl = renderMovieCard(movie);
      this.container.appendChild(cardEl);
    });

    
    if (this.currentPage >= this.totalPages) {
      this.loadMoreBtn.style.display = 'none';
    } else {
      this.loadMoreBtn.style.display = '';
    }
  }

  private async loadNextPage() {
    if (this.currentPage < this.totalPages) {
      await this.loadPage(this.currentPage + 1);
    }
  }

  async switchFetchFn(newFetchFn: FetchFunction) {
    this.fetchFn = newFetchFn;
    await this.init();
  }
}
