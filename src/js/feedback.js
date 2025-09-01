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
          return `<span class="custom-bullet ${className}" data-index="${index}"></span>`;
        }
        return '';
      },
    },
  });

  // ====== Логіка оновлення кастомних булітів ======
  swiper.on('slideChange', () => {
    const totalSlides = swiper.slides.length;
    const activeIndex = swiper.activeIndex;
    const bullets = document.querySelectorAll('.custom-bullet');

    bullets.forEach(b => b.classList.remove('swiper-pagination-bullet-active'));

    if (activeIndex === 0) {
      bullets[0].classList.add('swiper-pagination-bullet-active');
    } else if (activeIndex === totalSlides - 1) {
      bullets[2].classList.add('swiper-pagination-bullet-active');
    } else {
      bullets[1].classList.add('swiper-pagination-bullet-active');
    }
  });

  document.addEventListener('click', e => {
  const bullet = e.target.closest('.custom-bullet');
  if (!bullet) return;
  const totalSlides = swiper.slides.length;
  if (bullet.dataset.index === '0') {
    swiper.slideTo(0);
  } else if (bullet.dataset.index === '1') {
    if (totalSlides >= 5) {
      swiper.slideTo(4);
    } else {
      swiper.slideTo(totalSlides - 1);
    }
  } else if (bullet.dataset.index === '2') {
    swiper.slideTo(totalSlides - 1);
  }
  });
  // ==============================================

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
