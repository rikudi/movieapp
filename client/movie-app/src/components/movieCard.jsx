//movie card component
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
export const SMovieCard = ({ movie }) => {
    return (
      <div className="search-item">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} 
          alt={movie.title} 
          className="movie-poster"
        />
        <div className="search-movie-title">{movie.title}</div>
      </div>
    )
  }