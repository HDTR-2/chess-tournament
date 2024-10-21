// main.js
import { marquee } from "./marquee.js";
import { sliderMain } from "./slider.js";
import { sliderStages } from "./sliderStages.js";
import { smoothScroll } from "./smoothScroll.js";

document.addEventListener("DOMContentLoaded", () => {
  const marqueeItems = document.querySelectorAll(".marquee-item");
  marqueeItems.forEach((marqueeItem) => {
    marquee(marqueeItem);
  });
  sliderStages();
  sliderMain();
  smoothScroll();
});
