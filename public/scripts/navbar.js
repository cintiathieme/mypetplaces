const btn_burger = document.getElementById('btn_burger');
const menu = document.getElementById('navbarBasicExample');

btn_burger.addEventListener('click', () => {
  let toggleMenu = btn_burger.getAttribute('aria-expanded');
  if (toggleMenu === 'false') {
    btn_burger.setAttribute('aria-expanded', true);
    btn_burger.classList.add('is-active');
    menu.classList.add('is-active');
  } else {
    btn_burger.setAttribute('aria-expanded', false);
    btn_burger.classList.remove('is-active')
    menu.classList.remove('is-active')
  }
})