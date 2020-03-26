const NAVIGATION_ARRAY = document.getElementById('header_nav').querySelectorAll('a');
const PORTFOLIO_NAVIGATION = document.querySelectorAll('.portfolio__navigation li');
const PORTFOLIO_PICS = document.querySelectorAll('.portfolio__pictures img');
const SUBMIT_BUTTON = document.getElementById('submit');
const CLOSE_MODAL_BUTTON = document.getElementById('close-btn');
const FORM = document.getElementById('contact_form');
const dots = document.querySelectorAll('.slider-dots_item');

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

//slider
var
  _mainElement = document.querySelector('.slider__main'),
  _sliderWrapper = _mainElement.querySelector('.slider__wrapper'),
  _sliderItems = _mainElement.querySelectorAll('div.first_slide, div.second_slide'),
  _sliderControls = _mainElement.querySelectorAll('.control_prev_active, .control_next_active'),
  _sliderControlLeft = _mainElement.querySelector('.control_prev_active'),
  _sliderControlRight = _mainElement.querySelector('.control_next_active'),
  _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width),
  _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width),
  _positionLeftItem = 0,
  _transform = 0,
  _step = _itemWidth / _wrapperWidth * 100,
  _items = [];


_sliderItems.forEach(function (item, index) {
  _items.push({ item: item, position: index, transform: 0 });
});

_sliderControls.forEach(el => el.addEventListener('click', (event) => {
  event.preventDefault();
  var direction = event.target.classList.contains('control_next_active') || event.target.parentElement.classList.contains('control_next_active') ? 'right' : 'left';
  transformItem(direction);
}));

var position = {
  getItemMin: function () {
    var indexItem = 0;
    _items.forEach(function (item, index) {
      if (item.position < _items[indexItem].position) {
        indexItem = index;
      }
    });
    return indexItem;
  },
  getItemMax: function () {
    var indexItem = 0;
    _items.forEach(function (item, index) {
      if (item.position > _items[indexItem].position) {
        indexItem = index;
      }
    });
    return indexItem;
  },
  getMin: function () {
    return _items[position.getItemMin()].position;
  },
  getMax: function () {
    return _items[position.getItemMax()].position;
  }
}

function transformItem(direction) {
  var active_dot = Array.from(dots).map(el => el.classList.contains('active_dot')).indexOf(true);
  dots.forEach(el => el.classList.remove('active_dot'));
  var nextItem;
  if (direction === 'right') {
    _positionLeftItem++;
    if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
      nextItem = position.getItemMin();
      _items[nextItem].position = position.getMax() + 1;
      _items[nextItem].transform += _items.length * 100;
      _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
    }
    _transform -= _step;
    active_dot = active_dot + 1 >= dots.length ? active_dot = 0 : active_dot + 1;
    dots[active_dot].classList.add('active_dot');
  }
  if (direction === 'left') {
    _positionLeftItem--;
    if (_positionLeftItem < position.getMin()) {
      nextItem = position.getItemMax();
      _items[nextItem].position = position.getMin() - 1;
      _items[nextItem].transform -= _items.length * 100;
      _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
    }
    _transform += _step;
    active_dot = active_dot - 1 < 0 ? dots.length - 1 : active_dot - 1;
    dots[active_dot].classList.add('active_dot');
  }
  _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';

}
