const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");
const movieContainer = document.querySelector("#movieContainer");
const loading = document.querySelector("#loading");
const resultText = document.querySelector("#resultText");

async function searchMovie(query){

  if(query === ""){
    alert("Sila masukkan tajuk filem!");
    return;
  }

  movieContainer.innerHTML = "";
  loading.textContent = "Loading...";

  try {

    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${query}`
    );

    const data = await response.json();

    loading.textContent = "";

    resultText.textContent = `${data.length} hasil untuk "${query}"`;

    if(data.length === 0){
      movieContainer.innerHTML = "<h2>Carian tidak dijumpai</h2>";
      return;
    }

    data.forEach(item => {

      const show = item.show;

      const genres = show.genres?.length
        ? show.genres.join(", ")
        : "Tiada genre";

      const year = show.premiered
        ? new Date(show.premiered).getFullYear()
        : "Tiada data";

      const image = show.image?.medium
        || "https://via.placeholder.com/210x295";

      const type = show.type || "Tiada data";

      const rating = show.rating?.average
        ? show.rating.average
        : "N/A";

      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${image}" alt="${show.name}">

        <div class="card-content">
          <h3>${show.name}</h3>

          <p><strong>Type:</strong> ${type}</p>

          <p><strong>Genre:</strong> ${genres}</p>

          <p><strong>Tahun:</strong> ${year}</p>

          <p><strong>Rating:</strong> ${rating}</p>
        </div>
      `;

      movieContainer.appendChild(card);

    });

  } catch(error){

    loading.textContent = "";
    movieContainer.innerHTML = "<h2>Ralat mendapatkan data API</h2>";

    console.log(error);

  }

}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  searchMovie(query);
});

function quickSearch(movieName){
  searchInput.value = movieName;
  searchMovie(movieName);
}