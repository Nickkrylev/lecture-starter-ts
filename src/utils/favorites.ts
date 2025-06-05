const STORAGE_KEY = 'favoriteMovies';


export function getFavoriteIds(): Set<number> {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return new Set();
  try {
    const arr = JSON.parse(data) as number[];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

function saveFavoriteIds(favSet: Set<number>) {
  const arr = Array.from(favSet);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

export function addFavorite(id: number) {
  const fav = getFavoriteIds();
  fav.add(id);
  saveFavoriteIds(fav);
}


export function removeFavorite(id: number) {
  const fav = getFavoriteIds();
  fav.delete(id);
  saveFavoriteIds(fav);
}


export function toggleFavorite(id: number): boolean {
  const fav = getFavoriteIds();
  if (fav.has(id)) {
    fav.delete(id);
    saveFavoriteIds(fav);
    return false;
  } else {
    fav.add(id);
    saveFavoriteIds(fav);
    return true;
  }
}
