package br.com.moviemanagement.controller;

import br.com.moviemanagement.entity.Movie;
import br.com.moviemanagement.entity.Response;
import br.com.moviemanagement.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class MovieController {

    @Autowired
    MovieService movieService;

    @GetMapping("/movies")
    public Iterable<Movie> findAll(){
        return movieService.findAll();
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateMovie(@RequestBody Movie movie){
        return movieService.saveUpdateMovie(movie, "update");
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveMovie(@RequestBody Movie movie){
        return movieService.saveUpdateMovie(movie, "save");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteMovie(@PathVariable Long id){
        return movieService.deleteMovie(id);
    }

}
