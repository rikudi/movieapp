import React, { useState, useEffect } from 'react'
import { SMovieCard } from './movieCard'
import movieService from '../services/movieService'
import Grid from '@mui/material/Grid'

const Collection = () => {
  const [collection, setCollection] = useState([])

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const movies = await movieService.getCollection()
        setCollection(movies)
      }catch(error) {
        console.error('Error fetching movies', error)
      }
    }

    fetchCollection()
  }, [])

  return (
    <Grid container spacing={2}>
      {collection.map(movie => (
        <Grid item key={movie.id} xs={12} sm={6} md={2}>
          <SMovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Collection