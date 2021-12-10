import React from 'react';
import {withRouter, Redirect} from 'react-router-dom'
import OrderCard from '../../components/OrderCard'
import EditUsername from '../../components/EditUsername'
import EditPassword from '../../components/EditPassword'
import DeleteUser from '../../components/DeleteUser'

class AccountContainer extends React.Component{
    
    state = {
        myOrders: [],
        userName: "",
        purchases: [],
        checkedOut: [],
        token: localStorage.token,
        loggedInUserId: localStorage.userId,
        
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
            order,
            purchases,
            checkedOut: order.checkedout
            })
            // console.log(this.state.myOrders, this.state.userName, this.state.purchases)
        }


        pastOrders = () => {
            console.log(this.state.myOrders)
            return !!this.state.myOrders.length ? this.state.myOrders.filter(order => order.checkedout === true ) : false
        }
    
        myOrders = () => {
            return !this.pastOrders() ? this.pastOrders().map(order => <OrderCard key={order.id} order={order.purchases} /> ) : "You have not placed any orders."
       
        }

        deleteUser = async () => {
            await fetch(`http://localhost:3000/users/${localStorage.userId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.token
                } 
            })
            // localStorage.userId = ""
            // localStorage.token = ""
        
            this.setState({
              loggedInUserId: null,
              token: null
            })
            window.alert("Account deleted")
            
        
            this.props.history.push("/login")
            return <Redirect to="/login" />
        } 


    render(){
    return (
        <div style={{textAlign: "Center", marginTop:"3%", fontFamily: "Optima", fontWeight: "100", color: "#343a40"}}>
        <h3 style={{margin: "30px", fontFamily: "Optima"}}>Update Info</h3>
        <p>Current Username: {this.state.userName}</p>
         <EditUsername />
         <EditPassword />
         <br></br>
         {/* <li style={{listStyle: "none", margin: "10px"}}>
        {this.myOrders()}
    </li> */}
         <h3 style={{fontFamily: "Optima"}}>Completed Purchases</h3>
         <OrderCard/>
         {/* <div style={{margin: "30px"}}>{this.state.myOrders}</div>  */}
         {/* {this.state.myOrders.map(order => <div>{order.this.state.myOrders}</div>)} */}
         {/* <p>{this.pastOrders()}</p> */}
         {/* <div>
             {this.state.myOrders.map((myOrder) => (
                 <p>[{myOrder.purchases}]</p>
             ))}
         </div> */}
         <h3 style={{fontFamily: "Optima"}}>Delete Account</h3>
         <button className='delete-btn' onClick={this.deleteUser}>Delete</button>
         {/* <DeleteUser /> */}
         <br></br><br></br><br></br>
        </div>
    )}
}

export default AccountContainer;
