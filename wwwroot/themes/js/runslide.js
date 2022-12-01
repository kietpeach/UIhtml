// import { tns } from '../../src/tiny-slider.js';
var mobile = false,
      prefix = "",
      isTestPage = true,
      isDemoPage = false,
      classIn = 'tns-fadeIn',
      classOut = 'tns-fadeOut',
      speed = 0,
      doc = document,
      win = window,
      ww = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth,
      fw = getFW(ww),
      initFns = {},
      sliders = new Object(),
      edgepadding = 50,
      gutter = 10;

    function getFW (width) {
    var sm = 400, md = 900, lg = 1400;
    return width < sm ? 150 : width >= sm && width < md ? 200 : width >= md && width < lg ? 300 : 400;
    }
    window.addEventListener('resize', function() { fw = getFW(ww); });

var options = {
    'slider': {
        "controls": true,
        "mouseDrag": true,
        "autoplay": true,
        "autoplayHoverPause": true,
        "autoplayTimeout": 5000,
        // loop: true,
        "speed": 2000,
        responsive: {
            350: {
                items: 1
            },
            500: {
                items: 1
            },
            980: {
                items: 1
            },
            1020: {
                items: 1
            }
        },
        "mode": "gallery",
        "animateIn": "tns-fadeIn",
        "swipeAngle": false,
    },
    'best-choice': {
        "container": "#best-choice",
        "controls": true,
        "mouseDrag": true,
        "autoplay": true,
        "center": true,
        "loop": true,
        "autoplayHoverPause": true,
        "autoplayTimeout": 15000,
        "speed": 400,
        responsive: {
            350: {
                items: 1
            },
            500: {
                items: 1
            },
            980: {
                items: 3
            },
            1020: {
                items: 2
            }
        },
        "swipeAngle": false,
    },

    'promotion': {
        "controls": true,
        "mouseDrag": true,
        "autoplay": true,
        "autoplayHoverPause": true,
        "autoplayTimeout": 10000,
        "speed": 500,
        responsive: {
            350: {
                items: 1
            },
            500: {
                items: 1
            },
            980: {
                items: 1
            },
            1020: {
                items: 1
            }
        },
        "swipeAngle": false
    },
    'award': {
        "controls": true,
        "mouseDrag": true,
        "autoplay": true,
        "autoplayHoverPause": true,
        "autoplayTimeout": 15000,
        "speed": 400,
        responsive: {
            350: {
                items: 1
            },
            500: {
                items: 3
            },
            980: {
                items: 3
            },
            1020: {
                items: 3
            }
        },
        "swipeAngle": false,
    },

};


for (var i in options) {
  var item = options[i];
  item.container = '#' + i;
  item.swipeAngle = false;
  if (!item.speed) { item.speed = speed; }

  var data_responsive = doc.body.getAttribute('data-responsive');
  if (doc.querySelector(item.container)) {
    sliders[i] = tns(item);

    // call test functions
    if (initFns[i]) { initFns[i](); }

  // test responsive pages
  } else if (data_responsive) {
    var str = 'responsive' + data_responsive;
    if (i === str && initFns[i]) {
      initFns[i]();
    }
  }
}

// goto
if (doc.querySelector('#base_wrapper')) {
  var goto = doc.querySelector('#base_wrapper .goto-controls'),
      gotoBtn = goto.querySelector('.button'),
      gotoInput = goto.querySelector('input');

  gotoBtn.onclick = function (event) {
    var index = gotoInput.value;
    sliders['base'].goTo(index);
  };
}



