const API_KEY = config.secretKey;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

function generateUrl(path) {
  const url = `https://api.themoviedb.org/3${path}?api_key=${API_KEY}`;
  return url;
}

function requestMovies(url, onComplete, onError){
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

function searchMovie(value){
  const path = '/search/movie';
  const url = generateUrl(path) + '&query=' + value;
  requestMovies(url, renderSearchMovie, handleError);
}

function getUpcomingMovie(){
  const path = '/movie/upcoming';
  const url = generateUrl(path);
  const render = renderMovie.bind({ title: 'Upcoming Movies' })
  requestMovies(url, render, handleError);
}

function getTopRatedMovie(){
  const path = '/movie/top_rated';
  const url = generateUrl(path);
  const render = renderMovie.bind({ title: 'Top Rated Movies' })
  requestMovies(url, render, handleError);
}

function getTPopularMovie(){
  const path = '/movie/popular';
  const url = generateUrl(path);
  const render = renderMovie.bind({ title: 'Popular Movies' })
  requestMovies(url, render, handleError);
}