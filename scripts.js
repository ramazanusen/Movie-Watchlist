
import {Movie} from './movieData.js'

const apiKey = "85e0ddaa475644eb02168b3435eb2efb"
const imageUrl = "https://image.tmdb.org/t/p/w200"

const movieListEl = document.querySelector(".movie-list-section")
const searchFieldEl = document.getElementById("search-field")
const searchButtonEl = document.getElementById("search-button")


let movieListArray = []

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
    movieListArray = []
    fetch("https://api.themoviedb.org/3/movie/" + movieId +"?api_key=" + apiKey + "&language=en-US")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        Movie.movieId = movieId
        Movie.movieName = data.original_title
        Movie.moviePoster = data.poster_path
        Movie.movieRating = data.vote_average
        Movie.movieLength = data.runtime
        Movie.movieGenre = []
        Movie.movieDescription = data.overview

        movieListArray.push(Object.entries(Movie))
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
            <div class="movie-tab">
                        <div class="movie-image-container">
                            <img class="movie-image" src="${imageUrl + Movie.moviePoster}">
                        </div>

                        <div class="movie-info-container">
                            <div class="movie-title-container">
                                <h5 class="movie-title">${Movie.movieName}</h5>
                                <p class="star">⭐${Movie.movieRating}</p>
                            </div>

                            <div class="movie-detail-info-container">
                                <p>${Movie.movieLength} min</p>
                                <p>${Movie.movieGenre.join(", ")}</p>
                                <p class="add-watchlist" id="${Movie.movieId}">➕ Watchlist</p> 
                            </div>
                            <p class="movie-description">
                                ${Movie.movieDescription}
                            </p>
                        </div>
                    </div>
        `
        
        const addWatchListEl = document.querySelector(".add-watchlist")
        //const movieWatchlistId = addWatchListEl.getAttribute("id")
        addWatchListEl.addEventListener("click", () => 
        {
            console.log(movieId)
        })
    })
}

searchButtonEl.addEventListener("click", getValue)

function getValue() {
    clearMovieList()
    getMovieById(searchFieldEl.value, apiKey)
}

function clearMovieList() {
    movieListEl.innerHTML = ""
}

//enter tuşuna basınca arama yapsın
//watchliste ile localstorage'a film ekleme yapalım