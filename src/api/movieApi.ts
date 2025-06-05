const API_KEY = '517b9460fda23963c4c1b93758486d8b';
const BASE_URL = 'https://api.themoviedb.org/3';

function buildUrl(path: string, params: Record<string, string | number>): string {
  const url = new URL(BASE_URL + path);
  url.searchParams.append('api_key', API_KEY);
  for (const key in params) {
    url.searchParams.append(key, String(params[key]));
  }
  return url.toString();
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface RawMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<TMDBResponse<RawMovie>> {
  const url = buildUrl('/search/movie', { query, page });
  return fetchJson<TMDBResponse<RawMovie>>(url);
}

export async function getPopularMovies(
  page: number = 1
): Promise<TMDBResponse<RawMovie>> {
  const url = buildUrl('/movie/popular', { page });
  return fetchJson<TMDBResponse<RawMovie>>(url);
}

export async function getTopRatedMovies(
  page: number = 1
): Promise<TMDBResponse<RawMovie>> {
  const url = buildUrl('/movie/top_rated', { page });
  return fetchJson<TMDBResponse<RawMovie>>(url);
}

export async function getUpcomingMovies(
  page: number = 1
): Promise<TMDBResponse<RawMovie>> {
  const url = buildUrl('/movie/upcoming', { page });
  return fetchJson<TMDBResponse<RawMovie>>(url);
}

export async function getMovieDetails(id: number): Promise<RawMovie> {
  const url = buildUrl(`/movie/${id}`, {});
  return fetchJson<RawMovie>(url);
}
