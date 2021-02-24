import './App.css';
import {
  Container,
  Row,
  Nav
} from 'reactstrap';
import NavBar from './components/Nav'
import CardMovie from './components/Movie'
import React, {
  useState,
  useEffect
} from 'react';


function App() {
  const [movieList, setMovieList] = useState([]);
  const [moviesCount, setmoviesCount] = useState(0)
  const [moviesWishList, setmoviesWishList] = useState([])

  useEffect(() => {
    async function loadData() {
      const response = await fetch('/new-movie');
      const jsonResponse = await response.json();
 
      setMovieList(jsonResponse.movies)
    };
    loadData()

    const get_Wishlist = async () => {
      let request = await fetch('/wishlist');
      let response = await request.json();
      setmoviesCount(response.length)
      setmoviesWishList(response)
    }
    get_Wishlist()
  }, [])



  var handleClickAddMovieParent = async (movieName, movieImg) => {
    let request = await fetch('/wishlist', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `movieName=${movieName}&movieImg=${movieImg}`
    });

    let response = await request.json();


    setmoviesCount(moviesCount + 1);

    setmoviesWishList([...moviesWishList, {
      movieName: movieName,
      movieImg: movieImg
    }]);
  }


  var handleClickDeleteMovie = async (name) => {
    let request = await fetch(`/wishlist/${name}`, {
      method: 'DELETE'
    })
    let response = await request.json()

    setmoviesCount(moviesCount - 1);

    setmoviesWishList(moviesWishList.filter((object) => object.movieName !== name))
  }

  var movies = movieList.map((movies, i) => {
  
    var result = moviesWishList.find((e) => e.movieName === movies.title)

      var isLiked = false
      if (result !== undefined) {
        isLiked = true
      }


      return ( 
      < CardMovie key = {i}
        handleClickAddMovieParent = {
          handleClickAddMovieParent
        }
        handleClickDeleteMovie = {
          handleClickDeleteMovie
        }
        movieName = {movies.title}
        movieDesc = {movies.overview}
        movieImg = {movies.poster_path}
        globalRating = {movies.vote_average}
        globalCountRating = {movies.vote_count}
        watchedHeart = {isLiked}
        />)
      })

    return ( 
    <div style = {{backgroundColor: 'black'}} >
      <Container> 
     
      <NavBar moviesCount = {moviesCount}
      moviesWishList = {moviesWishList}
      handleClickDeleteMovie = {handleClickDeleteMovie}
      movieImg = {moviesWishList.movieImg}
      movieName = {movies.title}
      />  
    
      <Row>
      {movies}
      </Row>

      </Container>  
      </div >
    );

  }

  export default App;