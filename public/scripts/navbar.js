const btn_burger = document.getElementById('btn_burger');
const menu = document.getElementById('navbarBasicExample');
console.log(btn_burger)

btn_burger.addEventListener('click', () => {
  console.log('cu')
  let toggleMenu = btn_burger.getAttribute('aria-expanded');
  if (toggleMenu === 'false') {
    btn_burger.setAttribute('aria-expanded', true);
    btn_burger.classList.add('is-active');
    menu.classList.add('is-active');
    console.log('apertou')
  } else {
    btn_burger.setAttribute('aria-expanded', false);
    btn_burger.classList.remove('is-active')
    menu.classList.remove('is-active')
    console.log('apertou')
  }
})