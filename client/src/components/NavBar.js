import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

export class NavBar extends Component {

  logButton = () => {
    if(!this.props.token){
      return <Link to="/login" style={{color: "white", textDecorationColor: "#none"}}>Log In</Link>
    } else {
      return <a href="/" onClick={this.handleLogOut} style={{color: "white", textDecorationColor: "#929ca7"}}>Log Out</a>
    }
  }
  handleLogOut = (e) => {
    e.preventDefault()
    this.props.handleLogOut()
  }
  render() {

    return (
      <nav className="nav" style={{ 
        backgroundColor: "black", 
        position: "-webkit-sticky", 
        position: "sticky",
        top: "0", 
        borderBottom: "solid", 
        borderWidth: "1px", 
        borderColor: "#929ca7", 
        paddingBottom: "25px", 
        paddingTop: "25px", 
        textAlign: "Center", 
        fontSize: "20px", 
        marginTop:"3%", 
        fontFamily: "Courier New, Monospace", 
        fontWeight: "100", 
        color: "#343a40", 
        display: "flex", 
        justifyContent: "space-around"}}>
        <Link to="/" style={{fontFamily: "Optima", color: "white", textDecorationColor: "none"}}>ABSTRACT COMMERCE</Link>
        <Link to="/artworks" style={{color: "white", textDecoration: "none"}}>{!!localStorage.userId ? "Browse Artworks" : ""}</Link>
        <Link to={`/account`} style={{color: "white", textDecoration: "none"}}>{!!localStorage.userId ? "My Account" : ""}</Link>
        <Link to="/cart" style={{color: "white", textDecoration: "none"}}>{!!localStorage.userId ? "Cart: " + this.props.cartNum : ""}</Link>
        {this.logButton()}
      </nav>
    )
  }
}

export default NavBar;
