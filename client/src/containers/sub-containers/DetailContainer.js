import React from 'react';
import {Redirect} from 'react-router-dom'

class DetailContainer extends React.Component {
    
    
    state = {
        redirect: false,
        value: 0
    }
    
    handleClick = () => {
        this.props.addToCart(this.props.artwork)
        this.setState({
            redirect: true
        })
    }

    handleChange = (event) => {
        this.setState({value: event.target.value})
    }

    renderButton = () => {
            return <button className='btn' style={{fontSize: "18px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "30px"}} onClick={this.handleClick} variant="primary">Add to Cart</button>
        }
    
    
    render(){

        if (this.state.redirect) {
            return <Redirect to={'/cart'} />
        }

        let artwork = this.props.artwork;
        console.log(artwork.purchases.length)

        return (
            <div style={{textAlign: "Center", fontFamily: "Optima", fontWeight: "100", color: "#343a40"}}>
                <h2 style={{margin: "25px"}}>{artwork.name}</h2>
                <img width="700px" src={artwork.img} alt={artwork.name}/>
                <div>
                    <p style={{margin: "20px"}}>{artwork.description}</p>
                    <p>Category: {artwork.category}</p>
                  
                    <h4>${artwork.price}</h4>
                 
                    {this.renderButton()}
                </div>
            </div>
        )
    }
}

export default DetailContainer;
