async function renderFeedbacks() {
  const feedbacks = await fetchFeedbacks(pageCounter, 10);

  if (!feedbacks.length) {
    container.insertAdjacentHTML('beforeend', '<p>No feedbacks found.</p>');
    return;
  }

  // 🔹 Оновлюємо вміст контейнера
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
        if (index === 0 || index === 1 || index === 2) {
          return `<span class="${className} custom-bullet" data-index="${index}"></span>`;
        }
        return '';
      },
    },
  });

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
    } else if (bullet.dataset.index === '2') {
      swiper.slideTo(totalSlides - 1);
    } else {
      swiper.slideTo(1);
    }
  });
}
