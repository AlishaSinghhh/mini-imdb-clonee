const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const API_KEY = "ecb88d1b";

async function fetchMovies(query) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();
    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      searchResults.innerHTML = `<p class="text-center text-danger">${data.Error}</p>`;
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    searchResults.innerHTML = `<p class="text-center text-danger">Something went wrong.</p>`;
  }
}

function displayMovies(movies) {
  searchResults.innerHTML = movies
    .map(
      (movie) => `
        <div class="col-md-4 mb-3">
          <div class="card h-100">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body">
              <h5 class="card-title">${movie.Title}</h5>
              <p class="card-text">Year: ${movie.Year}</p>
              <button class="btn btn-primary" onclick="viewMovie('${movie.imdbID}')">View Details</button>
              <button class="btn btn-warning mt-2" onclick="addToFavorites('${movie.imdbID}', '${movie.Title}', '${movie.Poster}')">Add to Favorites</button>
            </div>
          </div>
        </div>`
    )
    .join("");
}

function viewMovie(imdbID) {
  window.location.href = `movie.html?id=${imdbID}`;
}

function addToFavorites(imdbID, title, poster) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.some((movie) => movie.imdbID === imdbID)) {
    favorites.push({ imdbID, title, poster });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${title} added to favorites.`);
  } else {
    alert(`${title} is already in favorites.`);
  }
}

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim();
  if (query) {
    fetchMovies(query);
  } else {
    searchResults.innerHTML = "";
  }
});
