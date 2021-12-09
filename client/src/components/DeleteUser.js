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
            <button className='delete-btn' onClick={this.delete}>Delete</button>
        )
    }
}

export default DeleteUser

