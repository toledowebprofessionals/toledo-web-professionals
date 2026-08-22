import {
  getYearsOfService,
  numberToWords,
} from "../utils/yearsOfService";

let carouselTimer: number | undefined;

function initializePage() {
  const serviceYears = getYearsOfService();
  document.querySelectorAll<HTMLElement>("[data-service-years]").forEach((item) => {
    item.textContent =
      item.dataset.format === "number"
        ? String(serviceYears)
        : numberToWords(serviceYears);
  });

  const navMenu = document.querySelector<HTMLElement>("#navbarList");
  const navigationToggle =
    document.querySelector<HTMLButtonElement>(".navbar-toggler");

  if (navigationToggle && navigationToggle.dataset.initialized !== "true") {
    navigationToggle.dataset.initialized = "true";
    navigationToggle.addEventListener("click", () => {
      const expanded = navigationToggle.getAttribute("aria-expanded") === "true";
      navigationToggle.setAttribute("aria-expanded", String(!expanded));
      navMenu?.classList.toggle("hidden", expanded);
      navMenu?.classList.toggle("flex", !expanded);
    });
  }

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector<HTMLElement>(link.hash);
      if (!target) return;
      event.preventDefault();
      window.scrollTo({ top: target.offsetTop - 89, behavior: "smooth" });
    });
  });

  const carouselItems = [
    ...document.querySelectorAll<HTMLElement>(
      ".introductory-slides .carousel-item",
    ),
  ];
  if (!carouselItems.length) return;

  let current = Math.max(
    0,
    carouselItems.findIndex((item) => item.classList.contains("active")),
  );
  const show = (index: number) => {
    current = (index + carouselItems.length) % carouselItems.length;
    carouselItems.forEach((item, itemIndex) =>
      item.classList.toggle("active", itemIndex === current),
    );
  };
  const pause = () => window.clearInterval(carouselTimer);
  const play = () => {
    pause();
    carouselTimer = window.setInterval(() => show(current + 1), 10_000);
  };

  document
    .querySelector(".introductory-slides-prev")
    ?.addEventListener("click", () => {
      pause();
      show(current - 1);
    });
  document
    .querySelector(".introductory-slides-next")
    ?.addEventListener("click", () => {
      pause();
      show(current + 1);
    });
  document
    .querySelector(".introductory-slides-play")
    ?.addEventListener("click", () => {
      show(current + 1);
      play();
    });
  document
    .querySelector(".introductory-slides-pause")
    ?.addEventListener("click", pause);
  play();
}

document.addEventListener("astro:before-swap", () => {
  window.clearInterval(carouselTimer);
});
document.addEventListener("astro:page-load", initializePage);
