document.querySelector("form").addEventListener("submit", (e)=>{

    e.preventDefault();

    let search = document.querySelector("input").value;
    let dataMovie = document.querySelector(".data-movie");
    let title = document.querySelector("#title");
    let imdb = document.querySelector("#imdb");
    let tomatoes = document.querySelector("#tomatoes");
    let metacritic = document.querySelector("#metacritic");
    let img = document.querySelector("img.poster");
    let awards = document.querySelector("#awards");
    let overallScore = document.querySelector("#overall-score");

    fetch(`/search?movie=${search}`).then(response =>{
        response.json().then(result =>{

            console.log("responseeeeeee", result);
            console.log(result);
            dataMovie.style.display = "block";
            title.textContent = result.Resp.Director;
            imdb.textContent = result.Ratings[0].Value;
            tomatoes.textContent = result.Ratings[1].Value;
            metacritic.textContent = result.Ratings[2].Value;
            awards.textContent = result.Awards;
            img.src = result.Poster;

            let score = calcAverage(result.Ratings[0], result.Ratings[1], result.Ratings[2]);

            overallScore.textContent = score;
        });
    }).catch((error)=>{
        console.log(error);
    });

});

function calcAverage(imdb, tomatoes, metacritic){

    let imdbScore = parseInt(imdb.Value.replace(".", ""));
    let tomatoesScore = parseInt(tomatoes.Value.replace("%", ""));
    let metacriticScore = parseInt(tomatoes.Value.replace("/100", ""));

    let score = (imdbScore + tomatoesScore + metacriticScore) / 3;
    score = score.toFixed(1);

    return score;
};