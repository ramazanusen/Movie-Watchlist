
const apiKey = ""

function getMovieByTitle(moviteTitle, apiKey){
    fetch("https://api.themoviedb.org/3/search/movie?api_key="+apiKey+"&language=en-US&query="+moviteTitle)
        .then(response => response.json())
        .then(data => console.log(data))

    //data üzerinden image backdrop_path(image), 
    //title,
    //description,
    //puanı,
    //film süresi,
    //türü (drama, sci-fi vs),
    //bu verileri çek
}



getMovieByTitle("the matrix", apiKey)