// src/js/artists.js
const API_URL = 'https://sound-wave.b.goit.study/api/artists';

import { renderArtistModal } from './artist-modal.js';
import sprite from '../img/sprite.svg?url';

let currentPage = 1;
const limit = 8;

const artistsList = document.getElementById('artists-list');
const loadMoreBtn = document.getElementById('load-more');

// =====  Порядок перших 8 карток  =====
const desiredOrder = [
  'Ren',
  'Unlike Pluto',
  'Sleepy Hallow',
  'Samara Cyn',
  'Olver Tree',
  'Logic',
  'Mother Mother',
  'Livingston',
];

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

function normalizeGenres(a) {
  const g = a?.genres;
  if (!g) return '';
  if (Array.isArray(g) && g.every(x => typeof x === 'string')) {
    return g.join(', ');
  }
  if (Array.isArray(g) && g.length && typeof g[0] === 'object') {
    return g
      .map(x => x?.name || x?.title || x?.label || '')
      .filter(Boolean)
      .join(', ');
  }
  if (typeof g === 'string') return g;
  return '';
}

function normalizeId(a) {
  return a?._id || a?.id || a?.artistId || '';
}

function attachLearnMoreHandlers(root = document) {
  const buttons = root.querySelectorAll('.learn-more-btn');
  buttons.forEach(btn => {
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
  const genresStr = normalizeGenres(artist);
  const id = normalizeId(artist);

  const shortDescription = desc
    ? desc.slice(0, 120) + (desc.length > 120 ? '...' : '')
    : 'No description available';

  const genresArr = genresStr
    ? genresStr
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
    : [];
  const genreItems = genresArr
    .slice(0, 4)
    .map(g => `<li class="artist-genre">${g}</li>`)
    .join('');

  return `
    <article class="artist-card" data-artist-id="${id}">
      <div class="artist-image-wrap">
        <img src="${photo}" alt="${escapeHtml(
    name
  )}" class="artist-photo" loading="lazy" />
      </div>

      <div class="artist-content">
        <h3 class="artist-name">${escapeHtml(name)}</h3>

        <ul class="artist-genres">
          ${genreItems}
        </ul>

        <p class="artist-description">${escapeHtml(shortDescription)}</p>

        <button type="button" class="learn-more-btn" data-id="${id}">
          <span class="btn-text">Learn More</span>
          <svg class="btn-icon" width="16" height="16" aria-hidden="true">
  <use href="${sprite}#icon-caret-right"></use>
</svg>
        </button>
      </div>
    </article>
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

    // ===== DEBUG: покажемо у консолі що прийшло
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

    if (page === 1) {
      const orderMap = new Map(
        desiredOrder.map((n, i) => [n.trim().toLowerCase(), i])
      );
      list.sort((a, b) => {
        const ai = orderMap.has(normalizeName(a).toLowerCase())
          ? orderMap.get(normalizeName(a).toLowerCase())
          : Number.MAX_SAFE_INTEGER;
        const bi = orderMap.has(normalizeName(b).toLowerCase())
          ? orderMap.get(normalizeName(b).toLowerCase())
          : Number.MAX_SAFE_INTEGER;
        return ai - bi;
      });
      console.log(
        'After sort (page 1):',
        list.map(a => normalizeName(a))
      );
    }

    artistsList.insertAdjacentHTML(
      'beforeend',
      list.map(renderArtistCard).join('')
    );

    document.querySelectorAll('.learn-more-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        renderArtistModal(id);
      });
    });

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
function setLoading(isLoading) {
  if (!loadMoreBtn) return;
  const btnText = loadMoreBtn.querySelector('.btn-text');

  if (isLoading) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.add('is-loading');
    loadMoreBtn.setAttribute('aria-busy', 'true');
    if (btnText) btnText.textContent = 'Loading...';
  } else {
    loadMoreBtn.disabled = false;
    loadMoreBtn.classList.remove('is-loading');
    loadMoreBtn.removeAttribute('aria-busy');
    if (btnText) btnText.textContent = 'Load More';
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

fetchArtists(currentPage, limit);
