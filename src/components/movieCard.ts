import { Movie } from '../models/movie';
import { toggleFavorite } from '../utils/favorites';
import { createElement } from '../utils/domHelpers';
import { showMovieBanner } from './randomBanner';

export function renderMovieCard(movie: Movie): HTMLElement {
  const colDiv = createElement('div', ['col-lg-3', 'col-md-4', 'col-12', 'p-2']);

  const cardDiv = createElement('div', ['card', 'shadow-sm', 'position-relative']);
  cardDiv.style.cursor = 'pointer';


  const img = document.createElement('img');
  img.src = movie.posterUrl;
  img.alt = movie.title;
  img.classList.add('card-img-top');

  const svgHeart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgHeart.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgHeart.setAttribute('width', '40');       
  svgHeart.setAttribute('height', '40');
  svgHeart.setAttribute('viewBox', '0 -2 18 22');
  svgHeart.classList.add('bi', 'bi-heart-fill', 'position-absolute', 'p-1');
  svgHeart.setAttribute('stroke', 'red');
  svgHeart.setAttribute('fill', movie.isFavorite ? 'red' : '#ff000078');
  svgHeart.style.top = '8px';     
  svgHeart.style.right = '8px';
  svgHeart.style.cursor = 'pointer';
  svgHeart.style.zIndex = '2';     

  svgHeart.innerHTML = `
    <path fill-rule="evenodd"
      d="M8 1.314C12.438-3.248 23.534 4.735 8 15
         -7.534 4.736 3.562-3.248 8 1.314z"
    />
  `;
  svgHeart.addEventListener('click', (evt) => {
    evt.stopPropagation(); 
    const nowFav = toggleFavorite(movie.id);
    if (nowFav) {
      svgHeart.setAttribute('fill', 'red');
    } else {
      svgHeart.setAttribute('fill', '#ff000078');
    }
  });
  const bodyDiv = createElement('div', ['card-body']);
  const descP = createElement('p', ['card-text'], movie.overview);
if (movie.overview.length > 100) {
    descP.textContent = movie.overview.slice(0, 100) + '…';
  }
  const infoWrap = createElement('div', ['d-flex', 'justify-content-between', 'align-items-center']);
  const dateText = createElement('small', ['text-muted'], movie.releaseDate);
  infoWrap.appendChild(dateText);
  bodyDiv.appendChild(descP);
  bodyDiv.appendChild(infoWrap);


  cardDiv.appendChild(img);
  cardDiv.appendChild(svgHeart);
  cardDiv.appendChild(bodyDiv);
  colDiv.appendChild(cardDiv);

  cardDiv.addEventListener('click', () => {
    showMovieBanner(movie);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return colDiv;
}
