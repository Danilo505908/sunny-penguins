import axios from 'axios';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'css-star-rating/css/star-rating.min.css';
import starSprite from '../img/star-rating.icons.svg?raw';

const SPRITE_MOUNT_ID = 'star-rating-sprite';
if (!document.getElementById(SPRITE_MOUNT_ID)) {
  const holder = document.createElement('div');
  holder.id = SPRITE_MOUNT_ID;
  holder.style.position = 'absolute';
  holder.style.width = '0';
  holder.style.height = '0';
  holder.style.overflow = 'hidden';
  holder.innerHTML = starSprite;
  document.body.prepend(holder);
}

const BASE_URL = 'https://sound-wave.b.goit.study/api/feedbacks';
const container = document.querySelector('.swiper-wrapper');
const loader = document.getElementById('loader');

let pageCounter = Number(localStorage.getItem('feedbackPage')) || 1;

function createStars(rating) {
  const rounded = Math.round(rating);
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < rounded;
    return `
      <svg class="star ${
        filled ? 'filled' : 'empty'
      }" aria-hidden="true" width="20" height="20">
        <use href="#star-filled"></use>
      </svg>
    `;
  }).join('');

  return `
    <div class="rating star-svg value-${rounded}" aria-label="Rating ${rounded} out of 5">
      <div class="star-container">${stars}</div>
    </div>
  `;
}

function createSlide(feedback) {
  return `
    <div class="swiper-slide">
      <div class="feedback-card">
        ${createStars(feedback.rating)}
        <p class="message-text">"${feedback.descr}"</p>
        <p class="message-person">${feedback.name}</p>
      </div>
    </div>
  `;
}

export async function fetchFeedbacks(page = 1, limit = 10) {
  loader.style.display = 'block';

  try {
    const { data } = await axios.get(BASE_URL, {
      params: { page, limit },
    });
    return data.data;
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load feedbacks',
    });
    return [];
  } finally {
    loader.style.display = 'none';
  }
}

async function renderFeedbacks() {
  const feedbacks = await fetchFeedbacks(pageCounter, 10);

  if (!feedbacks.length) {
    container.insertAdjacentHTML('beforeend', '<p>No feedbacks found.</p>');
    return;
  }

  container.innerHTML = feedbacks.map(createSlide).join('');

  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    autoHeight: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.message-cont .swiper-pagination',
      clickable: true,
      renderBullet: (index, className) => {
        if (index < 3) {
          return `<span class="${className}"></span>`;
        }
        return '';
      },
    },
  });

  swiper.on('slideChange', function () {
    const activeSlide = swiper.activeIndex + 1;
    let bulletIndex = 0;

    if (activeSlide >= 1 && activeSlide <= 4) bulletIndex = 0;
    else if (activeSlide >= 5 && activeSlide <= 9) bulletIndex = 1;
    else bulletIndex = 2;

    document
      .querySelectorAll('.swiper-pagination-bullet')
      .forEach(b => b.classList.remove('swiper-pagination-bullet-active'));

    const bullets = document.querySelectorAll('.swiper-pagination-bullet');
    if (bullets[bulletIndex]) {
      bullets[bulletIndex].classList.add('swiper-pagination-bullet-active');
    }
  });

  pageCounter++;
  if (pageCounter > 70) {
    pageCounter = 1;
  }
  localStorage.setItem('feedbackPage', pageCounter);
}

renderFeedbacks();

import mainSprite from '../img/sprite.svg?raw';

const ICON_SPRITE_MOUNT_ID = 'main-icon-sprite';
if (!document.getElementById(ICON_SPRITE_MOUNT_ID)) {
  const holder = document.createElement('div');
  holder.id = ICON_SPRITE_MOUNT_ID;
  holder.style.position = 'absolute';
  holder.style.width = '0';
  holder.style.height = '0';
  holder.style.overflow = 'hidden';
  holder.innerHTML = mainSprite;
  document.body.prepend(holder);
}
