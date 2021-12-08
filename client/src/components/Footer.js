import React from 'react';
import blacksig from "./blacksig.jpg"
// import Player from "./Player"

export const Footer = () => {
    
  return ( 
    <footer className="footer">
      <div>
        <br></br>
        <p style={{textAlign: "Center", fontFamily: "Optima"}}>Original artwork by</p>
        <h3><img className="blacksig" src={blacksig} alt="blacksig"/></h3>
        {/* <Player/> */}
        <br></br>
      </div>
    </footer>
  );
}