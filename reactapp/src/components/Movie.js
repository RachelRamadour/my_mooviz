import '../App';
import {
  Card, CardImg, CardText, CardBody, Col,
  CardTitle, CardSubtitle, ButtonGroup, Button, Badge
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faVideo, faStar } from '@fortawesome/free-solid-svg-icons'
import React, {useState} from 'react'


function CardMovie(props) {

  const [countWatchMovie, setcountWatchMovie] = useState(0)
  const [likeMovie, setlikeMovie] = useState(false)
  const [myRatingMovie, setmyRatingMovie] = useState(0)
  const [rating, setRating] = useState(props.globalRating)
  const [countRating, setCountRating] = useState(props.globalCountRating)
  const [watchMovie, setWatchMovie] = useState(false)

var cameraClick =() => {
 setcountWatchMovie(countWatchMovie + 1);
  setWatchMovie(true)
}

var heartClick =() => {

  if(likeMovie === false){
    props.handleClickAddMovieParent(props.movieName,props.movieImg);
  } else {
    props.handleClickDeleteMovie(props.movieName)
  }
  setlikeMovie(!likeMovie)
}

if(watchMovie){
  var colorWatch = {color: '#ff0000', cursor :'pointer', marginRight: '5px'}
} else {
  var colorWatch = {cursor :'pointer', marginRight: '5px'}
}

var myRatingMovieClickPlus = () => {
var rating = myRatingMovie +1;
  if (rating < 0) {
    rating = 0
  };
  if (rating > 10) {
    rating = 10
  };
  setmyRatingMovie(rating)
}

var myRatingMovieClickMoins = () => {
var rating = myRatingMovie -1;
  if (rating < 0) {
    rating = 0
  };
  if (rating > 10) {
    rating = 10
  };
  setmyRatingMovie(rating)
}

var likeStyle = {
cursor :'pointer',
color : '#000000',
marginLeft: '5px'
}


if (props.watchedHeart === false ) {
  likeStyle.color = '#000000'
} else {
  likeStyle.color = '#ff0000'
}

var tabRating = [];
for(var i = 0 ; i < 10 ; i++){
    var starStyle = {}
    if(i<myRatingMovie){
      starStyle = {color: '#f1c40f'}
    }

    let count = i+1
  
    tabRating.push(<FontAwesomeIcon onClick={() => setmyRatingMovie(count)} style={starStyle} icon={faStar} /> )
    }


var nbTotalNote = rating * countRating
var nbTotalVote = countRating
if(nbTotalVote == 0) {
  nbTotalVote = 1
}

  if(myRatingMovie){
      nbTotalVote += 1
      nbTotalNote += myRatingMovie
  }
 
  var avgTotal = Math.round(nbTotalNote/nbTotalVote)
  var tabGlobalRating = []

  for( i=0; i<10;i++){
      var color = {}
      if(i < avgTotal){
          color = {color: '#f1c40f'}
      }
     
     
      tabGlobalRating.push(<FontAwesomeIcon style={color} icon={faStar} />)
  }

  var movieImg = '/generique.jpg'
  if(props.movieImg != null){
    movieImg = `https://image.tmdb.org/t/p/w500/${props.movieImg}`
   
  }


  return(
    <Col xs="12" lg="6" xl="4" >
    <Card style={{marginBottom:30 }}>
        <CardImg src={movieImg} alt="logo" />
     <CardBody>
       <p>Like
            <FontAwesomeIcon icon={faHeart} style={likeStyle} onClick={ () => heartClick()} />
            </p>      
           
          <p>Nombre de vues <FontAwesomeIcon icon={faVideo} style={colorWatch} 
              onClick={ () => cameraClick()} /> 
              <Badge color="secondary">{countWatchMovie}</Badge>
 </p>

             
        <p>Ma Note
     {tabRating}
             
              {/* <ButtonGroup size="sm">
                <Button color="secondary" onClick={ () => myRatingMovieClickMoins()}>-</Button>
                <Button color="secondary"onClick={ () => myRatingMovieClickPlus()}>+</Button>
              </ButtonGroup> */}
             ({myRatingMovie}/10) 
          </p>
          <p>Moyenne {tabGlobalRating} ({nbTotalVote})</p>
          <CardTitle tag="p">{props.movieName}</CardTitle>
          <CardSubtitle tag="p" className="mb-2 text-muted">{props.movieDesc}</CardSubtitle>
        
        </CardBody>
      </Card>
      </Col>
    );
  }
  
  export default CardMovie;