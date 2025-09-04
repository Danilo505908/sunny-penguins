const API_URL = 'https://sound-wave.b.goit.study/api/artists';

import { renderArtistModal } from './artist-modal.js';
import sprite from '../img/sprite.svg?url';

let currentPage = 1;
const limit = 8;

const artistsList = document.getElementById('artists-list');
const loadMoreBtn = document.getElementById('load-more');

// ===== Утиліти нормалізації полів =====
function normalizeName(a) {
  return (a?.name || a?.strArtist || a?.artist || 'Unknown artist').trim();
}

function normalizePhoto(a) {
  const src =
    a?.photo || a?.photo_url || a?.strArtistThumb || a?.image || a?.img || '';

  if (!src) return 'https://via.placeholder.com/600x400?text=No+Image';

  if (typeof src === 'string' && src.startsWith('/')) {
    return `https://sound-wave.b.goit.study${src}`;
  }
  return src;
}

function normalizeDescription(a) {
  return a?.description || a?.bio || a?.biography || a?.strBiographyEN || '';
}

function normalizeId(a) {
  return a?._id || a?.id || a?.artistId || '';
}

// ===== Утиліта нормалізації жанрів  =====
function normalizeGenres(a) {
  const g = a?.genres;
  if (!g) return [];

  let arr = [];

  if (Array.isArray(g)) {
    g.forEach(x => {
      if (typeof x === 'string') {
        arr.push(
          ...x
            .split(/[\/,]/)
            .map(s => s.trim())
            .filter(Boolean)
        );
      } else if (typeof x === 'object' && x !== null) {
        const name = x?.name || x?.title || x?.label;
        if (name)
          arr.push(
            ...name
              .split(/[\/,]/)
              .map(s => s.trim())
              .filter(Boolean)
          );
      }
    });
  } else if (typeof g === 'string') {
    arr.push(
      ...g
        .split(/[\/,]/)
        .map(s => s.trim())
        .filter(Boolean)
    );
  }

  return [...new Set(arr)];
}

// ===== Кнопки Learn More =====
function attachLearnMoreHandlers(root = document) {
  root.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.removeEventListener('click', onLearnMoreClick);
    btn.addEventListener('click', onLearnMoreClick);
  });
}
function onLearnMoreClick(e) {
  const id = e.currentTarget?.dataset?.id;
  if (!id) return;
  if (typeof renderArtistModal === 'function') {
    renderArtistModal(id);
  } else {
    console.warn(
      'renderArtistModal not found. Modal handler is not loaded yet. ID:',
      id
    );
  }
}

// =====  Рендер однієї картки  =====
function renderArtistCard(artist) {
  const name = normalizeName(artist);
  const photo = normalizePhoto(artist);
  const desc = normalizeDescription(artist);
  const genresArr = normalizeGenres(artist);
  const id = normalizeId(artist);

  const genreItems = genresArr
    .map(g => `<li class="artist-genre">${escapeHtml(g)}</li>`)
    .join('');

  const shortDescription = desc
    ? desc.slice(0, 120) + (desc.length > 120 ? '...' : '')
    : 'No description available';

  return `
    <li  class="artist-card" data-artist-id="${escapeHtml(id)}">
      <div class="artist-image-wrap">
        <img src="${escapeHtml(photo)}" alt="${escapeHtml(
    name
  )}" class="artist-photo" loading="lazy" />
      </div>

      <div class="artist-content">
        <h3 class="artist-name">${escapeHtml(name)}</h3>

        <ul class="artist-genres">
          ${genreItems}
        </ul>

        <p class="artist-description">${escapeHtml(shortDescription)}</p>

        <button type="button" class="learn-more-btn" data-id="${escapeHtml(
          id
        )}">
          <span class="btn-text">Learn More</span>
          <svg class="btn-icon" width="16" height="16" aria-hidden="true">
  <use href="${sprite}#icon-caret-right"></use>
</svg>
        </button>
      </div>
    </li>
  `;
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// ===== Завантаження й пагінація =====
async function fetchArtists(page = 1, limit = 8) {
  try {
    setLoading(true);

    const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error(`Failed to fetch artists: ${res.status}`);

    const data = await res.json();

    const incoming = Array.isArray(data?.artists) ? data.artists : [];
    console.log(`Fetched page ${page}, items:`, incoming.length);
    console.log(
      'Fetched names (raw):',
      incoming.map(a => normalizeName(a))
    );
    console.log(
      'Fetched genres (raw):',
      incoming.map(a => normalizeGenres(a))
    );

    let list = incoming.slice();

    artistsList.insertAdjacentHTML(
      'beforeend',
      list.map(renderArtistCard).join('')
    );

    attachLearnMoreHandlers(artistsList);

    const loadedSoFar = page * limit;
    if (list.length < limit || loadedSoFar >= Number(data?.totalArtists || 0)) {
      hideLoadMore();
    } else {
      setLoading(false);
    }
  } catch (err) {
    console.error(err);
    setLoading(false);
    alert('❌ Помилка завантаження артистів — перевір консоль.');
  }
}

// ===== Лоадер на кнопці =====
const sectionLoader = document.getElementById('artists-loader');

function setLoading(isLoading) {
  if (!loadMoreBtn) return;
  const btnText = loadMoreBtn.querySelector('.btn-text');

  if (isLoading) {
    // кнопка
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.add('is-loading');
    loadMoreBtn.setAttribute('aria-busy', 'true');
    if (btnText) btnText.textContent = 'Loading...';

    // секційний loader
    if (sectionLoader) sectionLoader.hidden = false;
  } else {
    loadMoreBtn.disabled = false;
    loadMoreBtn.classList.remove('is-loading');
    loadMoreBtn.removeAttribute('aria-busy');
    if (btnText) btnText.textContent = 'Load More';

    if (sectionLoader) sectionLoader.hidden = true;
  }
}

function hideLoadMore() {
  if (!loadMoreBtn) return;
  loadMoreBtn.style.display = 'none';
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    currentPage += 1;
    fetchArtists(currentPage, limit);
  });
}

// Початкове завантаження
fetchArtists(currentPage, limit);
