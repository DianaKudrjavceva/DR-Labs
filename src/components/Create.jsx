import { useState } from "react";

function Create() {
  const [title, setTitle] = useState(''); //updates title anywhere in the code
  const [ year, setYear] = useState('');
  const [ poster, setPoster] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, year, poster); //log title, year, and poster into console after submission
  }

  return ( //form that saves on submit
    <div>
      <h2>This is my Create Component.</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Add Movie Title: </label> {/*input movie title */}
          <input type="text"
            className="form-control"
            value={title}
            onChange={(e) => { setTitle(e.target.value)  /*When value is inserted into field, it will get updated every time */}}
          />
        </div>

         <div className="form-group">
          <label>Add Movie Year: </label> {/*input movie year */}
          <input type="text"
            className="form-control"
            value={year}
            onChange={(e) => { setYear(e.target.value)  /*When value is inserted into field, it will get updated every time */}}
          />
        </div>

         <div className="form-group">
          <label>Add Movie Poster: </label> {/*input movie poster */}
          <input type="text"
            className="form-control"
            value={poster}
            onChange={(e) => { setPoster(e.target.value)  /*When value is inserted into field, it will get updated every time */}}
          />
        </div>
        <br></br>
        <input type="submit" value="Add Movie" />
      </form>
    </div>
  );
}

export default Create;