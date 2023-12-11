import Slider from 'react-slick';
import '../App.css'

//movie card component
const MovieCard = ({ movie }) => {
    return (
      <div className="movie-card">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} 
          alt={movie.title} 
          className="movie-poster"
        />
        <div className="movie-title">{movie.title}</div>
      </div>
    );
  };
//movie carousel component
const MovieCarousel = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Number of movies to show at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Time before flipping to the next movie
    pauseOnHover: true,
    lazyLoad: true,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };

  return (
    <>
        <div className='slider-title'>
            <h1>Popular right now:</h1>
        </div>
            <Slider {...settings} className='slider' >
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </Slider>
    </>
  )
}

export default MovieCarousel
