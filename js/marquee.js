// marquee.js
export const marquee = (marqueeItem) => {
  const phrases = [
    "Дело помощи утопающим — дело рук самих утопающих!",
    " · ",
    "Шахматы двигают вперед не только культуру, но и экономику!",
    " · ",
    "Лед тронулся, господа присяжные заседатели!",
    " · ",
  ];
  const addPhrases = (phrases) => {
    phrases.forEach((phrase) => {
      const span = document.createElement("span");
      span.textContent = phrase;
      marqueeItem.appendChild(span);
    });
  };
  addPhrases(phrases);
  addPhrases(phrases);
};
