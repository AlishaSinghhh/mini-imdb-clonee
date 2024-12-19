const favouritesList = document.getElementById("favouritesList");

function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    favouritesList.innerHTML = `<p class="text-center text-muted">No favorite movies added yet.</p>`;
    return;
  }

  favouritesList.innerHTML = favorites
    .map(
      (movie) => `
        <div class="col-md-4 mb-3">
          <div class="card h-100">
            <img src="${movie.poster}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <button class="btn btn-danger" onclick="removeFromFavorites('${movie.imdbID}')">Remove</button>
            </div>
          </div>
        </div>`
    )
    .join("");
}

function removeFromFavorites(imdbID) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((movie) => movie.imdbID !== imdbID);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

renderFavorites();
