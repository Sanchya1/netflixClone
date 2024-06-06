import React, { useEffect } from 'react'
import Header from './Header'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import MainContainer from './MainContainer';
import MovieContainer from './MovieContainer';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import usetUpcomingMovies from '../hooks/useUpcomingMovies';
import SearchMovie from './SearchMovie';

export default function Browse() {
  const user= useSelector(store=>store.app.user);
  const toggle= useSelector(store=>store.movie.toggle);
  const navigate= useNavigate();
  // CUSTOM HOOK
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  usetUpcomingMovies();
  
  // only let user get to /browser when user is not NULL
  useEffect(()=>{
    if(!user){
      navigate("/");
     }
  },[user,navigate]);

  return (
    <div>
      <Header/>
      <div>
        {
          toggle ?<SearchMovie />:(
            <>
             <MainContainer />
             <MovieContainer />
             </>
          )
        }
       
      </div>
    </div>
  )
}
