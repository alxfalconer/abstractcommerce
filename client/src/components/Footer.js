import React from 'react';
import blacksig from "./blacksig.jpg"

export const Footer = () => {
    
  return ( 
    <footer className="footer">
      <div>
        <br></br>
        <p style={{textAlign: "Center", fontFamily: "Optima"}}>Original artwork by</p>
        <h3><img className="blacksig" src={blacksig} alt="blacksig"/></h3>
        <br></br>
      </div>
    </footer>
  );
}