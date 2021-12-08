import React from 'react';
import OrderCard from '../../components/OrderCard'
import EditUsername from '../../components/EditUsername'
import EditPassword from '../../components/EditPassword'
import DeleteUser from '../../components/DeleteUser'

class AccountContainer extends React.Component{
    state = {
        myOrders: [],
        userName: "",
        purchases: []
    }
    componentDidMount = async () => {
        let rawUser = await fetch(`http://localhost:3000/users/${localStorage.userId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.props.token
            }
            })
            let rawOrder = await fetch (`http://localhost:3000/orders/${localStorage.orderId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.token
                }
            })
            let user = await rawUser.json()
            let order = await rawOrder.json()
            let purchases = order.purchases
            
            this.setState({
            myOrders: user.orders,
            userName: user.username,
            purchases
            })
            console.log(this.state.myOrders, this.state.userName, this.state.purchases)
        }

        
   
        // pastOrders = () => {
        //     console.log(this.state.myOrders)
        //     return !!this.state.myOrders.length ? this.state.myOrders.filter(order => order.checkedout === true ) : false
        // }

        // myOrders = () => {
        //     this.state.purchases
        //     console.log(this.state.myOrders)
        //     // return !this.state.myOrders ? this.state.myOrders.map(order => <OrderCard key={order.id} order={this.state.myOrders} />) : "You have not placed any orders."
       
        // }


    render(){
    return (
        <div style={{textAlign: "Center", marginTop:"3%", fontFamily: "Optima", fontWeight: "100", color: "#343a40"}}>
        <h3 style={{margin: "30px", fontFamily: "Optima"}}>Update Info</h3>
        <p>Current Username: {this.state.userName}</p>
         <EditUsername />
         <EditPassword />
         <br></br>
         <h3 style={{fontFamily: "Optima"}}>Past Orders</h3>
         {/* <div style={{margin: "30px"}}>{this.state.myOrders}</div>  */}
         <p>{this.state.purchases.length}</p>
         <h3 style={{fontFamily: "Optima"}}>Delete Account</h3>
         <DeleteUser />
        </div>
    )}
}

export default AccountContainer;
