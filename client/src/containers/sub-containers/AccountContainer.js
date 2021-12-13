import React from 'react';
import {withRouter} from 'react-router-dom'
import OrderCard from '../../components/OrderCard'
import EditUsername from '../../components/EditUsername'
import EditPassword from '../../components/EditPassword'

class AccountContainer extends React.Component{
    
    state = {
        userName: "",
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
            let user = await rawUser.json()

            
            this.setState({
            userName: user.username,
            })
        }

        deleteUser = async () => {
            await fetch(`http://localhost:3000/users/${localStorage.userId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.token
                } 
            })

            this.setState({
              loggedInUserId: null,
              token: null
            })
            window.alert("Account deleted")
            
        
            this.props.history.push("/login")
        
        } 


    render(){
        
    return (
        <div style={{textAlign: "Center", marginTop:"3%", fontFamily: "Optima", fontWeight: "100", color: "#343a40"}}>
        <h3 style={{margin: "30px", fontFamily: "Optima"}}>Update Info</h3>
        <p>Current Username: {this.state.userName}</p>
         <EditUsername />
         <EditPassword />
         <br></br>
         <OrderCard/>
         <h3 style={{fontFamily: "Optima"}}>Delete Account</h3>
         <button className='delete-btn' onClick={this.deleteUser}>Delete</button>
         <br></br><br></br><br></br>
        </div>
    )}
}

export default withRouter(AccountContainer);
