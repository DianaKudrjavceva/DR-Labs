import express from 'express'; //allows us to use express package
const app = express();
const port = 3000;

import cors from 'cors'; // cant access server through client without this extension
app.use(cors());

app.use(function (req, res, next) { // allows access from server to client
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


import bodyParser from 'body-parser'; // body parser library imported
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 


app.get('/api/movies', (req, res) => {
    const myMovies = [ // const array named myMovies holding movie data

        {
            "Title": "Avengers: Infinity War (server)",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
            "Title": "Captain America: Civil War (server)",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
        },
        {
            "Title": "World War Z (server)",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
        }

    ]
    res.json({ myArray: myMovies }); // response is presented in JSON format
})



app.post('/api/movies', (req, res) => { //posts data from form to server console
    console.log(req.body); //logs movie data from form
    res.send('POST request to the main endpoint');
})
app.listen(port, () => { //identifies port and listens on it
    console.log(`Server is running on http://localhost:${port}`);
});