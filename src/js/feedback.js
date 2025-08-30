
import axios from 'axios';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://sound-wave.b.goit.study/api/feedbacks';


const container = document.querySelector('.swiper-wrapper');
const loader = document.getElementById('loader');

export async function fetchFeedbacks() {
  try {
    const { data }  = await axios.get(BASE_URL);
    console.log('API response:', data); 

    return data.data; 
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load feedbacks',
    });
    return [];
  }
}

function createSlide(feedback) {
  const rounded = Math.round(feedback.rating);

  return `
    <div class="swiper-slide">
      <div class="feedback-card">
        <div class="rating-stars">
          ${Array.from({ length: 5 }, (_, i) =>
            `<svg class="star ${i < rounded ? 'filled' : 'empty'}" width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
               <path d="M9.07088 0.612343C9.41462 -0.204115 10.5854 -0.204114 10.9291 0.612346L12.9579 5.43123C13.1029 5.77543 13.4306 6.01061 13.8067 6.0404L19.0727 6.45748C19.9649 6.52814 20.3267 7.62813 19.6469 8.2034L15.6348 11.5987C15.3482 11.8412 15.223 12.2218 15.3106 12.5843L16.5363 17.661C16.744 18.5211 15.7969 19.201 15.033 18.7401L10.5245 16.0196C10.2025 15.8252 9.7975 15.8252 9.47548 16.0196L4.96699 18.7401C4.20311 19.201 3.25596 18.5211 3.46363 17.661L4.68942 12.5843C4.77698 12.2218 4.65182 11.8412 4.36526 11.5987L0.353062 8.2034C-0.326718 7.62813 0.0350679 6.52814 0.927291 6.45748L6.19336 6.0404C6.5695 6.01061 6.89716 5.77543 7.04207 5.43123L9.07088 0.612343Z" fill="currentColor"/>
            </svg>`
          ).join('')}
        </div>
        <p class="feedback-text">"${feedback.descr}"</p>
        <p class="feedback-author">${feedback.name}</p>
      </div>
    </div>
  `;
}

async function renderFeedbacks() {
  const feedbacks = await fetchFeedbacks();

  if (!feedbacks.length) {
    container.insertAdjacentHTML('beforeend', '<p>No feedbacks found.</p>');
    return;
  }

  const slidesMarkup = feedbacks
    .slice(0, 10)
    .map(createSlide)
    .join('');
  container.innerHTML = slidesMarkup;

  new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: (index, className) => {
        if (index === 0) return `<span class="${className}">First</span>`;
        if (index === feedbacks.length - 1) return `<span class="${className}">Last</span>`;
        return `<span class="${className}">•</span>`;
      },
    },
  });
}

renderFeedbacks();
  
  