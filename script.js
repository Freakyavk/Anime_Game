const cardsContainer = document.getElementById("cards-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const currentElement = document.getElementById("current");
const showButton = document.getElementById("show");
const hideButton = document.getElementById("hide");
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const addCardButton = document.getElementById("add-card");
const clearButton = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

let currentActiveCard = 0;
const cardsElement = [];

const cardsData = [
  { question: "What is the name of the main protagonist in 'Naruto'?", answer: "Naruto Uzumaki" },
  { question: "In 'Attack on Titan', what is Eren Yeager's Titan form called?", answer: "Attack Titan" },
  { question: "Who is the author of 'One Piece'?", answer: "Eiichiro Oda" }
];

function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === 0) card.classList.add("active");
  card.innerHTML = `
    <div>
      <div>${data.question}</div>
      <div>${data.answer}</div>
    </div>
  `;
  card.addEventListener("click", () => card.classList.toggle("show-answer"));
  cardsElement.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
}

function updateCurrentText() {
  currentElement.innerText = `${currentActiveCard + 1}/${cardsElement.length}`;
}

nextButton.addEventListener("click", () => {
  cardsElement[currentActiveCard].classList.remove("active");
  currentActiveCard++;
  if (currentActiveCard > cardsElement.length - 1) {
    currentActiveCard = 0;
  }
  cardsElement[currentActiveCard].classList.add("active");
  updateCurrentText();
});

prevButton.addEventListener("click", () => {
  cardsElement[currentActiveCard].classList.remove("active");
  currentActiveCard--;
  if (currentActiveCard < 0) {
    currentActiveCard = cardsElement.length - 1;
  }
  cardsElement[currentActiveCard].classList.add("active");
  updateCurrentText();
});

showButton.addEventListener("click", () => addContainer.style.display = "block");
hideButton.addEventListener("click", () => addContainer.style.display = "none");

addCardButton.addEventListener("click", () => {
  const question = questionElement.value;
  const answer = answerElement.value;
  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);
    questionElement.value = "";
    answerElement.value = "";
    addContainer.style.display = "none";
    cardsData.push(newCard);
  }
});

clearButton.addEventListener("click", () => {
  cardsContainer.innerHTML = "";
  currentElement.innerText = "";
  cardsElement.length = 0;
  currentActiveCard = 0;
});

createCards();
