window.onload = () => puzzleInit(sideBarCards, boardCards);

const sideBarCards = document.querySelectorAll(".sidebar .card img");
const boardCards = document.querySelectorAll(".board .card img");

// 드래그 이벤트 설정
sideBarCards.forEach(setDragEvent);
boardCards.forEach(setDragEvent);

function setDragEvent(el) {
  el.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  });
  el.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  el.addEventListener("drop", (event) => {
    const id = event.dataTransfer.getData("text/plain");
    const startEl = document.getElementById(id);
    [event.target.src, startEl.src] = [startEl.src, event.target.src];
    if (isClear()) {
      endGame();
    }
  });
}

// 퍼즐 진행 상황 체크
function isClear() {
  let result = true;
  boardCards.forEach((el, i) => {
    const fileName = el.src.split("/").pop();
    const fileIndex = Number(fileName.match(/\d+/)) - 1;
    if (fileIndex != i) {
      result = false;
      return;
    }
  });
  return result;
}

// 게임 종료
function endGame() {
  deleteDragEvent();
  showGameEndText();
}

function deleteDragEvent() {
  sideBarCards.forEach((el) => {
    el.draggable = false;
  });
  boardCards.forEach((el) => {
    el.draggable = false;
  });
}

function showGameEndText() {
  const panelEl = document.querySelector(".panel");
  const button = document.querySelector('button[type="button"]');
  const congratulationText = document.createElement("p");
  congratulationText.textContent = "정답입니다.";

  panelEl.appendChild(congratulationText);
  button.style.display = "none";
}

// 게임 초기화
function puzzleInit(sideBarCards, boardCards) {
  clearSidebar(sideBarCards);
  clearBoard(boardCards);
}

function clearSidebar() {
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
  imageSrcs.sort(() => Math.random() - 0.5);

  sideBarCards.forEach((el, i) => {
    el.src = imageSrcs[i];
  });
}

function clearBoard() {
  const blankImage = "./src/images/No_img.jpg";

  boardCards.forEach((el) => {
    el.src = blankImage;
  });
}
