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


import mongoose from 'mongoose'; //import mongoose library 
mongoose.connect('mongodb+srv://admin:admin@datarepcluster.vhxqfjf.mongodb.net/?appName=DataRepCluster'); //connect cluster to server

const movieSchema = new mongoose.Schema({ //creates a schema
    title: String, //stores same values as before
    year: String,
    poster: String
});


const movieModel = mongoose.model('Movie', movieSchema); //generates model to use later, holds Movie model and its schema

// app.get('/api/movies', (req, res) => {
//     const myMovies = [ // const array named myMovies holding movie data

//         {
//             "Title": "Avengers: Infinity War (server)",
//             "Year": "2018",
//             "imdbID": "tt4154756",
//             "Type": "movie",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
//         },
//         {
//             "Title": "Captain America: Civil War (server)",
//             "Year": "2016",
//             "imdbID": "tt3498820",
//             "Type": "movie",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
//         },
//         {
//             "Title": "World War Z (server)",
//             "Year": "2013",
//             "imdbID": "tt0816711",
//             "Type": "movie",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
//         }

//     ]
//     res.json({ myArray: myMovies }); // response is presented in JSON format
// })


app.post('/api/movies', async (req, res) => { //run method asyncronously

    const { title, year, poster } = req.body; //says values are in body

    const newMovie = new movieModel({ title, year, poster }); //new object created
    await newMovie.save(); //don't pass next method until finished

    res.status(201).json({ message: 'Movie created successfully', movie: newMovie }); //when status successful, log message and object entry
    console.log(newMovie); //log every new entry in server console
})


app.get('/api/movies', async (req, res) => { //gets data from url
  const movies = await movieModel.find({}); //reads every record in model, waits until everything is found
  res.json({myArray: movies}); //returns back the database model 
});

app.get('/api/movies/:id', async (req, res) => { //get url with specific movie id
  const movie = await movieModel.findById(req.params.id); //wait until found
  res.send(movie); //display 
});

app.get('/api/movies/:id', async (req, res) => { //get url of movie id to edit
    let movie = await movieModel.findById({ _id: req.params.id }); //find the associated id
    res.send(movie); //send it forward
});

app.put('/api/movies/:id', async (req, res) => { //edit at this id at this url
    let movie = await movieModel.findByIdAndUpdate(req.params.id, req.body, { new: true }); //wait for updated information
    res.send(movie); //send back new updated information
});

app.delete('/api/movies/:id', async (req, res) => { //delete whatever entry is at this url with this movie id
  
    console.log('Deleting movie with ID:', req.params.id); //log deletion in console
    const movie = await movieModel.findByIdAndDelete(req.params.id); // wait for deletion to be complete
    res.status(200).send({ message: "Movie deleted successfully", movie }); //respond with success status
        
});

app.listen(port, () => { //identifies port and listens on it
    console.log(`Server is running on http://localhost:${port}`);
});