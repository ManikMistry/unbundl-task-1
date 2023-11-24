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
    // If not in reversing mode and at the last image, switch to reverse order

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
    // If the last image in reverse order is reached, smoothly transition to the last image
    carousel.style.transition = "transform 0.5s ease-in-out";
    showSlide(7); // Set the index to the last image

    // Trigger reflow to apply the transition before switching to the first image
    void carousel.offsetWidth;

    // Switch to the first image without transition
    carousel.style.transition = "none";
    showSlide(0);

    // Reset isReversing to false for the next cycle
    isReversing = false;

    // Trigger reflow to apply the transition reset before re-enabling it
    void carousel.offsetWidth;

    // Enable transition for the next slides
    carousel.style.transition = "transform 0.5s ease-in-out";
  }
}

// Add transitionend event listener to handle the smooth transition between last and first images
carousel.addEventListener("transitionend", transitionEndHandler);

// Handle the next and previous button clicks
nextBtn.addEventListener("click", () => {
  nextSlide(true);
});

prevBtn.addEventListener("click", () => {
  prevSlide();
});

// Automatically advance to the next slide every 3 seconds
setInterval(nextSlide, 3000);
