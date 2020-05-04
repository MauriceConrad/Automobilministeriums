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


  const stayTime = [3000, 6000];
  function waitForPage(i) {
    setTimeout(() => {
      mySwiper.slideNext();
      i++;
      if (i in stayTime) {
        waitForPage(i);
      }
    }, stayTime[i]);
  }
  waitForPage(0);

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
        duration: 500,
        easing: 'cubicBezier(.5, .05, .1, .3)',
        autoplay: true,
        loop: false
      });
    });
  });



  window.addEventListener("load", function() {
    const popupInfos = document.querySelector(".popup.popup-infos");
    const popupImpressum = document.querySelector(".popup.popup-impressum");
    const overlay = document.querySelector(".overlay");

    const btnInfos = document.querySelectorAll(".btn-infos");
    const btnImpressum = document.querySelector(".btn-impressum");

    popupInfos.style.transform = 'translateY(-110%)';
    popupImpressum.style.transform = 'translateY(-110%)';

    for (let btn of btnInfos) {
      btn.addEventListener("click", function() {
        openPopup(popupInfos, overlay);
      });
    }

    console.log(popupImpressum);
    btnImpressum.addEventListener("click", function() {
      openPopup(popupImpressum, overlay, 500);
    });

    for (let popup of document.querySelectorAll(".popup")) {
      const closeBtn = popup.getElementsByClassName("btn-close")[0];

      closeBtn.addEventListener("click", function() {
        closePopup(popup, overlay, 500);

      });
    }
  });

  function openPopup(popup, overlay, duration = 700) {
    overlay.classList.add("show");

    anime({
      targets: overlay,
      keyframes: [
        {
          opacity: 1
        }
      ],
      duration: duration,
      easing: 'cubicBezier(.5, .05, .1, .3)',
      autoplay: true,
      loop: false
    });
    popup.classList.add("show");
    anime({
      targets: popup,
      keyframes: [
        {
          translateY: 0
        }
      ],
      duration: duration,
      easing: 'cubicBezier(.5, .05, .1, .3)',
      autoplay: true,
      loop: false
    });
  }
  function closePopup(popup, overlay, duration = 700) {
    anime({
      targets: popup,
      translateY:  "-110%",
      duration: duration,
      easing: 'cubicBezier(.5, .05, .1, .3)',
      autoplay: true,
      loop: false
    });
    anime({
      targets: overlay,
      opacity:  0,
      duration: duration,
      easing: 'cubicBezier(.5, .05, .1, .3)',
      autoplay: true,
      loop: false
    });
    setTimeout(() => {
      popup.classList.remove("show");
      overlay.classList.remove("show");
    }, duration);
  }
})();
