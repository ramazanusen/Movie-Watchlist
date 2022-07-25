
const apiKey = ""
const imageUrl = "https://image.tmdb.org/t/p/w200"

const movieListEl = document.querySelector(".movie-list-section")
const watchlistEl = document.querySelector(".watchlist-section")
const searchFieldEl = document.getElementById("search-field")
const searchButtonEl = document.getElementById("search-button")
const myWatchListEl = document.getElementById("my-watchlist")

let movieListArray = []
let movieTabNum = 0
let watchlistMovie = ""

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
    movieTabNum = 0
    movieListArray = []
    fetch("https://api.themoviedb.org/3/movie/" + movieId +"?api_key=" + apiKey + "&language=en-US")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        const Movie = {
            movieId: movieId,
            movieName: data.original_title,
            moviePoster: data.poster_path,
            movieRating : data.vote_average,
            movieLength : data.runtime,
            movieGenre : [],
            movieDescription: data.overview
        }

        movieListArray.push(Movie)
        console.log(movieListArray)
        
        if(data.genres.length > 0){
            for(let i = 0; i < data.genres.length; i++){
                Movie.movieGenre.push(data.genres[i].name)
            }
        }
        else {
            Movie.movieGenre.push("No genre data")
        }

            movieListEl.innerHTML += 
            `
                <div class="movie-tab" id="movie-tab-${movieTabNum}">
                            <div class="movie-image-container">
                                <img class="movie-image" src="${imageUrl + movieListArray[movieTabNum].moviePoster}">
                            </div>

                            <div class="movie-info-container">
                                <div class="movie-title-container">
                                    <h5 class="movie-title">${movieListArray[movieTabNum].movieName}</h5>
                                    <p class="star">⭐${movieListArray[movieTabNum].movieRating}</p>
                                </div>

                                <div class="movie-detail-info-container">
                                    <p>${movieListArray[movieTabNum].movieLength} min</p>
                                    <p>${movieListArray[movieTabNum].movieGenre.join(", ")}</p>
                                    <p class="add-watchlist" id="${movieTabNum}">➕ Watchlist</p> 
                                </div>
                                <p class="movie-description">
                                    ${movieListArray[movieTabNum].movieDescription}
                                </p>
                            </div>
                        </div>
            `
        
        movieTabNum += 1
        const addWatchListEl = document.querySelectorAll(".add-watchlist")
        addWatchListEl.forEach(addWatchList => {
            addWatchList.addEventListener("click", () => {
                getMovieInfo(addWatchList.getAttribute("id"))
            })
        })
        
    })
    
}

function getMovieInfo (tabId) {
    localStorage.setItem("movie"+tabId, JSON.stringify(movieListArray[tabId]))
    watchlistMovie = JSON.parse(localStorage.getItem("movie"+tabId))
    console.log("MY WATCHLIST: " + watchlistMovie)
}

searchButtonEl.addEventListener("click", getValue)

function getValue() {
    clearMovieList()
    getMovieById(searchFieldEl.value, apiKey)
}

function clearMovieList() {
    movieListEl.innerHTML = ""
}

document.getElementById("my-watchlist")?.addEventListener("click", () => {
    writeWatchlist()
})

function writeWatchlist (){
    clearMovieList()
    console.log("MY WATCHLIST: " + watchlistMovie.movieName)
    for(let i = 0; i < localStorage.length; i++){
        movieListEl.innerHTML += 
        `
            <div class="movie-tab" id="movie-tab-${movieTabNum}">
                <div class="movie-image-container">
                    <img class="movie-image" src="${imageUrl + JSON.parse(localStorage.getItem('movie' + i)).moviePoster}">
                </div>

                <div class="movie-info-container">
                    <div class="movie-title-container">
                        <h5 class="movie-title">${JSON.parse(localStorage.getItem('movie' + i)).movieName}</h5>
                        <p class="star">⭐${JSON.parse(localStorage.getItem('movie' + i)).movieRating}</p>
                    </div>

                    <div class="movie-detail-info-container">
                        <p>${JSON.parse(localStorage.getItem('movie' + i)).movieLength} min</p>
                        <p>${JSON.parse(localStorage.getItem('movie' + i)).movieGenre.join(", ")}</p>
                        <p class="add-watchlist" id="${movieTabNum}">➕ Watchlist</p> 
                    </div>
                    <p class="movie-description">
                        ${JSON.parse(localStorage.getItem('movie' + i)).movieDescription}
                    </p>
                </div>
            </div>
        `
    }
}