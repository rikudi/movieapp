//movie card component for carousel
export const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} 
        alt={movie.title} 
        className="movie-poster"
      />
      <div className="movie-title">{movie.title}</div>
    </div>
  )
}
//movie card component for search result
export const SMovieCard = ({ movie, onAddToCollection, isLoggedIn }) => {
  const handleAddToCollection = () => {
    onAddToCollection(movie) // Pass the movie's ID to the handler
  }
  return (
    <div className="search-item">
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} 
        alt={movie.title} 
        className="movie-poster"
      />
      <div className="search-movie-title">{movie.title}</div>
      {isLoggedIn && (
        <button onClick={handleAddToCollection} className="A" >Add</button>
      )}
    </div>
  )
}