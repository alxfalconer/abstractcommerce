import React, { Component } from 'react';
import { CartContainer, DetailContainer, IndexContainer,  AccountContainer } from "./sub-containers";
import LogIn from '../components/LogIn';
import {Footer} from '../components/Footer';
import { Route, Switch, Redirect} from 'react-router-dom'

class MainContainer extends Component {

    loginRender = () => {if (!!this.props.token) {return <Redirect to="/artworks" />} else return <Redirect to="/login"/>}
    
    render() {
        return (
            <>
                {this.loginRender()}

                <Switch>
                    <Route exact path="/artworks" >
                        <IndexContainer allArtworks={this.props.allArtworks} sortArtworks={this.props.sortArtworks} displayArtworks={this.props.displayArtworks} filterArtworksByCategory={this.props.filterArtworksByCategory} />
                    </Route>

                    <Route path="/artworks/:id">
                        { this.renderArtwork } 
                    </Route> 

                    <Route path="/cart" >
                        <CartContainer removeFromCart={this.props.removeFromCart} clearCart={this.props.clearCart} token={this.props.token} loggedInUserId={this.props.loggedInUserId} total={this.props.total} currentCart={this.props.currentCart}/>
                    </Route>

                    <Route path="/login" >
                        {!!this.props.token ? <Redirect to="/artworks"/> : <LogIn setToken={this.props.setToken} />}
                    </Route>

                    <Route exact path="/account">
                        <AccountContainer token={this.props.token} loggedInUserId={this.props.loggedInUserId}/>    
                    </Route> 

                    <Route exact path='/'> 
                    {!!this.props.token ? <Redirect to="/artworks"/> : <LogIn setToken={this.props.setToken} />}
                    </Route>
                    <Footer/>
                </Switch>
            </>
        )
    }

    renderArtwork = (renderParams) => {
        const id = parseInt(renderParams.match.params.id)
        const theArtwork = this.props.displayArtworks.find(artwork => artwork.id === id)
        return <DetailContainer addToCart={this.props.addToCart} artwork={ theArtwork } />
    }
}

export default MainContainer;
