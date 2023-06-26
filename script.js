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
  });
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
