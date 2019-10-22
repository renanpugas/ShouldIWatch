const path = require("path");
const express = require("express");
const request = require("request-promise-native");
const hbs = require("hbs");
const api_key = require("./api_key");
const calcScore = require("./src/calcScore");

const app = express();

const publicDirectory = path.join(__dirname, "/public");

app.set("view engine", "hbs");
app.use(express.static(publicDirectory));

app.get("/", (req, res, next) =>{
    
    res.render("index");

});

app.get("/search", async (req, res, next)=>{

    let movie = req.query.movie;
    let urlOMDB = `http://www.omdbapi.com/?apikey=${api_key.OMDB}&t=${movie}`;
    let urlMyApi = "https://www.myapifilms.com/imdb/idIMDB?title=la+la+land&token=337c8d2f-adab-4020-85cf-a8ee0e4b69ee&format=json&language=pt-br&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=0&movieTrivia=0&awards=1&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0&goofs=0&keyword=0&quotes=0&fullSize=0&companyCredits=0&filmingLocations=0";

    try {
        const omdbResp = await request({uri: urlOMDB, json: true});
        const myAPIResp = await request({uri: urlMyApi, json: true}); 

        res.send({omdbResp, myAPIResp});

    } catch(e){
        return res.send(e);
    }


});

app.listen("3000", ()=>{
    console.log("Listen on 3000 port");
});