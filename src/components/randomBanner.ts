import { Movie } from '../models/movie';


export function showMovieBanner(movie: Movie): void {
  const bannerSection = document.getElementById('random-movie') as HTMLElement;
  if (!bannerSection) return;

  if (movie.posterUrl) {
    bannerSection.style.backgroundImage = `url(${movie.posterUrl})`;
    bannerSection.style.backgroundSize = 'cover';
    bannerSection.style.backgroundPosition = 'center';
  } else {
    bannerSection.style.backgroundImage = '';
    bannerSection.style.backgroundColor = '#333';
  }

 
  const titleEl = document.getElementById('random-movie-name') as HTMLHeadingElement;
  const descEl = document.getElementById('random-movie-description') as HTMLParagraphElement;

  if (titleEl) {
    titleEl.textContent = movie.title;
  }
  if (descEl) {

    const fullOverview = movie.overview;
    if (fullOverview.length > 700) {
      descEl.textContent = fullOverview.slice(0, 700) + '…';
    } else {
      descEl.textContent = fullOverview;
    }
  }
}
