const API_URL = 'https://sound-wave.b.goit.study/api/artists';

let currentPage = 1;
const limit = 8;

const artistsList = document.getElementById('artists-list');
const loadMoreBtn = document.getElementById('load-more');

async function fetchArtists(page = 1, limit = 8) {
  try {
    loadMoreBtn.textContent = 'Loading...';

    const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch artists');

    const data = await res.json();
    console.log('API response:', data);

    if (Array.isArray(data.artists)) {
      renderArtists(data.artists);

      if (data.artists.length < limit || page * limit >= data.totalArtists) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.textContent = 'Load More';
      }
    } else {
      console.error('Unexpected API structure:', data);
    }
  } catch (err) {
    console.error(err);
    alert('❌ Помилка завантаження артистів');
  }
}

function renderArtists(artists) {
  artists.forEach(artist => {
    const card = document.createElement('div');
    card.classList.add('artist-card');

    card.innerHTML = `
      <img src="${artist.photo}" alt="${artist.name}" class="artist-photo" />
      <div class="artist-content">
        <h3 class="artist-name">${artist.name}</h3>
        <p class="artist-genres">${artist.genres.join(', ')}</p>
        <p class="artist-description">${
          artist.description || 'No description available'
        }</p>
      </div>
    `;

    artistsList.appendChild(card);
  });
}

loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  fetchArtists(currentPage, limit);
});

// Стартове завантаження
fetchArtists(currentPage, limit);
