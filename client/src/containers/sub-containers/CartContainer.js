import React from 'react';
import CartCard from '../../components/CartCard'
import { Redirect } from 'react-router-dom'
const api = 'https://abstract-commerce.herokuapp.com/'

class CartContainer extends React.Component {

    state = {
        redirect: false,
        orders: [],
    }

    handleCheckout = () => {
        if (this.props.loggedInUserId) {
            this.checkout()
        } else {
            this.setState({
                redirect: true
            })
            return <Redirect to={'/'} />
        }
    }

    checkout = () => {
        let completedOrder
        let newOrder
        fetch(api + `orders/${localStorage.orderId}`, {
            method: "PATCH",
            headers: {
                "Authorization": this.props.token.toString(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({order:{
                checkedout: true}
            })
        })
        .then(r => r.json())
        .then(data => {
            this.props.clearCart()
            completedOrder = data
            fetch(api + "orders", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({order: 
                { user_id: localStorage.userId,
                    checkedout: false}    
                })
            })
            .then(res => res.json())
            .then(orderObj => {
                
                newOrder = orderObj
                console.log(newOrder)
                // newOrder gets sent to App.js to setState
                console.log(completedOrder)
                window.alert("Order Complete")
                // completedOrder is used to render a 'Completed Order' component
            })
        })
    }

    cartItems = () => {
        if(this.props.currentCart.length < 1){
            return <p style ={{
              
                fontFamily: "Optima", 
                fontWeight: "100", 
                fontSize: "18px",
                color: "#343a40", 
                textAlign: "center",
                justifyContent: "space-around"
            }}>
                <h1 style={{textAlign: "Center"}}>C A R T</h1>
                There are no items in your cart at this time.
                </p>
        } else{
            return   <div style={{textAlign: "Center", marginTop:"10%", fontFamily: "Optima", fontWeight: "100", color: "#343a40"}}>
            <li style={{   
                margin: "50px", 
                flexDirection: "column",
                flexWrap: "wrap",
                fontFamily: "Optima", 
                fontWeight: "100", 
                fontSize: "18px",
                color: "#343a40", 
                textAlign: "left",
                justifyContent: "space-around",
                listStyle: "none"
                }}>
                    <h1 style={{textAlign: "Center"}}>C A R T</h1>
                {this.props.currentCart.map(item => <CartCard removeFromCart={this.props.removeFromCart} key={item.id} cartItem={item} />)}
            </li>
            <h2>Total: ${this.props.total}</h2>
            <button className="btn" style={{fontSize: "18px"}} onClick={this.handleCheckout} >Checkout</button> 
            <br></br><br></br>
            </div>
        }  
    }

    render(){

        if (this.state.redirect) {
            return <Redirect to={'/login'} />
        }
        
        return (<>
          {this.cartItems()}
          </>
        )
    }
}

export default CartContainer;
