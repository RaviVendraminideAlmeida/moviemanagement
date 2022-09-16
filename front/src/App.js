import './App.css';
import Table from "./components/Table"
import Form from "./components/Form"
import { useEffect, useState } from 'react';

function App() {

  const movie = {
    id: 0,
    title: "",
    director: ""
  }

  const [movies, setMovies] = useState([]);
  const [btnSave, setBtnSave] = useState(true);
  const [movieObject, setMovieObject] = useState(movie);

  useEffect(() => {
    fetch("http://localhost:8080/movies")
    .then(response => response.json())
    .then(JSONresponse => setMovies(JSONresponse))
  }, []);

  const onInput = (action) => {
    setMovieObject({...movieObject, [action.target.name]: action.target.value});
  }

  const saveMovie = () => {
    fetch("http://localhost:8080/save", {
      method:"post",
      body:JSON.stringify(movieObject),
      headers:{
        "Content-type":"application/json",
        "Accept":"application/json" 
        }
      })
      .then(response => response.json())
      .then(JSONresponse => {
        if(JSONresponse.message !== undefined){
          alert(JSONresponse.message);
        }else{
          setMovies([...movies, JSONresponse]);
          alert("Movie was sucessfully saved")
          clearForm();
        }
        
      }
        
      )
  }

  const deleteMovie = () => {
    fetch("http://localhost:8080/delete/" + movieObject.id, {
      method:"delete",
      headers:{
        "Content-type":"application/json",
        "Accept":"application/json" 
        }
      })
      .then(response => response.json())
      .then(JSONresponse => {
        alert(JSONresponse.message);

        let tempMovies = [...movies];
        let i = tempMovies.findIndex((movie) => {
          return movie.id === movieObject.id;
        });

        tempMovies.splice(i, 1);
        setMovies(tempMovies);
        clearForm();
      })
    }

    const updateMovie = () => {
      fetch("http://localhost:8080/update", {
        method:"put",
        body:JSON.stringify(movieObject),
        headers:{
          "Content-type":"application/json",
          "Accept":"application/json" 
          }
        })
        .then(response => response.json())
        .then(JSONresponse => {
          if(JSONresponse.message !== undefined){
            alert(JSONresponse.message);
          }else{
            alert("Movie was sucessfully updated");
            let tempMovies = [...movies];
            let i = tempMovies.findIndex((movie) => {
              return movie.id === movieObject.id;
            });
            tempMovies[i] = movieObject;
            setMovies(tempMovies);
            clearForm();
          }
          
        }
          
        )
    }

  const clearForm = () => {
    setMovieObject(movie);
    setBtnSave(true);
  }

  const selectMovie = (i) => {
    setMovieObject(movies[i]);
    setBtnSave(false);
  }

  return (
    <div className="App">
      <Form button={btnSave} save={saveMovie} cancel={clearForm} remove={deleteMovie} update={updateMovie} keyboardAction={onInput}  object={movieObject}/>
      <Table content={movies} select={selectMovie}  />
    </div>
  );
}

export default App;
