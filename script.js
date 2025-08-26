//what we want to do, is whenever a form is submitted, we want to take the value of the input, add it as a parameter to the omdb api endpoint, view the data, loop through each result that appears, and for each result, render the html that i made. i guess ill deal with more than 10 results later. but for now lets go.
//ok so what i actually want to do is to use the api to search by the keyword and return an array of movie ids. loop through each of these items and call the api to return the plot, and other things to render it into the html
//what do i want to do now? yeah sub in the reatings
//now what i want to do is to start creating the watchlist.html. decide if it makes sense to share the same .js file, or to create a new one. Then see if localStorage carries across sessions, and then see if you can generate a list of items. then work on the minus buttons.s

let idArray
let watchlist = []

document.getElementById("search-form").addEventListener("submit", (e)=>{
    e.preventDefault()
    const searchQuery = document.getElementById("search-input").value

    fetch(`https://www.omdbapi.com/?apikey=dfd77a18&s=${searchQuery}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            idArray = data.Search.map(result => result.imdbID)
            document.querySelector(".movie-results").innerHTML = ""
            return idArray


        })
        .then(idArray => {
            idArray.forEach(id => {
                fetch(`https://www.omdbapi.com/?apikey=dfd77a18&i=${id}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        document.querySelector(".movie-results").innerHTML += 
                            `<section class="movie-result" id="${data.imdbID}">
                                <div class="movie-meat">
                                    <img class="movie-poster" src=${data.Poster}>
                                    <div class="movie-text">
                                        <div class="movie-header">
                                            <h2>${data.Title}</h2>
                                            <p><span><i class="fa-solid fa-star"></i></span>${data.Ratings[0].Value}</p>
                                        </div>
                                        <div class="movie-info">
                                            <p class="small-text">${data.Runtime}</p>
                                            <p class="small-text">${data.Genre}</p>
                                        </div>
                                        <p class="small-text"><span><i data-watchlist = "${data.imdbID}" class="fa-solid fa-circle-plus"></i></span>Watchlist</p>
                                        <p class="plot">${data.Plot}</p>
                                    </div>
                                </div>
                                <hr>
                            </section>`    
                    })
            })
        })
}
)

document.addEventListener("click", (e)=>{
    if(e.target.dataset.watchlist){
        const targetId = e.target.dataset.watchlist
        console.log(targetId)
        watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
        console.log(watchlist)
        if(watchlist.filter(movie => movie.Id === targetId).length){
            console.log("already added")
        }else{
            fetch(`https://www.omdbapi.com/?apikey=dfd77a18&i=${targetId}`)
                .then(res => res.json())
                .then(data => {
                    watchlist.push(
                        {
                            Title: data.Title,
                            Poster: data.Poster,
                            Runtime: data.Runtime,
                            Genre: data.Genre,
                            Plot: data.Plot,
                            Id: data.imdbID, 
                            Ratings: data.Ratings[0].Value
                        }
                    )
                    localStorage.setItem("watchlist", JSON.stringify(watchlist))
                    // let storedWatchlist = JSON.parse(localStorage.getItem("watchlist"))
                })            
        }
    }
})

//so lets see what happens. when we click the add button, it gets that movie's id, which we use to fetch the data associated with that movie. then we push a new movie object to the watchlist array. then we create a variable in localStorage that stores the watchlist array. 



