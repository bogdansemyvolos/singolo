const NAVIGATION_ARRAY = document.getElementById('header_nav').querySelectorAll('a');
const PORTFOLIO_NAVIGATION = document.querySelectorAll('.portfolio__navigation li');
const PORTFOLIO_PICS = document.querySelectorAll('.portfolio__pictures img');
const SUBMIT_BUTTON = document.getElementById('submit');
const CLOSE_MODAL_BUTTON = document.getElementById('close-btn');
const FORM = document.getElementById('contact_form');
var slideIndex = 1;

document.addEventListener('scroll', onScroll);

PORTFOLIO_NAVIGATION.forEach(el => el.addEventListener('click', (event) => {
  if (!event.target.classList.contains('active_tab') && !event.target.parentElement.classList.contains('active_tab')) {
    PORTFOLIO_NAVIGATION.forEach(el => el.classList.remove('active_tab'));
    if (event.target.tagName === 'LI') {
      event.target.classList.add('active_tab');
    } else {
      event.target.parentElement.classList.add('active_tab');
    }
    shiftImages();
  }
}));

PORTFOLIO_PICS.forEach(el => el.addEventListener('click', (event) => {
  if (event.target.classList.contains('border')) {
    PORTFOLIO_PICS.forEach(el => el.classList.remove('border'));
  } else {
    PORTFOLIO_PICS.forEach(el => el.classList.remove('border'));
    event.target.classList.add('border');
  }
}));

FORM.addEventListener('submit', (e) => e.preventDefault());

SUBMIT_BUTTON.addEventListener('click', () => {
  const emailInput = document.getElementById('email');
  const userNameInput = document.getElementById('username');
  if (emailInput.matches(':valid') && userNameInput.matches(':valid')) {
    const subject = document.getElementById('subject').value.toString().trim();
    const comment = document.getElementById('comment').value.toString().trim();
    if (subject != '') {
      document.getElementById('message-subject').innerHTML = 'Subject: '.bold() + subject;
    } else {
      document.getElementById('message-subject').innerHTML = 'Without subject';
    }
    if (comment != '') {
      document.getElementById('message-description').innerHTML = 'Description: '.bold() + comment.split('\n').join('<br>');
    } else {
      document.getElementById('message-description').innerHTML = 'Without description';
    }
    hideShowElementById('message-block');
  }
});

CLOSE_MODAL_BUTTON.addEventListener('click', () => {
  document.getElementById('message-subject').innerHTML = '';
  document.getElementById('message-description').innerHTML = '';
  hideShowElementById('message-block');
  FORM.reset();
});

function showSlides(n) {
  var slides = document.getElementsByClassName('slider__main')[0].querySelectorAll('div.first_slide, div.second_slide');
  var dots = document.querySelectorAll('.slider-dots_item');
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  slides.forEach(el => el.classList.add('hidden'));
  dots.forEach(el => el.classList.remove('active_dot'));
  slides[slideIndex - 1].classList.remove('hidden');
  dots[slideIndex - 1].classList.add('active_dot');
}

function plusSlide() {
  showSlides(slideIndex += 1);
}

function minusSlide() {
  showSlides(slideIndex -= 1);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function hideShowElementById(id) {
  var el = document.getElementById(id);
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
  } else {
    el.classList.add('hidden');
  }
}

function shiftImages() {
  const PORTFOLIO_CELLS = document.querySelectorAll('.portfolio__pictures .cell');
  const PORTFOLIO_PICTURES_PARENT = document.querySelector('.portfolio__pictures .layout-4-column');
  PORTFOLIO_PICTURES_PARENT.appendChild(PORTFOLIO_CELLS.item(0))
}


function onScroll(event) {
  const currentPos = window.scrollY + window.innerHeight / 2;
  const sections = document.querySelectorAll('section>span');

  sections.forEach((el) => {
    if (el.parentElement.offsetTop <= currentPos && (el.parentElement.offsetTop + el.parentElement.offsetHeight) > currentPos) {
      NAVIGATION_ARRAY.forEach(a => {
        a.classList.remove('colored-text');
        if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
          a.classList.add('colored-text');
        }
      });
    }
  });
}
