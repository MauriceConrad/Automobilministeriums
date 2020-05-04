"use strict";

(function () {
  var swiperElement = document.querySelector('.swiper-container');
  var mySwiper = new Swiper(swiperElement, {
    speed: 400,
    //spaceBetween: 100,
    fadeEffect: {
      crossFade: true
    },
    effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets'
    }
  });
  var stayTime = 2000;
  var slidesCount = 3;
  var slideIndex = 1;
  var sliderInterval = setInterval(function () {
    mySwiper.slideNext();
    slideIndex++;

    if (slideIndex >= slidesCount) {
      clearInterval(sliderInterval);
    }
  }, stayTime);

  function clap() {}

  function updateCount() {
    var countSpan = document.querySelector('.clap-count span');
    fetch('data/claps.txt').then(function (response) {
      return response.text();
    }).then(function (count) {
      while (countSpan.childNodes.length > 0) {
        countSpan.removeChild(countSpan.childNodes[0]);
      }

      countSpan.append(count);
    });
  }

  updateCount();
  var endpoint = 'clap.php';
  window.addEventListener("load", function () {
    var clapButton = document.querySelector(".clap-symbol");
    clapButton.addEventListener("click", function () {
      fetch(endpoint).then(function (response) {
        updateCount();
        return response.json();
      }).then(function (result) {
        if (result.success) {} else {
          alert("Du hast heute schon genug geklatscht. 🚗");
        }
      });
      anime({
        targets: '.clappers',
        keyframes: [{
          scale: 1
        }, {
          scale: 1.3
        }, {
          scale: 1
        }],
        duration: 1000,
        easing: 'spring(1, 80, 10, 0)',
        autoplay: true,
        loop: false
      });
    });
  });
})();