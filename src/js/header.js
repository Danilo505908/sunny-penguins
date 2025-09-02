const burger = document.querySelector('.burger_header');
const nav = document.querySelector('.nav_header');
const closeBtn = document.querySelector('.close_header');

// відкриття бургер-меню
burger.addEventListener('click', () => {
  nav.classList.add('open');
  burger.style.display = 'none';
});

// закриття кнопкою "хрестик"
closeBtn.addEventListener('click', () => {
  nav.classList.remove('open');
  burger.style.display = 'block';
});

// закриття при кліку на пункт меню + плавний скрол
const links = document.querySelectorAll('.nav_header a');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault(); // блокуємо стандартний різкий перехід
    const targetId = link.dataset.target;
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }

    // закриваємо меню
    nav.classList.remove('open');
    burger.style.display = 'block';
  });
});

// закриття по Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    nav.classList.remove('open');
    burger.style.display = 'block';
  }
});
