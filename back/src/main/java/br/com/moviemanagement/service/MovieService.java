package br.com.moviemanagement.service;

import br.com.moviemanagement.entity.Movie;
import br.com.moviemanagement.entity.Response;
import br.com.moviemanagement.repository.MovieRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class MovieService{

    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private Response response;

    public Iterable<Movie> findAll(){
        return movieRepository.findAll();
    }

    public ResponseEntity<?> saveUpdateMovie(@NotNull Movie movie, String action){
        if(movie.getTitle().equals("") || movie.getDirector().equals("")){
            response.setMessage("Data can not be blank");
            return new ResponseEntity<Response>(response,HttpStatus.BAD_REQUEST);
        }else{
            if(action.equals("save")){
                return new ResponseEntity<Movie>(movieRepository.save(movie),HttpStatus.CREATED);
            }else{
                return new ResponseEntity<Movie>(movieRepository.save(movie),HttpStatus.OK);
            }

        }
    }

    public ResponseEntity<Response> deleteMovie(@RequestBody Long movieId){
        movieRepository.deleteById(movieId);
        response.setMessage("Movie was successfully deleted");
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }


}
