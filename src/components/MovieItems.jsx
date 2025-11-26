import { useEffect } from "react";
import Card from 'react-bootstrap/Card'; // import card styling and functionality from bootstrap
import { Link } from 'react-router-dom'; // import Link from router routes
import axios from "axios";
import Button from 'react-bootstrap/Button'; // import button styling and functionality from bootstrap

const MovieItem = (props) => {

  //function to handle deleting moviwe items
   const handleDelete = (e) => {
        e.preventDefault(); //prevents automatic page reloading
        axios.delete('http://localhost:3000/api/movies/' + props.mymovie._id) //finds item at thios url with specific movie id and deletes it
            .then(() => {
                props.Reload(); // Refresh the movie list after deletion
            })
            .catch((error) => {
                console.error("Error deleting movie:", error); //else log error
            });
    };

  // useEffect runs when 'mymovie' prop changes
  useEffect(() => {
    // Only log if 'mymovie' prop is defined to avoid errors
    if (props.myMovie) {
      console.log("Movie Item:", props.myMovie);
    }
  }, [props.mymovie]); // Dependency array to run effect on 'mymovie' changes

  // If 'mymovie' exists, render the movie details inside a Bootstrap Card
  return (
    <div>
      <Card className="text-center">
        {/* Movie title displayed in the Card header */}
        <Card.Header>{props.mymovie.title}</Card.Header>

        <Card.Body>
          <blockquote className="blockquote mb-0">
            {/* Movie poster image with alt text for accessibility */}
            <img src={props.mymovie.poster} alt={props.mymovie.title} />
            {/* Movie release year displayed in the footer */}
            <footer>{props.mymovie.year}</footer>
          </blockquote>
        </Card.Body>

        <Link to={"/edit/" + props.mymovie._id} className="btn btn-primary">Edit</Link> {/* Redirect to /edit/movie_id url path when button is clicked */}
      </Card>

      <div>
            {/* Other movie details */}
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
    </div>
  );

  
}

export default MovieItem;