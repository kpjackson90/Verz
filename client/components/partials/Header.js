import React, {useState} from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Verz.svg";
import search from "../../assets/ei_search.svg";
import nav from './Nav';
import MainHeader from './MainHeader';
import AuthHeader from './AuthHeader';

const Header = () => {
  const [authflow, setAuthFlow] = useState(false);
  console.log(authflow);

    return (
      {
        authflow === false ? <MainHeader/> : <AuthHeader/> 
      }
    );


   //create a boolean called authFlow and set it to false
   //keep in header
   //when user clicks sign up, set authFlow to true
   //Once you are in auth flow then hide the nav items that you don't need 

}

export default Header;