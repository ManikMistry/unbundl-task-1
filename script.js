const carousel = document.getElementById("image-carousel");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentIndex = 0;
let isReversing = false;

function showSlide(index) {
  carousel.style.transition = "transform 0.5s ease-in-out";
  carousel.style.transform = `translateX(${-index * 100}%)`;
}
function nextSlide(manuel) {
  if (!isReversing && currentIndex === 7) {
    isReversing = true;
  }
  if (manuel) {
    if(currentIndex===7) return;
    currentIndex = (currentIndex + 1)%8;
    console.log(currentIndex)

  } else {
    currentIndex = isReversing
      ? (currentIndex - 1 + 8) % 8
      : (currentIndex + 1) % 8;
  }
  showSlide(currentIndex);
}
function prevSlide(manuel) {
  currentIndex = (currentIndex - 1 + 8) % 8;
  showSlide(currentIndex);
}
function transitionEndHandler() {
  if (currentIndex === 0 && isReversing) {
    carousel.style.transition = "transform 0.5s ease-in-out";
    showSlide(7);
    void carousel.offsetWidth;
    carousel.style.transition = "none";
    showSlide(0);
    isReversing = false;
    void carousel.offsetWidth;   
    carousel.style.transition = "transform 0.5s ease-in-out";
  }
}
carousel.addEventListener("transitionend", transitionEndHandler);
nextBtn.addEventListener("click", () => {
  nextSlide(true);
});
prevBtn.addEventListener("click", () => {
  prevSlide();
});
setInterval(nextSlide, 3000);
