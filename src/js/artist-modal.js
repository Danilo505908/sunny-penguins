function formatDuration(ms) {
  if (!ms || isNaN(ms)) return '—';
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
}

const loaderOverlay = document.getElementById('loader-overlay');

async function renderArtistModal(artistId) {
  const modalWindow = document.querySelector('.modal_window');
  const modalContent = modalWindow.querySelector('.modal');
  const modalClose = modalWindow.querySelector('.modal_close');

  try {
    modalWindow.classList.remove('is_open');
    loaderOverlay.style.display = 'flex';

    const res = await fetch(
      `https://sound-wave.b.goit.study/api/artists/${artistId}/albums`
    );
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data = await res.json();

    const nameEl = modalWindow.querySelector('.modal_artist');
    const imgEl = modalWindow.querySelector('.modal_content img');
    const infoPs = modalWindow.querySelectorAll('.modal_basic_info li p');
    const bioEl = modalWindow.querySelector('.modal_text_biography');
    const genresList = modalWindow.querySelector('.genres');
    const albumsContainer = modalWindow.querySelector('.albums_info ul');

    nameEl.textContent = data.strArtist ?? 'Unknown artist';
    imgEl.src =
      data.strArtistThumb ||
      'https://via.placeholder.com/300x300?text=No+Image';
    imgEl.alt = data.strArtist ?? 'Artist';

    if (data.intFormedYear && data.intDiedYear) {
      infoPs[0].textContent = `${data.intFormedYear} - ${data.intDiedYear}`;
    } else if (data.intFormedYear) {
      infoPs[0].textContent = `${data.intFormedYear} - present`;
    } else {
      infoPs[0].textContent = 'information missing';
    }

    infoPs[1].textContent = data.strGender || 'Undefined';
    infoPs[2].textContent = data.intMembers || '?';
    infoPs[3].textContent = data.strCountry || 'Undefined';

    bioEl.textContent = data.strBiographyEN || 'No biography available.';

    genresList.innerHTML =
      Array.isArray(data.genres) && data.genres.length
        ? data.genres.map(g => `<li>${g}</li>`).join('')
        : '<li>Unknown</li>';

    albumsContainer.innerHTML = '';
    if (Array.isArray(data.albumsList) && data.albumsList.length) {
      data.albumsList.forEach(album => {
        const tracks = Array.isArray(album.tracks) ? album.tracks : [];
        const rows = tracks
          .map(track => {
            const playButton = track.movie
              ? `<a href="${track.movie}" target="_blank" rel="noopener noreferrer" class="play-svg-link">
                 <svg width="21" height="15">
                   <use href="../img/modal/modal-icons.svg#icon-play"></use>
                 </svg>
               </a>`
              : '';
            return `
            <tr>
              <td>${track.strTrack || ''}</td>
              <td>${formatDuration(Number(track.intDuration))}</td>
              <td>${playButton}</td>
            </tr>`;
          })
          .join('');

        const tableHTML = `
          <li>
            <table>
              <caption>${album.strAlbum || 'Album'}${
          album.intYearReleased ? ` (${album.intYearReleased})` : ''
        }</caption>
              <thead>
                <tr class="album_columns">
                  <th>Track</th>
                  <th>Time</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </li>`;
        albumsContainer.insertAdjacentHTML('beforeend', tableHTML);
      });
    } else {
      albumsContainer.innerHTML = '<li>No albums found</li>';
    }

    modalWindow.classList.add('is_open');
    document.body.style.overflow = 'hidden';

    function closeModal() {
      modalWindow.classList.remove('is_open');
      document.removeEventListener('keydown', onEscPress);
      modalWindow.removeEventListener('click', onBackdropClick);
      modalClose.removeEventListener('click', closeModal);
      document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);

    function onBackdropClick(e) {
      if (!modalContent.contains(e.target)) closeModal();
    }
    modalWindow.addEventListener('click', onBackdropClick);

    function onEscPress(e) {
      if (e.key === 'Escape') closeModal();
    }
    document.addEventListener('keydown', onEscPress);
  } catch (err) {
    console.error('Помилка при завантаженні артиста:', err);
  } finally {
    loaderOverlay.style.display = 'none';
  }
}
export { renderArtistModal };
/* Приклад виклику
document.addEventListener("DOMContentLoaded", () => {
  renderArtistModal("65ada227af9f6d155db46908");
});

/*
кнопка.addEventListener('click', () => {
  renderArtistModal("треба сюди передати айді"); 
});
*/
