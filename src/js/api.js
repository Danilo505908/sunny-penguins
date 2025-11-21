// CRC/JS/api.js
// Единая обёртка над REST API проекта.
// Возвращает стабильные структуры, не бросает исключений наружу.
// Совместимо с artists/features/api.js

import axios from "axios";
import localArtists from "../data/artists.json";

/* =========================
   ENV / ЛОГИРОВАНИЕ
   ========================= */
const IS_DEV =
  /localhost|127\.0\.0\.1/.test(location.hostname) ||
  (document.documentElement.getAttribute("data-env") || "").toLowerCase() === "dev";

const logWarn = (...args) => { if (IS_DEV) console.warn(...args); };

/* =========================
   BASE URL (с возможностью переопределить)
   ========================= */
// приоритет: <html data-api="..."> → VITE_API_BASE → дефолт
// Для стабильной работы на удалённых хостингах НЕ полагаемся на внешний API,
// а используем локальные JSON‑данные (artists.json). Поэтому BASE сейчас
// нужен только как часть совместимости с остальным кодом.
const DEFAULT_API_DEV = "";
const DEFAULT_API_PROD = "";

const API_BASE =
  document.documentElement.getAttribute("data-api") ||
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE) ||
  (IS_DEV ? DEFAULT_API_DEV : DEFAULT_API_PROD);

/* =========================
   AXIOS ИНСТАНС
   ========================= */
const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { "Accept": "application/json" },
});

// перехватчик ответов — ничего «магического» не делаем, только единый warn в DEV
api.interceptors.response.use(
  (res) => res,
  (err) => {
    logWarn("[api] HTTP error:", err?.message || err);
    return Promise.reject(err);
  }
);

/* =========================
   ХЕЛПЕРЫ
   ========================= */
function toastError(msg) {
  try { window.__toast?.error(msg); } catch {}
}

// безопасная нормализация любого значения в число (с минимумом)
function clampNumber(v, min, fallback) {
  const n = Number(v);
  return Number.isFinite(n) ? Math.max(min, n) : fallback;
}

/* =========================
   API ФУНКЦИИ
   ========================= */

/**
 * Список артистов
 * @param {{page?:number,limit?:number,genre?:string,sort?:'asc'|'desc'|'',name?:string}} params
 * @returns {Promise<{artists:Array,totalArtists:number,page:number,limit:number}>}
 */
export async function fetchArtists(
  { page = 1, limit = 8, genre = "", sort = "", name = "" } = {}
) {
  // Полностью локальная реализация — без сетевых запросов.
  const list = Array.isArray(localArtists) ? localArtists : [];

  let filtered = list.slice();

  const g = String(genre || "").trim();
  if (g && g !== "All Genres") {
    filtered = filtered.filter((a) =>
      Array.isArray(a.genres) ? a.genres.includes(g) : a.genre === g
    );
  }

  const n = String(name || "").trim().toLowerCase();
  if (n) {
    filtered = filtered.filter((a) =>
      String(a.name || a.strArtist || "").toLowerCase().includes(n)
    );
  }

  const s = String(sort || "").toLowerCase();
  if (s === "asc" || s === "desc") {
    filtered.sort((a, b) => {
      const an = String(a.name || "").toLowerCase();
      const bn = String(b.name || "").toLowerCase();
      if (an < bn) return s === "asc" ? -1 : 1;
      if (an > bn) return s === "asc" ? 1 : -1;
      return 0;
    });
  }

  const safeLimit = clampNumber(limit, 1, 8);
  const currentPage = clampNumber(page, 1, 1);
  const start = (currentPage - 1) * safeLimit;
  const pageItems = filtered.slice(start, start + safeLimit);

  return {
    artists: pageItems,
    totalArtists: filtered.length,
    page: currentPage,
    limit: safeLimit,
  };
}

/* ----- кэш жанров (in-memory) на короткое время ----- */
let _genresCache = { ts: 0, list: [] };
const GENRES_TTL = 5 * 60 * 1000; // 5 минут

/**
 * Список жанров
 * @returns {Promise<string[]>} — массив имён жанров (включая "All Genres" первым)
 */
export async function fetchGenres() {
  const now = Date.now();
  if (_genresCache.list.length && now - _genresCache.ts < GENRES_TTL) {
    return _genresCache.list.slice(); // отдаём копию
  }

  const base = Array.isArray(localArtists) ? localArtists : [];
  const all = base.flatMap((a) =>
    Array.isArray(a.genres) ? a.genres : a.genre ? [a.genre] : []
  );
  const uniq = [...new Set(all.filter(Boolean))];
  const out = ["All Genres", ...uniq];

  _genresCache = { ts: now, list: out };
  return out;
}

/**
 * Один артист
 * @param {string|number} id
 * @returns {Promise<Object|null>}
 */
export async function fetchArtist(id) {
  if (!id && id !== 0) return null;
  const list = Array.isArray(localArtists) ? localArtists : [];
  const found =
    list.find(
      (a) =>
        String(a.id) === String(id) ||
        String(a.idArtist) === String(id) ||
        String(a._id) === String(id)
    ) || null;
  return found;
}

/**
 * Альбомы артиста (каждый альбом может содержать массив треков)
 * @param {string|number} id
 * @returns {Promise<Array>}
 */
export async function fetchArtistAlbums(id) {
  // В локальном режиме альбомы не подгружаем снаружи.
  // Можно расширить later, если добавим локальный JSON с альбомами.
  return [];
}

/* =========================
   Доп. экспорт при необходимости
   ========================= */
export { api, API_BASE, IS_DEV };
