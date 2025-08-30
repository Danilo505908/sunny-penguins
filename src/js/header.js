const burger = document.querySelector('.burger_header');
const nav = document.querySelector('.nav_header');
const closeBtn = document.querySelector('.close_header');

burger.addEventListener('click', () => {
  nav.classList.add('open');
  burger.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
  nav.classList.remove('open');
  burger.style.display = 'block';
});

// Відкриття і закриття меню

const links = document.querySelectorAll('.nav_header a');

links.forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav').classList.remove('open');
  });
});

// закриття меню при кліку на пункт

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelector('.nav').classList.remove('open');
  }
});

// закриття по Escape

console.log(`jS файл підключено`);
