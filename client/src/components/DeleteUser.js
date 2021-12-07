import React from 'react';
import {Redirect} from 'react-router-dom'

class DeleteUser extends React.Component{

    // maybe

    delete = async () => {
        await fetch(`http://localhost:3000/users/${localStorage.userId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
            
        })
        return <Redirect to={'/'} />
    } 

    render(){
        return(
            <button style={{fontSize: "18px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "20px", marginBottom: "50px"}}  onClick={this.delete}>Delete</button>
        )
    }
}

export default DeleteUser

