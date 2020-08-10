// Selecting element from the DOM
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const moviesSearchable = document.querySelector('.movies-searchable');
const moviesContainer = document.querySelector('.movies-container');

function movieSection(movies){
  const section = document.createElement('section');
  section.classList = 'section';

  movies.map((movie) => {
      if(movie.poster_path) {
         const img = document.createElement('img');
         img.src = IMAGE_URL + movie.poster_path;
         img.setAttribute('data-movie-id', movie.id)
        
         section.appendChild(img);
      }
  })

  return section;
}

function createMovieContainer(movies, title = '') {
  //create element
  const movieElement = document.createElement('div');
  //set attribute
  movieElement.setAttribute('class', 'movie');

  const header = document.createElement('h2');
  header.innerHTML = title;

  const content = document.createElement('div');
  content.classList = 'content';

  const contentClose = `<p id="content-close">X</p>`;

  content.innerHTML = contentClose;

  const section = movieSection(movies);

  movieElement.appendChild(header);
  movieElement.appendChild(section);
  movieElement.appendChild(content);
  return movieElement;
}

function renderSearchMovie(data) {
    moviesSearchable.innerHTML = '';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    moviesSearchable.appendChild(movieBlock);
    console.log(data);
}

function renderMovie(data) {
    const movies = data.results;
    const movieBlock = createMovieContainer(movies, this.title);
    moviesContainer.appendChild(movieBlock);
    console.log(data);
}



function handleError(error){
  console.log(error)
}

buttonElement.onclick = (e) => {
    e.preventDefault();
    const value = inputElement.value;
    searchMovie(value)

     inputElement.value = '';
    //console.log(`Value: ${value}`);
}

function createIframe(video){
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  iframe.width = 360;
  iframe.height = 315;
  iframe.allowFullscreen = true;

  return iframe
}

function createVideoTemplate(data, content) {
  console.log('it worked', data);
  content.innerHTML = '<p id="content-close">X</p>';
  const videos = data.results;
  const length = videos.length > 4 ? 4 : videos.length;
  const iframeContainer = document.createElement('div');

  for (let i = 0; i < length; i++){
    const video = videos[i]; //video
    const iframe = createIframe(video);
    iframeContainer.appendChild(iframe);
    content.appendChild(iframeContainer);
  }
}

// Event delegation
document.onclick = (e) => {
  e.preventDefault();

  const target = e.target

  if(target.tagName.toLowerCase() === 'img') {
    const movieId = target.dataset.movieId;
    console.log(movieId)

    const section = e.target.parentElement; //section 
    const content = section.nextElementSibling; // content
    content.classList.add('content-display');

    const path = `/movie/${movieId}/videos`;
    const url = generateUrl(path);
    //Fetch movie videos
    fetch(url)
        .then((res) => res.json())
        .then((data) => createVideoTemplate(data, content))
        .catch((err) => {
            console.error(`Error: ${err}`);
        });

  }

  if(target.id === 'content-close') {
    const content = target.parentElement;
    content.classList.remove('content-display');
  }
}

searchMovie('Spiderman');
getUpcomingMovie();
getTopRatedMovie();
getTPopularMovie();