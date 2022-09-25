
const apiKey = ""
const imageUrl = "https://image.tmdb.org/t/p/w200"

const movieListEl = document.querySelector(".movie-list-section")
const watchlistEl = document.querySelector(".watchlist-section")
const searchBarContainerEl = document.querySelector(".search-container")
const searchFieldEl = document.getElementById("search-field")
const searchButtonEl = document.getElementById("search-button")
const myWatchListEl = document.getElementById("my-watchlist")
const searchForMoviesEl = document.getElementById("search-for-movies");
const clearStorageEl = document.getElementById("clear-storage")
const showStorageEl = document.getElementById("show-storage")
const findYourFilmTitleEl = document.getElementById("find-your-film")


let movieListArray = []
let movieTabNum = 0
let watchlistMovieList = []

function getMovieByName(moviteTitle, apiKey){
    fetch("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + moviteTitle + "&include_adult=false")
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < data.results.length; i++){
                getMovieTitleById(data.results[i].id, apiKey)
            }
        })
}

function getMovieTitleById(movieId, apiKey) {
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
                                    <p class="star">⭐${(movieListArray[movieTabNum].movieRating).toFixed(1)}</p>
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
        addWatchListEl.forEach(addWatchListItem => {
            addWatchListItem.addEventListener("click", () => {
                getMovieInfo(addWatchListItem.getAttribute("id"))
            })
        })  
    })
    .catch((error) => {
        throw error
    })
}

function getMovieInfo (tabId) {
    localStorage.setItem(movieListArray[tabId].movieId, JSON.stringify(movieListArray[tabId]))
    console.log(JSON.parse(localStorage.getItem("movie" + tabId)))
}

/**********SEARCH BUTTON ****************/
searchButtonEl.addEventListener("click", getSearchValueFromUser)

function getSearchValueFromUser() {
    clearMovieList()
    getMovieByName(searchFieldEl.value, apiKey)
}
/**********SEARCH BUTTON ****************/

function clearMovieList() {
    movieListEl.innerHTML = ""
}

/*************LOCAL STORAGE**************/

clearStorageEl.addEventListener("click", clearLocalStorage)

showStorageEl.addEventListener("click", showLocalStorage)

myWatchListEl.addEventListener("click", () => {
    myWatchListEl.classList.add("hide-element")
    myWatchListEl.classList.remove("show-element")
    searchForMoviesEl.classList.remove("hide-element")
    searchForMoviesEl.classList.add("show-element")
    searchBarContainerEl.classList.add("hide-element")
    findYourFilmTitleEl.innerHTML = `<h1 id="find-your-film">My Watchlist</h1>`
    showLocalStorage()
})


searchForMoviesEl.addEventListener("click", () => {
    myWatchListEl.classList.add("show-element")
    myWatchListEl.classList.remove("hide-element")
    searchForMoviesEl.classList.add("hide-element")
    searchForMoviesEl.classList.remove("show-element")
    searchBarContainerEl.classList.remove("hide-element")
    findYourFilmTitleEl.innerHTML = `<h1 id="find-your-film">Find your film</h1>`
    getSearchValueFromUser()
})

function showLocalStorage() {
    clearMovieList()
    for (let i = 0; i < localStorage.length; i++) {
        console.log("local storage items: " + localStorage.key(i))
        console.log(JSON.parse(localStorage.getItem(localStorage.key(i))).movieName)
        

        movieListEl.innerHTML +=
            `
                <div class="movie-tab">
                            <div class="movie-image-container" id="movie-tab-${JSON.parse(localStorage.getItem(localStorage.key(i))).movieId}">
                                <img class="movie-image" src="${imageUrl + JSON.parse(localStorage.getItem(localStorage.key(i))).moviePoster}">
                            </div>

                            <div class="movie-info-container">
                                <div class="movie-title-container">
                                    <h5 class="movie-title">${JSON.parse(localStorage.getItem(localStorage.key(i))).movieName}</h5>
                                    <p class="star">⭐${(JSON.parse(localStorage.getItem(localStorage.key(i))).movieRating).toFixed(1)}</p>
                                </div>

                                <div class="movie-detail-info-container">
                                    <p>${JSON.parse(localStorage.getItem(localStorage.key(i))).movieLength} min</p>
                                    <p>${JSON.parse(localStorage.getItem(localStorage.key(i))).movieGenre.join(", ")}</p>
                                    <p class="delete-watchlist" id="${JSON.parse(localStorage.getItem(localStorage.key(i))).movieId}">➖ Remove</p> 
                                </div>
                                <p class="movie-description">
                                    ${JSON.parse(localStorage.getItem(localStorage.key(i))).movieDescription}
                                </p>
                            </div>
                        </div>
            `
        const watchlistRemoveEl = document.querySelectorAll(".delete-watchlist")
        watchlistRemoveEl.forEach(deleteWatchListButton => {
            deleteWatchListButton.addEventListener("click", () => {
                removeItemFromWatchlist(deleteWatchListButton.getAttribute("id"))
            })
        })
    }
    
    console.log("Local storage lenght: " + localStorage.length)
    console.log("SHOWED LOCAL STORAGE")
}

function removeItemFromWatchlist(keyNumber){
    console.log("Item " + keyNumber + "removed from watchlist.")
    localStorage.removeItem(keyNumber)
    showLocalStorage()
}

function clearLocalStorage(){
    localStorage.clear()
    showLocalStorage()
    console.log("Local Storage Cleared!")
}
/*************LOCAL STORAGE**************/


//************WATCHLIST SECTION************

/*document.getElementById("my-watchlist").addEventListener("click", () => {
    writeWatchlist()
}) 

function writeWatchlist (){
    clearMovieList()

    console.log(watchlistMovieList.movieName)

    searchFieldEl.value = ""
    console.log("MY WATCHLIST: " + watchlistMovieList.movieName)
    watchlistEl.innerHTML += 
    `<p>BURADA FİLM OLACAK MI</p>
        <div class="movie-tab" id="movie-tab-${movieTabNum}">
            <div class="movie-image-container">
                <img class="movie-image" src="${imageUrl + watchlistMovieList.moviePoster}">
            </div>

            <div class="movie-info-container">
                <div class="movie-title-container">
                    <h5 class="movie-title">${watchlistMovieList.movieName}</h5>
                    <p class="star">⭐${watchlistMovieList.movieRating}</p>
                </div>

                <div class="movie-detail-info-container">
                    <p>${watchlistMovieList.movieLength} min</p>
                    <p>${watchlistMovieList.movieGenre.join(", ")}</p>
                    <p class="add-watchlist" id="${movieTabNum}">➕ Watchlist</p> 
                </div>
                <p class="movie-description">
                    ${watchlistMovieList.movieDescription}
                </p>
            </div>
        </div>
    `
}*/

//************WATCHLIST SECTION************