
import {Movie} from './movieData.js'

const apiKey = "85e0ddaa475644eb02168b3435eb2efb"
const imageUrl = "https://image.tmdb.org/t/p/w200"

const movieListEl = document.querySelector(".movie-list-section")
const searchFieldEl = document.getElementById("search-field")
const searchButtonEl = document.getElementById("search-button")

let movieListArray = []
let movieTabNum = 0

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
        movieTabNum += 1
        const addWatchListEl = document.querySelector(".add-watchlist")
        //const movieWatchlistId = addWatchListEl.getAttribute("id")
        addWatchListEl.addEventListener("click", () => 
        {
            getMovieInfo(movieTabNum) //burada kaldım. waathclist hala tek bir şeyi basıyor.
            console.log("ID of this element: "+this.id)
        })
    })
    
}

function getMovieInfo (tabID) {
    console.log(movieListArray[tabID])
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