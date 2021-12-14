import React from 'react'

class EditPassword extends React.Component{

    state = {
        password: "",
        }

    editPassword = async (newPassword) => {
        await fetch(`users/${localStorage.userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            },
            body: JSON.stringify({user:{
            password: newPassword}
            })
            })
            this.setState({
                password: ""
            })
            alert("Your password has been updated.")
    }

    onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    handleChangePassword = event => {
        event.preventDefault()
        this.editPassword(this.state.password)
    }
    render(){
        return(
            <form onSubmit={this.handleChangePassword}>
         <label className="label">New Password:</label>      
        <input
          type="password"
          value={this.state.password}
          onChange={this.onChange}
          name="password"
          autoComplete="new-password"
        />
        <input className='btn'  style={{fontSize: "15px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "30px"}}  type="submit"  />
      </form>
        )
    }
}

export default EditPassword