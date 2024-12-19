const movieDetails = document.getElementById("movieDetails");
const API_KEY = "ecb88d1b"; // Replace with your OMDB API key

async function fetchMovieDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const imdbID = urlParams.get("id");

  if (!imdbID) {
    movieDetails.innerHTML = `<p class="text-center text-danger">Movie not found.</p>`;
    return;
  }

  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === "True") {
      displayMovieDetails(data);
    } else {
      movieDetails.innerHTML = `<p class="text-center text-danger">${data.Error}</p>`;
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    movieDetails.innerHTML = `<p class="text-center text-danger">Something went wrong.</p>`;
  }
}

function displayMovieDetails(movie) {
  movieDetails.innerHTML = `
    <div class="col-12 text-center">
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" class="img-fluid" alt="${movie.Title}">
      <h2 class="mt-3">${movie.Title}</h2>
      <p><strong>Plot:</strong> ${movie.Plot}</p>
      <p><strong>Director:</strong> ${movie.Director}</p>
      <p><strong>Actors:</strong> ${movie.Actors}</p>
      <p><strong>Genre:</strong> ${movie.Genre}</p>
      <p><strong>Released:</strong> ${movie.Released}</p>
    </div>
  `;
}

fetchMovieDetails();
