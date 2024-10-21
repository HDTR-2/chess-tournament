export const sliderStages = () => {
  const slides = [
    {
      number: ["1", "2"],
      title: [
        "Строительство железнодорожной магистрали Москва-Васюки",
        "Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов",
      ],
    },
    {
      number: "3",
      title:
        "Поднятие сельского хозяйства в радиусе на тысячу километров: производство овощей, фруктов, икры, шоколадных конфет",
    },
    {
      number: ["4", "5"],
      title: [
        "Строительство дворца для турнира",
        "Размещение гаражей для гостевого автотранспорта",
      ],
    },
    {
      number: "6",
      title:
        "Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов",
    },
    {
      number: "7",
      title:
        "Создание аэропорта «Большие Васюки» с регулярным отправлением почтовых самолётов и дирижаблей во все концы света, включая Лос-Анжелос и Мельбурн",
    },
  ];

  let activeSlide = 0;
  const sliderPlace = document.querySelector(".stages__items");
  const pagination = document.querySelector(".pagination");
  const widthOffset = document.querySelector(".stages__container").clientWidth;
  let flag = true;

  const flattenSlides = () => {
    if (widthOffset > 700) {
      const flattenedSlides = [];
      slides.forEach((slide) => {
        if (Array.isArray(slide.number)) {
          slide.number.forEach((num, i) => {
            flattenedSlides.push({
              number: num,
              title: slide.title[i],
            });
          });
        } else {
          flattenedSlides.push(slide);
        }
      });
      return flattenedSlides;
    }
    return slides;
  };

  const initSlider = () => {
    const slidesToUse = flattenSlides();
    slidesToUse.forEach((slideData, index) => {
      const slide = createSlide(slideData);
      sliderPlace.append(slide);
      createPaginationButton(index);
    });
    updatePagination();
  };

  const createSlide = (slideData) => {
    const slide = document.createElement("div");
    slide.className = "stages__item";

    if (Array.isArray(slideData.number)) {
      slide.innerHTML = slideData.number
        .map(
          (num, i) => `
        <div class="stages__item-number">${num}</div>
        <div class="stages__item-title">
          <p>${slideData.title[i]}</p>
        </div>
      `,
        )
        .join("");
    } else {
      slide.innerHTML = `
        <div class="stages__item-number">${slideData.number}</div>
        <div class="stages__item-title">
          <p>${slideData.title}</p>
        </div>
      `;
    }

    return slide;
  };

  const createPaginationButton = (index) => {
    const button = document.createElement("button");
    button.className = "pagination__dot";
    button.addEventListener("click", () => goToSlide(index));
    pagination.append(button);
  };

  const updatePagination = () => {
    const buttons = pagination.querySelectorAll("button");
    buttons.forEach((button, index) => {
      button.classList.toggle("dot-active", index === activeSlide);
    });
  };

  const updateButtonsState = () => {
    const nextBtn = document.querySelector(".next-btn-stages");
    const prevBtn = document.querySelector(".prev-btn-stages");
    const slidesToUse = flattenSlides();

    if (activeSlide === 0) {
      prevBtn.classList.add("disable");
    } else {
      prevBtn.classList.remove("disable");
    }

    if (activeSlide === slidesToUse.length - 1) {
      nextBtn.classList.add("disable");
    } else {
      nextBtn.classList.remove("disable");
    }
  };

  const goToSlide = (index, direction) => {
    if (!flag) return;
    flag = false;

    activeSlide = index;
    updatePagination();
    updateButtonsState();

    const startTranslateX =
      parseFloat(getComputedStyle(sliderPlace).transform.split(",")[4]) || 0;
    const endTranslateX = -activeSlide * (widthOffset - 20);

    animate({
      duration: 500,
      draw: function (progress) {
        const translateXValue =
          startTranslateX + (endTranslateX - startTranslateX) * progress;
        sliderPlace.style.transform = `translateX(${translateXValue}px)`;
      },
    });
    console.log(startTranslateX);
  };

  const nextSlide = () => {
    const slidesToUse = flattenSlides();
    if (activeSlide < slidesToUse.length - 1) {
      goToSlide(activeSlide + 1, "next");
    }
  };

  const prevSlide = () => {
    if (activeSlide > 0) {
      goToSlide(activeSlide - 1, "prev");
    }
  };

  initSlider();
  function animate({ duration, draw }) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
      let step = (time - start) / duration;

      if (step > 1) step = 1;

      draw(step);

      if (step < 1) {
        requestAnimationFrame(animate);
      } else {
        flag = true;
      }
    });
  }

  // Добавьте обработчики событий для кнопок "next" и "prev"
  document
    .querySelector(".next-btn-stages")
    .addEventListener("click", nextSlide);
  document
    .querySelector(".prev-btn-stages")
    .addEventListener("click", prevSlide);
};
