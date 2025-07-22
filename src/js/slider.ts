export function sliderM() {
  const slider = document.getElementById("slider") as HTMLElement;
  const sliderMain = slider.querySelector(".slider__main") as HTMLElement;
  const prev = sliderMain.querySelector(
    ".slider__navigation-prev"
  ) as HTMLElement;
  const next = sliderMain.querySelector(
    ".slider__navigation-next"
  ) as HTMLElement;
  const container = sliderMain.querySelector(
    ".slider-container"
  ) as HTMLElement;
  const images = container.querySelectorAll(
    "img"
  ) as NodeListOf<HTMLImageElement>;
  // Desktop.
  const thumbnails = slider.querySelectorAll(
    ".slider__thumbnails > figure"
  ) as NodeListOf<HTMLImageElement>;

  let cursor: number = 0;
  const clientWidth: number = container.clientWidth;
  const nbImages: number = images.length;

  function updateSlider(): void {
    container.style.transform = `translateX(-${cursor * clientWidth}px)`;
  }
  function resetSlider(): void {
    container.style.transform = "";
    cursor = 0;
  }
  prev.addEventListener("touchend", (): void => {
    if (cursor === 0) {
      container.style.transform = "";
      return;
    }
    cursor--;
    updateSlider();
  });

  next.addEventListener("touchend", (): void => {
    if (cursor >= nbImages - 1) {
      resetSlider();
      return;
    }
    cursor++;
    updateSlider();
  });
  function updateThumbnails(index: number): void {
    const thumbLg = thumbnails.length;
    for (let i = 0; i < thumbLg; i++) {
      const current = thumbnails[i] as HTMLElement;
      if (i != index) {
        current.classList.remove("active");
        continue;
      }
      current.classList.add("active");
    }
  }

  thumbnails.forEach((figure:HTMLElement, index:number) => {
    figure.addEventListener("click", (e: Event) => {
      const currentTarget = e.currentTarget as HTMLElement;
      cursor = index;
      updateThumbnails(index);
      updateSlider();
    });
  });
}
