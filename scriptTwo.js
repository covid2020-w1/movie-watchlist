let storedWatchlist = JSON.parse(localStorage.getItem("watchlist"))

document.querySelector("main").style.flex = "0"

renderHtml()

document.addEventListener("click", (e)=>{
    if(e.target.dataset.watchlist){
        const targetId = e.target.dataset.watchlist
        //identify the object in the watchlist array with an Id of targetId (use filter) and splice it from the array.
        //once you 
        const targetObj = storedWatchlist.filter(movie => movie.Id === targetId)[0]
        const targetIndex = storedWatchlist.indexOf(targetObj)
        storedWatchlist.splice(targetIndex, 1)
        console.log(storedWatchlist)
        localStorage.setItem("watchlist", JSON.stringify(storedWatchlist))  
        renderHtml()       
    }
})

//then 

function renderHtml(){
    console.log(storedWatchlist)
    document.querySelector(".movie-results").innerHTML = storedWatchlist.map(movie =>
        `<section class="movie-result" id="${movie.imdbID}">
            <div class="movie-meat">
                <img class="movie-poster" src=${movie.Poster}>
                <div class="movie-text">
                    <div class="movie-header">
                        <h2>${movie.Title}</h2>
                        <p><span><i class="fa-solid fa-star"></i></span>${movie.Ratings}</p>
                    </div>
                    <div class="movie-info">
                        <p class="small-text">${movie.Runtime}</p>
                        <p class="small-text">${movie.Genre}</p>
                    </div>
                    <p class="small-text"><span><i data-watchlist = "${movie.Id}" class="fa-solid fa-circle-minus"></i></span>Watchlist</p>
                    <p class="plot">${movie.Plot}</p>
                </div>
            </div>
            <hr>
        </section>`    
    ).join("") 
}