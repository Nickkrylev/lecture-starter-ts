import { RawMovie } from '../api/movieApi';
import { Movie } from '../models/movie';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/original'; 


export function mapRawToMovie(raw: RawMovie, isFav: boolean): Movie {
  return {
    id: raw.id,
    title: raw.title,
    overview: raw.overview,
    posterUrl: raw.poster_path ? IMAGE_BASE + raw.poster_path : '',
    releaseDate: raw.release_date,
    rating: raw.vote_average,
    isFavorite: isFav,
  };
}

export function mapResultsToMovies(
  rawList: RawMovie[],
  favoriteIds: Set<number>
): Movie[] {
  return rawList.map((raw) => mapRawToMovie(raw, favoriteIds.has(raw.id)));
}
