import React from 'react';
import Discover from './Discover';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
    <div className="header container-fluid">
      
      <div className="header-text">
        <h3>EXPRESS,CREATE AND CONNECT</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Quaerat eveniet beatae unde delectus adipisci at obcaecati 
            eius architecto provident libero sit illum temporibus, magnam dolore! 
            Tempora laborum reprehenderit voluptates dolore.
          </p>
          <Link className="btn page-btn" to="/login">
            Sign Up
          </Link>
      </div>
    </div>
    <div className="home-category">
      <a href="">Prose</a><a href="">Poetry</a><a href="">Allegory </a><a href="">Screenplay </a><a href="">Song/Music </a>
    </div>

  </div>
  );
}

export default Home;