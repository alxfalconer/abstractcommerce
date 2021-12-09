import React from 'react';
// import './App.css';
import HeaderContainer from "./containers/HeaderContainer";
import MainContainer from "./containers/MainContainer";
import "./App.css";
import {Footer} from './components/Footer';
import { Redirect } from 'react-router-dom'


class App extends React.Component {
  state = {
    token:  localStorage.token,
    loggedInUserId: null,
    cart: [],
    allArtworks: [],
    displayArtworks: [],
    orderId: null,
    total: 0,
    redirect: false
  }

  componentDidMount = async() => {
    let rawArtworks = await fetch('http://localhost:3000/artworks')
    let artworks = await rawArtworks.json() 
      this.setState({
        token: localStorage.token,
        loggedInUserId: localStorage.userId,
        cartItems: localStorage.purchases,
        orderId: localStorage.orderId,
        allArtworks: artworks,
        displayArtworks: artworks
      })
  }

  setToken = ({ token, user_id, order_id, purchase_id, purchases, total }) => {
    // console.log(token)
    // console.log(user_id)
    // console.log(order_id)
    console.log(purchases)

    localStorage.token = token
    localStorage.userId = user_id
    localStorage.orderId = order_id
    localStorage.purchaseId = purchase_id

    this.setState({
      token: token,
      loggedInUserId: user_id,
      orderId: order_id,
      purchaseId: purchase_id,
      cart: !!purchases ? purchases : [],
      total: total
    })
  }

  logOutClick = () => {
    localStorage.userId = ""
    localStorage.token = ""

    this.setState({
      loggedInUserId: null,
      token: null
    })
    
  }

  filterArtworksByCategory = (value) => {
    if (value === 'All') {
      this.setState({
        displayArtworks: this.state.allArtworks
      })
    } else {
      this.setState({
        displayArtworks: this.state.allArtworks.filter(artwork => artwork.category === value)
      })
    }
  }

  sortArtworks = (sortedArtworks) => {
    this.setState({
      displayArtworks: sortedArtworks
    })
  }

  addToCart = (artwork) => {
    localStorage.cart = this.state.cart.map(item => item.id )
    if (this.state.loggedInUserId) {
      fetch('http://localhost:3000/purchases', {
        method: "POST",
        headers: {
          "Authorization": this.state.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({purchase: {
          artwork_id: artwork.id,
          order_id: localStorage.orderId,
          quantity: 1
        }})
      })
      .then(r => r.json())
      .then(purchase => {
        this.setState({
          cart: [...this.state.cart, purchase],
          order_id: localStorage.orderId,
          total: this.state.total + purchase.artwork.price,
          cartItem: localStorage.cart
        })
      })
    }
  }

  clearCart = () => {
    this.setState({
      cart: [],
      total: 0
    })
  }

  removeFromCart = (purchase) => {
    fetch(`http://localhost:3000/purchases/${purchase.id}`, {
        method: 'DELETE'
    })
    .then(() => {
      this.setState({
        cart: this.state.cart.filter(item => item.id !== purchase.id),
        total: this.state.total - purchase.artwork.price
      })
    })
  }

  render() {
    return (
      <React.Fragment >
        <HeaderContainer handleLogOut={this.logOutClick} token={this.state.token} cartNum={this.state.cart.length}/>
        <MainContainer removeFromCart={this.removeFromCart} sortArtworks={this.sortArtworks} filterArtworksByCategory={this.filterArtworksByCategory} clearCart={this.clearCart} addToCart={this.addToCart} setToken={this.setToken} token={this.state.token} purchaseId={this.state.purchaseId} loggedInUserId={this.state.loggedInUserId} displayArtworks={this.state.displayArtworks} total={this.state.total} currentCart={this.state.cart}/>
        <Footer/>
      </React.Fragment>
    )
  }
  
}

export default App;
 