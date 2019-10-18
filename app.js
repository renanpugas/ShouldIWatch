const api_key = require("./api_key.js");
const path = require("path");
const express = require("express");
const request = require("request");
const hbs = require("hbs");

const app = express();

const publicDirectory = path.join(__dirname, "/public");

app.set("view engine", "hbs");
app.use(express.static(publicDirectory));

app.get("/", (req, res, next) =>{
    
    res.render("index");

});

app.get("/search", (req, res, next)=>{

    let movie = req.query.movie;
    let url = `http://www.omdbapi.com/?apikey=${api_key.OMDB}&t=${movie}`;

    request({url, json: true}, (error, { body }) =>{

        if(error){
            return res.send(error);
        }

        res.send(body);

    });

});

app.listen("3000", ()=>{
    console.log("Listen on 3000 port");
});