/* ===== CONSTANTS ===== */
const searchInput = document.getElementById("searchInput");
const searchBtn = document.querySelector(".search__button");
const movieLinks = document.querySelector(".movie__links");
const titleEl = document.querySelector(".search__results--title");
const emptyEl = document.querySelector(".search__results--empty");
const loadingEl = document.querySelector(".search__loading");
const spinnerEl = document.querySelector(".search__loading--spinner");
const termEl = document.querySelector(".searching__term");
const statusEl = document.querySelector(".search__status");
const filterDropdown = document.getElementById("filter");

let latestMovies = [];
let selectedSort = "default";

/* ===== PAGE LOAD ===== */
window.addEventListener("load", () => {
  document.body.classList.remove("menu--open");
  document.body.classList.add("loaded");

  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");
  const sort = params.get("sort");

  if (sort) {
    selectedSort = sort;
    filterDropdown.value = sort;
  }

  if (title) getMovies(title);
});

/* ===== BURGER MENU ===== */
function openMenu() {
  document.body.classList.add("menu--open");
}
function closeMenu() {
  document.body.classList.remove("menu--open");
}

/* ===== NAV DELAY ===== */
function delayedNav(e, url) {
  e.preventDefault();
  closeMenu();
  setTimeout(() => (window.location.href = url), 200);
}

/* ===== SEARCH EVENTS ===== */
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener(
  "keydown",
  (e) => e.key === "Enter" && handleSearch()
);

function handleSearch() {
  const userInput = searchInput.value.trim();
  const sortValue = filterDropdown.value;

  if (userInput) {
    const query = `search.html?title=${encodeURIComponent(
      userInput
    )}&sort=${encodeURIComponent(sortValue)}`;
    window.location.href = query;
  }
}

/* ===== FILTER EVENT ===== */
filterDropdown.addEventListener("change", (e) => {
  selectedSort = e.target.value;
  if (latestMovies.length) {
    filterMovies(latestMovies);
  }
});

/* ===== FETCH MOVIES ===== */
async function getMovies(title) {
  termEl.textContent = `"${title}"`;
  statusEl.classList.add("visible");
  loadingEl.style.opacity = "1";
  spinnerEl.style.display = "block";

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=21fba792&s=${encodeURIComponent(title)}`
    );
    const data = await res.json();

    setTimeout(() => {
      loadingEl.style.opacity = "0";
      spinnerEl.style.display = "none";

      if (data.Response === "True") {
        latestMovies = data.Search.slice(0, 6);
        filterMovies(latestMovies); // uses selectedSort
        titleEl.textContent = `${latestMovies.length} result${
          latestMovies.length !== 1 ? "s" : ""
        } for: "${title}"`;
        titleEl.classList.add("visible");
        emptyEl.classList.remove("visible");
        statusEl.classList.remove("visible");
      } else {
        movieLinks.innerHTML = "";
        titleEl.textContent = `Search results for: "${title}"`;
        titleEl.classList.add("visible");
        emptyEl.classList.add("visible");
        statusEl.classList.remove("visible");
      }
    }, 1500);
  } catch (err) {
    console.error("Error fetching movies:", err);
    loadingEl.style.opacity = "0";
    spinnerEl.style.display = "none";
  }
}

/* ===== FILTER & DISPLAY ===== */
function filterMovies(movies, selectedSort) {
  const sorted = [...movies];

  if (selectedSort === "YEAR_ASC") {
    sorted.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  } else if (selectedSort === "YEAR_DESC") {
    sorted.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  } else if (selectedSort === "RATING_ASC") {
    sorted.sort((a, b) => parseFloat(a.imdbRating) - parseFloat(b.imdbRating));
  } else if (selectedSort === "RATING_DESC") {
    sorted.sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));
  }

  displayMovies(sorted);
}

function displayMovies(movies) {
  movieLinks.innerHTML = movies
    .map(({ Title, Year, imdbID, Poster }) => {
      const hasPoster = Poster !== "N/A";
      return `
      <div class="movie">
        <div class="movie__info">
          ${
            hasPoster
              ? `<img src="${Poster}" class="movie__poster" alt="${Title} Poster"
                onerror="this.outerHTML='<div class=\\'movie__poster movie__poster--missing\\'>No Poster Available</div>'"/>`
              : `<div class="movie__poster movie__poster--missing">No Poster Available</div>`
          }
          ${
            hasPoster
              ? `<a href="${Poster}" target="_blank" class="modal__movie" alt="${Title} Poster">
                 <span class="movie__overlay-text">🖼️ Get Poster</span>
               </a>`
              : ""
          }
        </div>
        <div class="movie__description">
          <p class="movie__title">🎬 ${Title}</p>
          <p class="movie__year">📆 ${Year}</p>
          ${
            imdbID
              ? `<a class="movie__imdb" href="https://www.imdb.com/title/${imdbID}" target="_blank">
                   🔗 <span class="movie__imdb--text">IMDb</span>
                 </a>`
              : `<span class="movie__imdb movie__imdb--disabled">🚫 No IMDb link</span>`
          }
        </div>
      </div>
    `;
    })
    .join("");
}
