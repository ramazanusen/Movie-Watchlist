
import {Movie} from movieData.js

const apiKey = "85e0ddaa475644eb02168b3435eb2efb"
const imageUrl = "https://image.tmdb.org/t/p/w200"

const movieListEl = document.querySelector(".movie-list-section")
const searchFieldEl = document.getElementById("search-field")
const searchButtonEl = document.getElementById("search-button")

/*const movieListProperty =
{
    movieId: "",
    movieName: "",
    moviePoster: "",
    movieRating: "",
    movieLength: "",
    movieGenre: [],
    movieDescription: "",
    //belki property yapıp onları arraye doldurabilirim. her bir film için ayrı watchlist yapamadım
}*/

const movieListArray = []

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
        
        movieListProperty.movieId = movieId
        movieListProperty.movieName = data.original_title
        movieListProperty.moviePoster = data.poster_path
        movieListProperty.movieRating = data.vote_average
        movieListProperty.movieLength = data.runtime
        movieListProperty.movieGenre = []
        movieListProperty.movieDescription = data.overview
        
        

        if(data.genres.length > 0){
            for(let i = 0; i < data.genres.length; i++){
                movieListProperty.movieGenre.push(data.genres[i].name)
            }
        }
        else {
            movieListProperty.movieGenre.push("No genre data")
        }

        movieListEl.innerHTML += 
        `
            <div class="movie-tab">
                        <div class="movie-image-container">
                            <img class="movie-image" src="${imageUrl + movieListProperty.moviePoster}">
                        </div>

                        <div class="movie-info-container">
                            <div class="movie-title-container">
                                <h5 class="movie-title">${movieListProperty.movieName}</h5>
                                <p class="star">⭐${movieListProperty.movieRating}</p>
                            </div>

                            <div class="movie-detail-info-container">
                                <p>${movieListProperty.movieLength} min</p>
                                <p>${movieListProperty.movieGenre.join(", ")}</p>
                                <p class="add-watchlist" id="${movieListProperty.movieId}">➕ Watchlist</p> 
                            </div>
                            <p class="movie-description">
                                ${movieListProperty.movieDescription}
                            </p>
                        </div>

                    </div>
        `
        for(let i = 0; i < data.length; i++){
            movieListArray[i] = movieListProperty
        }
        movieListArray.push(movieListProperty)//son gelen datanın hepsini arraya atıyor. diğerleri yok. burada kaldım
        console.log(movieListArray)

        const addWatchListEl = document.querySelector(".add-watchlist")
        addWatchListEl.addEventListener("click", () => 
        {
            console.log(addWatchListEl.getAttribute("id"))
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