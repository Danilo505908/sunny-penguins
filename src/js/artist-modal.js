// ===== Форматування мілісекунд у хв:сек =====
function formatDuration(ms) {
  if (!ms || isNaN(ms)) return "—";
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// ===== Екранування HTML, щоб уникнути XSS =====
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ===== Основна функція для рендеру модального вікна =====
async function renderArtistModal(artistId) {
  try {
    const res = await fetch(`https://sound-wave.b.goit.study/api/artists/${artistId}/albums`);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data = await res.json();

    const modalClose = document.querySelector(".modal_close");
    const modalWindow = document.querySelector(".modal_window")
    const nameEl = document.querySelector(".modal_artist");
    const imgEl = document.querySelector(".modal_content img");
    const infoPs = document.querySelectorAll(".modal_basic_info li p");
    const bioEl = document.querySelector(".modal_text_biography");
    const genresList = document.querySelector(".genres");
    const albumsContainer = document.querySelector(".albums_info ul");

    // ===== Закриття модалки =====
    function closeModal(e) {
      e.preventDefault();
      modalWindow.classList.remove("is-open");
      modalWindow.remove();
      modalClose.removeEventListener("click", closeModal);
    }
    modalClose.addEventListener("click", closeModal);

    // ===== Основна інформація =====
    nameEl.textContent = data.strArtist ?? "Unknown artist";
    imgEl.src = data.strArtistThumb || "https://via.placeholder.com/300x300?text=No+Image";
    imgEl.alt = data.strArtist ?? "Artist";

    // ===== Роки існування =====
    if (data.intFormedYear && data.intDiedYear) {
      infoPs[0].textContent = `${data.intFormedYear} - ${data.intDiedYear}`;
    } else if (data.intFormedYear && !data.intDiedYear) {
      infoPs[0].textContent = `${data.intFormedYear} - present`;
    } else {
      infoPs[0].textContent = "information missing";
    }

    infoPs[1].textContent = data.strGender || "Undefined";
    infoPs[2].textContent = data.intMembers || "?";
    infoPs[3].textContent = data.strCountry || "Undefined";

    bioEl.textContent = data.strBiographyEN || "No biography available.";

    // ===== Жанри =====
    genresList.innerHTML = Array.isArray(data.genres) && data.genres.length
      ? data.genres.map(g => `<li>${escapeHtml(g)}</li>`).join("")
      : "<li>Unknown</li>";

    // ===== Альбоми =====
    albumsContainer.innerHTML = "";
    if (Array.isArray(data.albumsList) && data.albumsList.length) {
      data.albumsList.forEach(album => {
        const tracks = Array.isArray(album.tracks) ? album.tracks : [];
        const rows = tracks.map(track => {
          const playButton = track.movie
            ? `<a href="${track.movie}" target="_blank" rel="noopener noreferrer" class="play-svg-link">
                 <svg width="21" height="15">
                   <use href="../img/modal/modal-icons.svg#icon-play"></use>
                 </svg>
               </a>`
            : "";

          return `
            <tr>
              <td>${escapeHtml(track.strTrack || "")}</td>
              <td>${formatDuration(Number(track.intDuration))}</td>
              <td>${playButton}</td>
            </tr>
          `;
        }).join("");

        const tableHTML = `
          <li>
            <table>
              <caption>${escapeHtml(album.strAlbum || "Album")}${album.intYearReleased ? ` (${album.intYearReleased})` : ""}</caption>
              <thead>
                <tr class="album_columns">
                  <th>Track</th>
                  <th>Time</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </li>
        `;
        albumsContainer.insertAdjacentHTML("beforeend", tableHTML);
      });
    } else {
      albumsContainer.innerHTML = "<li>No albums found</li>";
    }

  } catch (err) {
    console.error("Помилка при завантаженні артиста:", err);
  }
}

// ===== Виклик функції це просто приклад для наочності =====
document.addEventListener("DOMContentLoaded", () => {
  renderArtistModal("65ada227af9f6d155db46908"); // замінити на потрібний ID артиста
});

/*
кнопка.addEventListener('click', () => {
  renderArtistModal("треба сюди передати айді"); 
*/