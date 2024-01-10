"use client"

import {useState} from 'react';

import MovieGrid from './components/MovieGrid';
import Modal from './components/Modal';

async function search(query){
  try{
    const res=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${encodeURIComponent(query)}`);
    const data=await res.json();
    return data.results;
   
  }
  catch(error){

    console.error(error);
  }
}



export default function Home() {
  const [query,setQuery]=useState('');
  const [movies,setMovies]=useState([]);
  const [movie,setMovie]=useState(null);

  function handleMovieClick(mov){
    setMovie(mov);
  }

  function handleClose(){
    setMovie(null);
  }


  async function handleSearch(e) {
    e.preventDefault();
   if(!query){
    return;
   }
  

   
   

   const results=await search(query);
     setMovies(results);
  
  }
  return (
   <>
   <div className="bg-gray-900 text-white min-h-screen">
    <main className="flex flex-col items-center justify-center min-h-screen py-2" >
      <h1 className="text-6xl font-bold m-4" >Movie Explorer</h1>
      <form onSubmit={handleSearch} className="m-8">
        <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} 
        placeholder="search for movies..."
        className="px-4 py-2 w-80 text-gray-900"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">search</button>
       
      </form>
      <MovieGrid movies={movies} handleMovieClick={handleMovieClick} />
    </main>
    <Modal movie={movie} onClose={handleClose}  />
   </div>
   </>
  )
}
