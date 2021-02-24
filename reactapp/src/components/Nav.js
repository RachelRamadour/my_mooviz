import '../App';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
 Nav, NavItem, NavLink, Button, Popover, PopoverHeader, PopoverBody, ListGroup
} from 'reactstrap';
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';



function NavBar(props)  {

const toggle = () => setPopoverOpen(!popoverOpen);
const [popoverOpen, setPopoverOpen] = useState(false);

 var moviesCount = props.moviesCount;
 var moviesWishList = props.moviesWishList




var moviesWished = moviesWishList.map((movies, i) => {
  return (
<PopoverBody>
  <img class ="imgWishlist" src={`https://image.tmdb.org/t/p/w500/${movies.movieImg}`}/>
  <FontAwesomeIcon icon={faTimesCircle} style={{marginLeft : '70%' }} onClick={ () => {props.handleClickDeleteMovie(movies.movieName)}} />
 <div>{movies.movieName}</div>
 
 </PopoverBody>) 
})

    return(
 <Nav>
 <span className="navbar-brand">
   <img src='./img/logo.png' width="30" height="30" className="d-inline-block align-top" />
 </span>
 <NavItem>
   <NavLink style={{color :'white'}}  >Last Releases</NavLink>
 </NavItem>
 <NavItem>
   <NavLink style={{color :'white'}} >  
   <Button id="Popover1" type="button">
   {moviesCount} Films
      </Button>
      <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
        <PopoverHeader>Ma Wishlist</PopoverHeader>
      <PopoverBody><ListGroup> {moviesWished}</ListGroup>
            </PopoverBody>

     
      </Popover>
    </NavLink>
 </NavItem>

</Nav>
)

}

export default NavBar