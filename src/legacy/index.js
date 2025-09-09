// ===== Constants =====
const searchBtn = document.querySelector(".search__button");
const searchInput = document.getElementById("searchInput");
const title = document.querySelector(".header__title");
const subtitle = document.querySelector(".header__sub-title");

// ===== Event Listeners =====
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});

function handleSearch() {
  const userInput = searchInput.value.trim();
  if (userInput) {
    window.location.href = `search.html?title=${encodeURIComponent(userInput)}`;
  }
}

// ===== Burger Menu =====
function openMenu() {
  document.body.classList.add("menu--open");
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

// ===== Page Load Transition & Header Fade =====
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  title.classList.add("fade-in");
  setTimeout(() => subtitle.classList.add("fade-in"), 500);
});