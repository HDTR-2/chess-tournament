export const sliderMain = () => {
  const slides = [
    {
      imageSrc: "./assets/img/avatar-default.png",
      title: "Хозе-Рауль Капабланка",
      subtitle: "Чемпион мира по шахматам",
    },
    {
      imageSrc: "./assets/img/avatar-default.png",
      title: "Эммануил Ласкер",
      subtitle: "Чемпион мира по шахматам",
    },
    {
      imageSrc: "./assets/img/avatar-default.png",
      title: "Александр Алехин",
      subtitle: "Чемпион мира по шахматам",
    },
    {
      imageSrc: "./assets/img/avatar-default.png",
      title: "Арон Нимцович",
      subtitle: "Чемпион мира по шахматам",
    },
    {
      imageSrc: "./assets/img/avatar-default.png",
      title: "Рихард Рети",
      subtitle: "Чемпион мира по шахматам",
    },
    {
      imageSrc: "./assets/img/avatar-default.png",
      title: "Остап Бендер",
      subtitle: "Гроссмейстер",
    },
  ];

  let activeSlide = 0;
  const sliderPlace = document.querySelector(".slider");
  const slideCounter = document.querySelector(".slide-counter");
  const widthOffset = document.querySelector(".slider").clientWidth;
  sliderPlace.style.width = slides.length * widthOffset + "px";
  let flag = true;

  const initSlider = () => {
    const slide = createSlide(slides[activeSlide]);
    sliderPlace.append(slide);
    updateSlideCounter();
    nextSlideGenerate();
    prevSlideGenerate();
  };

  const nextSlideGenerate = () => {
    let nextSlide = activeSlide + 1;
    if (nextSlide >= slides.length) {
      nextSlide = 0;
    }
    const slide = createSlide(slides[nextSlide]);
    sliderPlace.append(slide);
  };

  const prevSlideGenerate = (w = false) => {
    let prevSlide = activeSlide - 1;
    if (prevSlide < 0) {
      prevSlide = slides.length - 1;
    }
    const slide = createSlide(slides[prevSlide]);
    if (w) slide.style.width = 0;
    sliderPlace.prepend(slide);
  };

  const createSlide = (slideData) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.width = widthOffset + "px";
    slide.innerHTML = `
        <div class="slide__image">
            <img alt="participant" src="${slideData.imageSrc}" />
        </div>
        <div class="slide__title">${slideData.title}</div>
        <div class="slide__subtitle">${slideData.subtitle}</div>
        <button class="slide__button">Подробнее</button>
    `;
    return slide;
  };

  const updateSlideCounter = () => {
    slideCounter.textContent = `${activeSlide + 1} / ${slides.length}`;
  };

  initSlider();

  const nextSlide = () => {
    if (!flag) return;
    flag = false;

    activeSlide++;
    if (activeSlide >= slides.length) {
      activeSlide = 0;
    }
    nextSlideGenerate();
    updateSlideCounter();

    animate({
      duration: 1000,
      draw: function (progress) {
        sliderPlace.style.position = "relative";
        sliderPlace.style.left = `-${progress * (widthOffset / (widthOffset <= 774 ? 1 : 3))}px`;
      },

      removeElement: document.querySelector(".slider > .slide"),
    });
  };

  const prevSlide = () => {
    if (!flag) return;
    flag = false;

    activeSlide--;
    if (activeSlide < 0) {
      activeSlide = slides.length - 1;
    }
    prevSlideGenerate(true);
    updateSlideCounter();

    animate({
      duration: 1000,
      draw: function (progress) {
        sliderPlace.style.position = "relative";
        sliderPlace.style.left = `-${(1 - progress) * (widthOffset / (widthOffset <= 774 ? 1 : 3))}px`;
      },
      removeElement: document.querySelector(".slider > .slide:last-child"),
    });
  };

  document.querySelector(".next-btn").addEventListener("click", nextSlide);
  document.querySelector(".prev-btn").addEventListener("click", prevSlide);

  function animate({ duration, draw, removeElement }) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
      let step = (time - start) / duration;

      if (step > 1) step = 1;

      draw(step);

      if (step < 1) {
        requestAnimationFrame(animate);
      } else {
        removeElement.remove();
        flag = true;
        sliderPlace.style.left = "0";
      }
    });
  }
  setInterval(nextSlide, 4000);
};
