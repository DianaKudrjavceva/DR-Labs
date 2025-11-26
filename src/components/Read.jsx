// Import the Movies component from the relative path
import Movies from "./Movies.jsx" //import movies component from movies file
import { useEffect, useState } from "react"; //import useState
import axios from 'axios';

// Define and export a functional component called Read
export default function Read() {

  const [data, setMovie] = useState([]); //gives access to a global variable

  const Reload = () => { //reload function
    console.log("Reloading movie data...");
    axios.get('http://localhost:3000/api/movies') //gets data at url
      .then((response) => {
        setMovie(response.data.myArray); // gets each movie from the array
      })
      .catch((error) => {
        console.error("Error reloading data:", error);
      });
  };


  // //do some http client work
  // axios.get('http://localhost:3000/api/movies') //pass the GET method to read http response from url
  //   .then(
  //     (response) => {  //if comes back with OK, execute this code
  //       console.log(response.data.myArray);
  //       setMovie(response.data.myArray);
  //     }
  //   )
  //   .catch(
  //     (error) => { //if error log error in console
  //       console.log(error);
  //     }
  //   );



  useEffect(() => {
    Reload(); // calls the reload function
  }, []);

  //for giving us a component life cycle hook (if something changes run this)

  // The component returns JSX to render
  return (


    <div>
      <h2>Movie List</h2>
      <Movies myMovies={data} ReloadData={Reload} /> {/* Display newest data after reload */}
    </div>

  )
}