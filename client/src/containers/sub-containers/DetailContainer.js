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

    // showRock = () => {
    //     for (let i = 1; i < count+1; i++) {
    //         return <option>i</option> 
    //     }
    // }

    renderButton = () => {
        if (this.props.artwork.quantity - this.props.artwork.purchases.length === 0) {
            return <h1>SOLD OUT</h1>
        } else {
            return <button style={{fontSize: "18px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "30px"}} onClick={this.handleClick} variant="primary">Add to Cart</button>
        }
    }
    
    render(){

        if (this.state.redirect) {
            return <Redirect to={'/cart'} />
        }

        let artwork = this.props.artwork;
        console.log(artwork.purchases.length)

        return (
            <div style={{textAlign: "Center", fontFamily: "Courier New, Monospace", fontWeight: "100", color: "#343a40"}}>
                <h2 style={{margin: "25px"}}>{artwork.name}</h2>
                <img width="700px" src={artwork.img} alt={artwork.name}/>
                <div>
                    <p style={{margin: "20px"}}>{artwork.description}</p>
                    <h4>Type: {artwork.category}</h4>
                  
                    <h4>${artwork.price}</h4>
                 
                    

                    {/* <select value={this.state.value} onChange={this.handleChange}>
                        {this.showRock}
                    </select> */}

                    {this.renderButton()}
                </div>
            </div>
        )
    }
}

export default DetailContainer;
