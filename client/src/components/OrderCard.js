import React from 'react';

class OrderCard extends React.Component {
    state = {
        purchases: [],
        checkedOut: [],
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

        this.setState({
            purchases,
            checkedOut: order.checkedout
        })
        console.log(this.state.purchases)
    }

    // purchases = () => {
    // return !!this.state.purchases.length ? this.state.purchases.map(purchase => <li style={{listStyle: "none"}}>{purchase.quantity} {purchase.artwork.name} ${purchase.quantity * purchase.artwork.price}</li>) : false
    // }

completedOrders = () => {
    console.log(this.state.checkedOut)
    return !! this.state.checkedOut === true ? this.state.purchases.map(purchase => <li style={{listStyle: "none"}}>{purchase.quantity} {purchase.artwork.name} ${purchase.quantity * purchase.artwork.price}</li>) : "You have not completed any purchases at this time."
    
}
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
        {this.completedOrders()}
    </li>
    <p style={{marginTop: "100px"}}>Total: ${this.total()}</p>
    </div> : null
    )}
}
export default OrderCard;