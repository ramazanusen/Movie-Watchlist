
const apiKey = ""
const movieListEl = document.querySelector(".movie-list-section")

function getMovieByTitle(moviteTitle, apiKey){
    fetch("https://api.themoviedb.org/3/search/movie?api_key="+apiKey+"&language=en-US&query="+moviteTitle+"&include_adult=false")
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < data.results.length; i++){
                console.log(data.results[i])
                movieListEl.innerHTML += `
                    <div class="movie-tab">
                        <div class="movie-image-container">
                            <img class="movie-image" src="images/blade-runner.jpg">
                        </div>

                        <div class="movie-info-container">
                            <div class="movie-title-container">
                                <h5 class="movie-title">${data.results[i].original_title}</h5>
                                <p class="star">⭐${data.results[i].vote_average}</p>
                            </div>
                            
                            <div class="movie-detail-info-container">
                                <p>116 min</p>
                                <p>Drama, Mystery, Sci-fi</p>
                                <p>➕ Watchlist</p>
                            </div>
                            <p class="movie-description">
                                A blade runner must pursue and terminate 
                                four replicants who stole a ship in space, 
                                and have returned to Earth to find
                                their creator.
                            </p>
                        </div>

                    </div>
                `
            }
        })

    //data üzerinden image backdrop_path(image), 
    //title,
    //description,
    //puanı,
    //film süresi,
    //türü (drama, sci-fi vs),
    //bu verileri çek

    //bu data'dan gelen bilgileri global variable içlerine atıp en son dizmek daha temiz. ç
    //çünkü fetch edilen url'de her bilgi olmayabiliyor.
}




getMovieByTitle("the matrix", apiKey)