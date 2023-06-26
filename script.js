const sideBarCards = document.querySelectorAll(".sidebar .card img");
const boardCards = document.querySelectorAll(".board .card img");
const imageSrcs = [
  "./src/images/deer_1.jpg",
  "./src/images/deer_2.jpg",
  "./src/images/deer_3.jpg",
  "./src/images/deer_4.jpg",
  "./src/images/deer_5.jpg",
  "./src/images/deer_6.jpg",
  "./src/images/deer_7.jpg",
  "./src/images/deer_8.jpg",
  "./src/images/deer_9.jpg",
];

window.onload = () => puzzleInit(sideBarCards, boardCards);

// 게임 초기화
const puzzleInit = (sideBarCards, boardCards) => {
  clearSidebar(sideBarCards);
  clearBoard(boardCards);
  setEventListeners(sideBarCards);
  setEventListeners(boardCards);
};

const clearSidebar = () => {
  imageSrcs.sort(() => Math.random() - 0.5);
  sideBarCards.forEach((el, i) => {
    el.src = imageSrcs[i];
  });
};

const clearBoard = () => {
  const blankImage = "./src/images/No_img.jpg";
  boardCards.forEach((el) => {
    el.src = blankImage;
  });
};

const setEventListeners = (cards) => {
  cards.forEach((card) => {
    card.addEventListener("dragstart", dragStartFunc);
    card.addEventListener("dragover", dragOverFunc);
    card.addEventListener("drop", dropFunc);
  });
};

const dragStartFunc = (event) => {
  event.dataTransfer.setData("text/plain", event.target.id);
};

const dragOverFunc = (event) => {
  event.preventDefault();
};

const dropFunc = (event) => {
  const id = event.dataTransfer.getData("text/plain");
  const startEl = document.getElementById(id);
  [event.target.src, startEl.src] = [startEl.src, event.target.src];
  if (isClear()) {
    endGame();
  }
};

// 정답 유무 체크
const isClear = () => {
  return [...boardCards].every((el, i) => {
    const fileName = el.src.split("/").pop();
    const fileIndex = Number(fileName.match(/\d+/)) - 1;
    return fileIndex == i;
  });
};

// 게임 종료
const endGame = () => {
  removeEventListener(boardCards);
  removeEventListener(sideBarCards);
  showGameEndText();
};

const removeEventListener = (cards) => {
  cards.forEach(setDraggableFalse);
};

const setDraggableFalse = (el) => {
  el.draggable = false;
};

const showGameEndText = () => {
  const panelEl = document.querySelector(".panel");
  const button = document.querySelector('button[type="button"]');
  const congratulationText = document.createElement("p");
  congratulationText.textContent = "정답입니다.";

  panelEl.appendChild(congratulationText);
  button.style.display = "none";
};