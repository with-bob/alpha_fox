(function(){
  const menu_toggler = document.getElementById('menu_toggler');
  const nav = document.querySelector('.main-nav__lists');
  menu_toggler.addEventListener('click', function(){
    menu_toggler.classList.toggle('change')
    nav.classList.toggle('change')
  });
})();


(function () {
  const carsoule_container = document.getElementById("carsoule__container");
  const carsoule_sliders = document.querySelectorAll(".carsoule__slider");
  const carsoule_track = document.querySelector(".carsoule__track");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  let numberOfSlide = carsoule_sliders.length;
  let slideWidth = carsoule_sliders[0].clientWidth;
  let currentSlide = 0;

  // setactive class for the track and and the slide
  const setActiveClasses = () => {
    let currentActiveClass = document.querySelector(".carsoule__slider.active");
    currentActiveClass.classList.remove("active");
    carsoule_sliders[currentSlide].classList.add("active");

    // set active class for the carsoule_track
    let currentDot = document.querySelector(".indicator.active");
    currentDot.classList.remove("active");
    carsoule_track.children[currentSlide].classList.add("active");
  };
  // get slide control
  function getSlide(slideNum) {
    carsoule_container.style.transform =
      "translateX(-" + slideWidth * slideNum + "px)";
    currentSlide = slideNum;
    setActiveClasses();
  }
  //create slider track
  const createSliderTrack = () => {
    for (let i = 0; i < numberOfSlide; i++) {
      const track = document.createElement("div");
      track.classList.add("indicator");
      carsoule_track.append(track);
      track.addEventListener("click", () => {
        getSlide(i);
      });
    }
    carsoule_track.children[0].classList.add("active");
  };
  //init slider handler
  const initSlider = () => {
    carsoule_sliders.forEach((slide, indx) => {
      slide.style.left = indx * 100 + "%";
    });
    createSliderTrack();
  };
  const nextSlideHandler = () => {
    if (currentSlide >= numberOfSlide - 1) {
      getSlide(0);
      return;
    }
    currentSlide++;
    getSlide(currentSlide);
  };
  const prevSlideHandler = () => {
    if (currentSlide <= 0) {
      getSlide(numberOfSlide - 1);
      return;
    }
    currentSlide--;
    getSlide(currentSlide);
  };
  initSlider();
  nextBtn.addEventListener("click", nextSlideHandler);
  prevBtn.addEventListener("click", prevSlideHandler);
})();

// intersection observer
(function () {
  const header = document.getElementById("header");
  const showCase = document.getElementById("showcase");

  const showCaseOptions = {
    rootMargin: "-600px 0px 0px 0px",
  };
  const showCaseObserver = new IntersectionObserver(
    (entries, showCaseObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          header.classList.add("white_bg");
        } else {
          header.classList.remove("white_bg");
        }
      });
    },
    showCaseOptions
  );

  showCaseObserver.observe(showCase);
})();

// accordion
(function () {
  const accordion_header = document.querySelectorAll(".accordion__item-header");
  accordion_header.forEach((acc_header) => {
    acc_header.addEventListener("click", () => {
      // open acc and close when move to the next acc
      const currentActive_acc = document.querySelector(
        ".accordion__item-header.active"
      );
      if (currentActive_acc && currentActive_acc !== acc_header) {
        currentActive_acc.classList.remove("active");
        currentActive_acc.nextElementSibling.style.maxHeight = 0;
      }
      acc_header.classList.toggle("active");
      const acc_body = acc_header.nextElementSibling;
      if (acc_header.classList.contains("active")) {
        acc_body.style.maxHeight = acc_body.scrollHeight + "px";
      } else {
        acc_body.style.maxHeight = 0;
      }
    });
  });
})();
