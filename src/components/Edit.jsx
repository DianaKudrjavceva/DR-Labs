
 import React from 'react';
 import { useParams } from 'react-router-dom';
 import { useState, useEffect } from 'react';
 import axios from 'axios';
 import { useNavigate } from "react-router-dom";

 export default function Edit(props) {
    // save parameters from edit inputs
   let { id } = useParams();
   const [title, setTitle] = useState("");
   const [year, setYear] = useState("");
   const [poster, setPoster] = useState("");
   const navigate = useNavigate();

 useEffect(() => {
     axios.get('http://localhost:3000/api/movies/' + id) //get selected movie url using its specific id
         .then((response) => {
             setTitle(response.data.title);
             setYear(response.data.year);
             setPoster(response.data.poster);
         })
         .catch((error) => {
             console.log(error);
         });
 }, [id]);

 const handleSubmit = (event) => {
     event.preventDefault(); //prevents default page refresh
     const newMovie = { id, title, year, poster };
     axios.put('http://localhost:3000/api/movies/' + id, newMovie) //updates the old values associated with movie id with new updated information
         .then((res) => {
             console.log(res.data);
             navigate('/read'); //redirects back to read component page
         });
 }

 return (
     <div>
        {/* Form to input new movie information */}
         <form onSubmit={handleSubmit}>
             <div className="form-group">
                 <label>Movie Title: </label>
                 <input type="text" 
                 className="form-control" 
                 value={title} 
                 onChange={(e) => setTitle(e.target.value)} /> {/* On submit title is updated */}
             </div>
             <div className="form-group">
                 <label>Release Year: </label>
                 <input type="text" 
                 className="form-control" 
                 value={year} 
                 onChange={(e) => setYear(e.target.value)} /> {/* On submit year is updated */}
             </div>
             <div className="form-group">
                 <label>Poster URL: </label>
                 <input type="text" 
                 className="form-control" 
                 value={poster} 
                 onChange={(e) => setPoster(e.target.value)} /> {/* On submit poster is updated */}
             </div>
             <div className="form-group">
                 <input type="submit" value="Edit Movie" className="btn btn-primary" />
             </div>
         </form>
     </div>
 );
 }