import React from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'
import { useSelector } from 'react-redux'

export default function MainContainer() {
  const movie=useSelector(store=>store.movie.nowPlayingMovies);
  console.log(movie);
  if(!movie) return ; // this method is called early return
  const {overview,id,title}=movie[4];
  return (
    <div>
        <VideoTitle title={title} overview={overview}/>
        <VideoBackground movieId={id}/>
    </div>
  )
}
