import React from 'react';
import HeaderContainer from "./containers/HeaderContainer";
import MainContainer from "./containers/MainContainer";
import "./App.css";
import {Footer} from './components/Footer';

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
    const cart = localStorage.getItem('myCart')
    let rawArtworks = await fetch('http://localhost:3000/artworks')
    let artworks = await rawArtworks.json() 
      this.setState({
        token: localStorage.token,
        loggedInUserId: localStorage.userId,
        cart: JSON.parse(cart) ? JSON.parse(cart) : [],
        allArtworks: artworks,
        displayArtworks: artworks
      })
  }

  setToken = ({ token, user_id, order_id, purchases, total }) => {
    console.log(localStorage.purchaseId)

    localStorage.token = token
    localStorage.userId = user_id
    localStorage.orderId = order_id

    this.setState({
      token: token,
      loggedInUserId: user_id,
      orderId: order_id,
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
          total: this.state.total + purchase.artwork.price
        })
        localStorage.setItem('myCart', JSON.stringify(this.state.cart))
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
        <MainContainer removeFromCart={this.removeFromCart} sortArtworks={this.sortArtworks} filterArtworksByCategory={this.filterArtworksByCategory} clearCart={this.clearCart} addToCart={this.addToCart} setToken={this.setToken} token={this.state.token} loggedInUserId={this.state.loggedInUserId} displayArtworks={this.state.displayArtworks} total={this.state.total} currentCart={this.state.cart}/>
        <Footer/>
      </React.Fragment>
    )
  }
  
}

export default App;
 