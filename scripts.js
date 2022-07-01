
const apiKey = ""
const movieListEl = document.querySelector(".movie-list-section")
const imageUrl = "https://image.tmdb.org/t/p/w200"

function getMovieById(moviteTitle, apiKey){
    fetch("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + moviteTitle + "&include_adult=false")
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < data.results.length; i++){
                getMovieTitle(data.results[i].id, apiKey)
            }
        })
}

function getMovieTitle(movieId, apiKey) {
    fetch("https://api.themoviedb.org/3/movie/" + movieId +"?api_key=" + apiKey + "&language=en-US")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const movieGenre = []
        const movieRating = data.vote_average

        if(data.genres.length > 0){
            for(let i = 0; i < data.genres.length; i++){
                movieGenre.push(data.genres[i].name)
            }
        }
        else {
            movieGenre.push("No genre data")
        }

       
        movieListEl.innerHTML += `
            <div class="movie-tab">
                        <div class="movie-image-container">
                            <img class="movie-image" src="${imageUrl+data.poster_path}">
                        </div>

                        <div class="movie-info-container">
                            <div class="movie-title-container">
                                <h5 class="movie-title">${data.original_title}</h5>
                                <p class="star">⭐${movieRating}</p>
                            </div>
                            
                            <div class="movie-detail-info-container">
                                <p>${data.runtime} min</p>
                                <p>${movieGenre.join(", ")}</p>
                                <p id="add-watchlist">➕ Watchlist</p> 
                            </div>
                            <p class="movie-description">
                                ${data.overview}
                            </p>
                        </div>

                    </div>
        `
    })
}

getMovieById("matrix", apiKey)