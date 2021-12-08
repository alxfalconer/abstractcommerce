import React, { Component } from 'react';

export class LongCard extends Component {

    handleClick = () => {
        this.props.removeFromCart(this.props.cartItem)
    }

    render() {
        console.log(this.props.cartItem)
        return (<>
            <li style={{justifyContent: "space-around", margin: "20px"}} >
                {<img src={this.props.cartItem.artwork.img} alt={this.props.cartItem.artwork.name} width="300px"/>}
                <br></br>
                <span style={{margin: "20px"}}>{this.props.cartItem.artwork.name}</span>
                <span style={{margin: "20px"}}>${this.props.cartItem.artwork.price}</span>
                <span style={{margin: "20px"}}>Quantity: 1</span>
                <button className="btn" style={{ fontSize: "15px"}} onClick={this.handleClick}>Remove</button>
            </li>
            
            </>
        )
    }
}

export default LongCard;