(function () {
  const swiperElement = document.querySelector('.swiper-container');
  const mySwiper = new Swiper(swiperElement, {
    speed: 400,
    //spaceBetween: 100,
    fadeEffect: {
      crossFade: true
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true
    },
    effect: 'fade'
    /*pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },*/

  });

  function updateCount() {
    return new Promise(function (resolve, reject) {
      const countSpan = document.querySelector('.clap-count span');
      fetch('/api/claps.php').then(response => response.json()).then(result => {
        clearNode(countSpan);
        const claps = result.claps.toString();

        const clapsStr = (str => {
          const parts = [];

          for (var i = 0; i < Math.ceil(str.length / 3); i++) {
            const endPos = str.length - i * 3;
            console.log(str, endPos - 3, endPos);
            parts.push(str.substring(endPos - 3, endPos));
          }

          return parts.reverse().join(".");
        })(claps);

        countSpan.append(clapsStr);
        resolve(result.claps);
      });
      /*fetch('/data/claps.txt?' + Date.now()).then(response => response.text()).then(count => {
        clearNode(countSpan);
        countSpan.append(count);
        resolve(Number(count));
      });*/
    });
  }

  function clearNode(e) {
    while (e.childNodes.length > 0) e.removeChild(e.childNodes[0]);
  }

  updateCount();
  const endpoint = '/api/clap.php';

  function getDateId(date) {
    return new String() + date.getFullYear() + date.getMonth() + date.getDate();
  }

  window.addEventListener("load", function () {
    const clapButton = document.querySelector(".clap-symbol");
    clapButton.addEventListener("click", function () {
      const dateId = getDateId(new Date());
      const claps = JSON.parse(localStorage.getItem("claps") || '{}');
      let clapsToday = claps[dateId] || 0;

      if (clapsToday < 10) {
        const audio = new Audio('/assets/applause.mp3');
        audio.currentTime = 0;
        audio.volume = 0.5;
        audio.play();
        const countSpan = document.querySelector('.clap-count span');
        const newCount = Number(countSpan.innerHTML.replace(/\./g, "")) + 1; //clearNode(countSpan);
        //countSpan.append(newCount);

        fetch(endpoint).then(response => {
          updateCount();
          return response.json();
        }).then(result => {});
        clapsToday++;
        claps[dateId] = clapsToday;
        localStorage.setItem("claps", JSON.stringify(claps));
      } else {
        alert("Du kannst nur zehnmal pro Tag applaudieren!");
      }

      anime({
        targets: '.clappers',
        keyframes: [{
          scale: 1
        }, {
          scale: 1.3
        }, {
          scale: 1
        }],
        duration: 500,
        easing: 'cubicBezier(.5, .05, .1, .3)',
        autoplay: true,
        loop: false
      });
    });
  });
  window.addEventListener("load", function () {
    const popupInfos = document.querySelector(".popup.popup-infos");
    const popupImpressum = document.querySelector(".popup.popup-impressum");
    const overlay = document.querySelector(".overlay");
    const btnInfos = document.querySelectorAll(".btn-infos");
    const btnImpressum = document.querySelector(".btn-impressum");
    popupInfos.style.transform = 'translateY(-110%)';
    popupImpressum.style.transform = 'translateY(-110%)';

    for (let btn of btnInfos) {
      btn.addEventListener("click", function () {
        openPopup(popupInfos, overlay);
      });
    }

    console.log(popupImpressum);
    btnImpressum.addEventListener("click", function () {
      openPopup(popupImpressum, overlay, 500);
    });

    for (let popup of document.querySelectorAll(".popup")) {
      const closeBtn = popup.getElementsByClassName("btn-close")[0];
      closeBtn.addEventListener("click", function () {
        closePopup(popup, overlay, 500);
      });
    }
  });

  function openPopup(popup, overlay, duration = 700) {
    overlay.classList.add("show");
    anime({
      targets: overlay,
      keyframes: [{
        opacity: 1
      }],
      duration: duration,
      easing: 'cubicBezier(.5, .05, .1, .3)',
      autoplay: true,
      loop: false
    });
    popup.classList.add("show");
    anime({
      targets: popup,
      keyframes: [{
        translateY: 0
      }],
      duration: duration,
      easing: 'cubicBezier(.5, .05, .1, .3)',
      autoplay: true,
      loop: false
    });
  }

  function closePopup(popup, overlay, duration = 700) {
    anime({
      targets: popup,
      translateY: "-110%",
      duration: duration,
      easing: 'cubicBezier(.5, .05, .1, .3)',
      autoplay: true,
      loop: false
    });
    anime({
      targets: overlay,
      opacity: 0,
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

  const quotes = [{
    text: "“Wir brauchen die Prämie unabhängig von der Antriebsart, für das gesamte Produktangebot.”",
    author: "Herbert Diess (VW Chef)",
    fontSize: '2.6em'
  }, {
    text: "Moderne Verbrennungsmotoren = “erheblicher Beitrag für Umwelt- und Klimaschutz”",
    author: "Hildegard Müller (Chefin der Autolobby)",
    fontSize: '2.4em'
  }, {
    text: "“Die nächsten Wochen werden entscheidend sein. Daher keine Grundsatzdiskussionen, sondern Fokus auf die Konjunktur und Tempo. Sonst rennt uns die Zeit davon.”",
    author: "Herbert Diess (VW Chef)",
    fontSize: '1.9em'
  }, {
    text: "“Das ist jetzt nicht die Zeit, über weitere Verschärfungen bei der CO2-Regulierung nachzudenken.”",
    author: "Hildegard Müller (Chefin der Autolobby)",
    fontSize: '2.6em'
  }];

  function setQuote(quote, duration = 250) {
    const quoteText = document.querySelector(".quote-text");
    const quoteAuthor = document.querySelector(".quote-author");
    anime({
      targets: quoteText,
      opacity: 0,
      duration: duration,
      easing: 'linear',
      autoplay: true,
      loop: false
    });
    anime({
      targets: quoteAuthor,
      opacity: 0,
      duration: duration,
      easing: 'linear',
      autoplay: true,
      loop: false
    });
    setTimeout(() => {
      clearNode(quoteText);
      clearNode(quoteAuthor);
      quoteText.append(quote.text);
      quoteAuthor.append(quote.author);
      quoteText.style.fontSize = quote.fontSize;
      anime({
        targets: quoteText,
        opacity: 1,
        duration: duration,
        easing: 'linear',
        autoplay: true,
        loop: false
      });
      anime({
        targets: quoteAuthor,
        opacity: 1,
        duration: duration,
        easing: 'linear',
        autoplay: true,
        loop: false
      });
    }, duration);
  }

  window.addEventListener("load", function () {
    let i = 0;
    setInterval(() => {
      i++;
      setQuote(quotes[i % quotes.length], 300);
    }, 10000);
    setQuote(quotes[i % quotes.length], 100);
  });
  window.addEventListener("load", function () {
    let lastValue = 0;
    setInterval(() => {
      updateCount().then(count => {
        if (count != lastValue) {}

        lastValue = count;
      });
    }, 500);
  });
  window.addEventListener("load", function () {
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
  });
})();