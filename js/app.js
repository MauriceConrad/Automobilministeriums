(function() {
  const swiperElement = document.querySelector('.swiper-container');
  const mySwiper = new Swiper(swiperElement, {
    speed: 400,
    //spaceBetween: 100,
    fadeEffect: {
      crossFade: true
    },
    effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
  });


  const stayTime = 2000;
  const slidesCount = 3;
  let slideIndex = 1;
  const sliderInterval = setInterval(() => {

    mySwiper.slideNext();

    slideIndex++;

    if (slideIndex >= slidesCount) {
      clearInterval(sliderInterval);
    }

  }, stayTime);


  function clap() {



  }
  function updateCount() {

    const countSpan = document.querySelector('.clap-count span');

    fetch('data/claps.txt').then(response => response.text()).then(count => {
      while (countSpan.childNodes.length > 0) countSpan.removeChild(countSpan.childNodes[0]);
      countSpan.append(count);
    });
  }

  updateCount();

  const endpoint = 'clap.php';

  window.addEventListener("load", function() {
    const clapButton = document.querySelector(".clap-symbol");
    clapButton.addEventListener("click", function() {
      fetch(endpoint).then(response => {
        updateCount();
        return response.json();
      }).then(result => {

        if (result.success) {

        }
        else {
          alert("Du hast heute schon genug geklatscht. 🚗");
        }




      });

      anime({
        targets: '.clappers',
        keyframes: [
          {
            scale: 1
          },
          {
            scale: 1.3
          },
          {
            scale: 1
          }
        ],
        duration: 1000,
        easing: 'spring(1, 80, 10, 0)',
        autoplay: true,
        loop: false
      });
    });
  });
})();
