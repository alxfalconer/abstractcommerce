import React from 'react';

class OrderCard extends React.Component {
    state = {
        purchases: [],
        checkedOut: []
    }

    componentDidMount = async () => {
        let rawOrder = await fetch (`http://localhost:3000/orders/${localStorage.orderId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        let order = await rawOrder.json()
        let purchases = order.purchases
        // let checkedOut = order.checkedout

        this.setState({
            purchases,
            order,
            checkedOut: order.checkedout
        })
        console.log(this.state.purchases)
    }

    purchases = () => {
    return !!this.state.purchases.length ? this.state.purchases.map(purchase => <li style={{listStyle: "none"}}>{purchase.quantity} {purchase.artwork.name} ${purchase.quantity * purchase.artwork.price}</li>) : false
    }

    // pastOrders = () => {
    //     console.log(this.state.checkedOut)
    //     return !!this.state.checkedOut.length ? this.state.checkedOut.filter(order => order.checkedout === true ) : false
    // }

    // myOrders = () => {
    //     return !this.pastOrders() ? this.state.purchases.map(order => order.purchases ) : "You have not placed any orders."
   
    // }

    reducer = (total, num) => total + num

    purchaseTotals = () => {
        return !!this.state.purchases.length ? this.state.purchases.map(purchase => purchase.quantity * purchase.artwork.price) : []
    }

    total = () => {
       return  !!this.purchaseTotals().length ? this.purchaseTotals().reduce(this.reducer) : false
    }

    render(){
    return ( !!this.total() ? <div style={{ border: "solid", borderWidth: "1px", borderColor: "#929ca7", padding: "25px", width: "600px", margin: "0 auto", marginTop: "10px"}}>
    <h5>Order # {localStorage.orderId}:</h5>
    <li style={{listStyle: "none", margin: "10px"}}>
        {this.purchases()}
    </li>
    <p style={{marginTop: "100px"}}>Total: ${this.total()}</p>
    </div> : null
    )}
}
export default OrderCard;