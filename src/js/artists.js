const API_URL = 'https://sound-wave.b.goit.study/api/artists';

let currentPage = 1;
const limit = 8;

const artistsList = document.getElementById('artists-list');
const loadMoreBtn = document.getElementById('load-more');

// ===== Допоміжні утиліти для різних полів із БД =====
function normalizeName(a) {
  return a?.name || a?.strArtist || a?.artist || 'Unknown artist';
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

  if (!g) return 'Unknown';

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

  return 'Unknown';
}

function normalizeId(a) {
  return a?._id || a?.id || a?.artistId || '';
}

// ===== Рендер однієї картки =====
function renderArtistCard(artist) {
  const name = normalizeName(artist);
  const photo = normalizePhoto(artist);
  const desc = normalizeDescription(artist);
  const genres = normalizeGenres(artist);
  const id = normalizeId(artist);

  const shortDescription = desc
    ? desc.slice(0, 120) + (desc.length > 120 ? '...' : '')
    : 'No description available';

  return `
    <article class="artist-card">
      <div class="artist-image-wrap">
        <img src="${photo}" alt="${name}" class="artist-photo" loading="lazy" />
      </div>
      <div class="artist-content">
        <h3 class="artist-name">${name}</h3>
        <ul class="artist-genres">
  ${genres
    .split(',')
    .map(g => `<li class="artist-genre">${g.trim()}</li>`)
    .join('')}
</ul>
        <p class="artist-description">${shortDescription}</p>

        <button type="button" class="learn-more-btn" data-id="${id}">
  Learn More
  <svg class="btn-icon" width="16" height="16" aria-hidden="true">
    <use href="./img/sprite.svg#icon-caret-right"></use>
  </svg>
</button>
      </div>
    </article>
  `;
}

// ===== Завантаження й пагінація =====
async function fetchArtists(page = 1, limit = 8) {
  try {
    setLoading(true);

    const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error(`Failed to fetch artists: ${res.status}`);

    const data = await res.json();
    const list = Array.isArray(data?.artists) ? data.artists : [];

    artistsList.insertAdjacentHTML(
      'beforeend',
      list.map(renderArtistCard).join('')
    );

    const loadedSoFar = page * limit;
    if (list.length < limit || loadedSoFar >= Number(data?.totalArtists || 0)) {
      hideLoadMore();
    } else {
      setLoading(false);
    }
  } catch (err) {
    console.error(err);
    setLoading(false);
    alert('❌ Помилка завантаження артистів');
  }
}

function setLoading(isLoading) {
  if (!loadMoreBtn) return;
  const btnText = loadMoreBtn.querySelector('.btn-text');
  if (isLoading) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.add('is-loading');
    loadMoreBtn.setAttribute('aria-busy', 'true');
    btnText.textContent = 'Loading...';
  } else {
    loadMoreBtn.disabled = false;
    loadMoreBtn.classList.remove('is-loading');
    loadMoreBtn.removeAttribute('aria-busy');
    btnText.textContent = 'Load More';
  }
}

function hideLoadMore() {
  if (!loadMoreBtn) return;
  loadMoreBtn.style.display = 'none';
}

// Подія на кнопку
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    currentPage += 1;
    fetchArtists(currentPage, limit);
  });
}

// Перші 8 карток
fetchArtists(currentPage, limit);
