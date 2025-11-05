// Import the Movies component from the relative path
import Movies from "./Movies.jsx"
import { useEffect, useState } from "react"; //import useState
import axios from 'axios';

// Define and export a functional component called Read
export default function Read() {

  const [myMovies, setMovie] = useState([]); //gives access to a global variable

  useEffect(
    () => {
      //do some http client work
      axios.get('http://localhost:3000/api/movies') //pass the GET method to read http response from url
        .then(
          (response) => {  //if comes back with OK, execute this code
            console.log(response.data.myArray);
            setMovie(response.data.myArray);
          }
        ) 
        .catch(
          (error) => { //if error log error in console
            console.log(error);
          }
        ); 


    }, [] //code will only get executed once

  ); //for giving us a component life cycle hook (if something changes run this)

  // The component returns JSX to render
  return (
    <div>
      {/* Heading for the movie list */}
      <h1>Movie List</h1>

      {/* Render the Movies component */}
      <Movies myMovies={myMovies} ></Movies>
    </div>
  )
}