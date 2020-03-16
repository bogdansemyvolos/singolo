const NAVIGATION_ARRAY = document.getElementById('header_nav').querySelectorAll('a');
const PORTFOLIO_NAVIGATION = document.querySelectorAll('.portfolio__navigation li');
const PORTFOLIO_PICS = document.querySelectorAll('.portfolio__pictures img');
const SUBMIT_BUTTON = document.getElementById('submit');
const CLOSE_MODAL_BUTTON = document.getElementById('close-btn');
const FORM = document.getElementById('contact_form');
var slideIndex = 1;

NAVIGATION_ARRAY.forEach(el => el.addEventListener('click', (event) => {
  NAVIGATION_ARRAY.forEach(el => el.classList.remove('colored-text'));
  event.target.classList.add('colored-text');
}));

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
  PORTFOLIO_PICS.forEach(el => el.classList.remove('border'));
  event.target.classList.add('border');
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
  document.getElementById('message-subject').innerHTML ='';
  document.getElementById('message-description').innerHTML = '';
  hideShowElementById('message-block');
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
  let sources = Array.from(PORTFOLIO_PICS).map(el => el.getAttribute('src'));
  sources.push(sources[0]);
  sources.shift();
  for (let i = 0; i < sources.length; i++) {
    PORTFOLIO_PICS.item(i).setAttribute('src', sources[i]);
  }
  PORTFOLIO_PICS.forEach(el => el.classList.remove('border'));
}
