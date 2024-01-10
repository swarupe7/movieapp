
import {useState,useEffect} from 'react';
import MovieGrid from '../components/MovieGrid';
import Modal from '../components/Modal';

export default function Pager({title}){
    const [movies,setMovies]=useState([]);
    const [movie,setMovie]=useState(null);

  function handleMovieClick(mov){
    setMovie(mov);
  }

  function handleClose(){
    setMovie(null);
  }

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${title}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
        .then((response) => response.json())
            .then((data) => setMovies(data.results))
            .catch((error) => console.error('Error fetching movies in NowPlaying: ', error))
    },[]);
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <main className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-6xl font-bold m-4">{title.toUpperCase()}</h1>
               
                <MovieGrid movies={movies} handleMovieClick={handleMovieClick} />
            </main>
            <Modal movie={movie} onClose={handleClose}/>
        </div>
    )
}