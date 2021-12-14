import React from 'react'
const api = 'https://abstract-commerce.herokuapp.com/'

class EditUsername extends React.Component{

    state = {
        username: "",
    }

    editUsername = async (newUsername) => {
        await fetch(api + `users/${localStorage.userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            },
            body: JSON.stringify({user:{
              username: newUsername}
            })
        })
            this.setState({
                username: ""
            })
        
        alert("Your username has been updated.")
    }

    onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      handleChangeUsername = event => {
        event.preventDefault()
        this.editUsername(this.state.username)
    }
    render(){
        return(
            <form onSubmit={this.handleChangeUsername}>
            <label style={{margin: "20px", fontFamily: "Optima"}}>New Username:</label>
            <input
              type="text"
              autoComplete="new-username"
              onChange={ this.onChange /* for controlled form input status */ } 
              name="username" 
              value={ this.state.username /* for controlled form input status */ } 
            />
            <input className='btn' type="submit"  style={{fontSize: "15px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "30px"}} />
          </form>  
        )
    }
}

export default EditUsername