import React from 'react';
import {withRouter} from 'react-router-dom'
const api = 'https://abstract-commerce.herokuapp.com/'

class DeleteUser extends React.Component{


    delete = async () => {
        await fetch(api + `users/${localStorage.userId}`, {
            method: 'DELETE', 
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            } 
        })
        window.alert("Account deleted")
        this.props.history.push("/")
    } 

    render(){
        return(
            <button className='delete-btn' onClick={this.delete}>Delete</button>
            
        )
    }
}

export default withRouter(DeleteUser)

