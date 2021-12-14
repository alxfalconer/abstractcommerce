import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

const style = {
    margin: "50px",
    position: "fixed",
    height: "100%",
    display: "flex",
    fontSize: "20px", 
    flexDirection: "column",
    flexWrap: "wrap",
    fontFamily: "Optima", 
    fontWeight: "100", 
    color: "#343a40", 
    textAlign: "center"
  }

class SideBar extends Component {

    state = {
        value: '',
        sortedArtworks: [],
        allArtworks: []
    }

    componentDidMount = async() => {
        let rawArtworks = await fetch('http://localhost:3000/artworks')
        let artworks = await rawArtworks.json() 
          this.setState({
            allArtworks: artworks,
            displayArtworks: artworks
          })
      }
    
    handleCategoryChange = (event) => {
        this.setState({value: event.target.value})
        this.props.filterArtworksByCategory(event.target.value)
    }

   lowPriceSort = async () =>{
        await this.setState({
            sortedArtworks: [...this.props.displayArtworks].sort((a, b) => {
                if(a.price < b.price) { return -1; }
                if(a.price > b.price) { return 1; }
                return 0;
            })
        })
        this.props.sortArtworks(this.state.sortedArtworks)
    }
    highPriceSort = async () =>{
        await this.setState({
            sortedArtworks: [...this.props.displayArtworks].sort((a, b) => {
                if(a.price > b.price) { return -1; }
                if(a.price < b.price) { return 1; }
                return 0;
            })
        })
        this.props.sortArtworks(this.state.sortedArtworks)
    }

    shuffleArt = async () =>{
        await this.setState({
            sortedArtworks: [...this.props.displayArtworks].sort((a, b) => Math.random() - 0.5)
         
        })
        this.props.sortArtworks(this.state.sortedArtworks)
    }

        resetArt = async () => {
            this.setState({
                displayArtworks: this.state.allArtworks
              })
              this.props.sortArtworks(this.state.allArtworks)
            }
    
    render() {
        return (
            <div style={style}>
                <h4>Categories:</h4>
                <label>Filter:</label>
                <NavLink to="/artworks" style={{marginBottom: "20px"}}>
                    <select style={{fontSize: "19px"}} value={this.state.value} onChange={this.handleCategoryChange}>
                        <option value="All">All</option>
                        <option value="Paper">Paper</option>
                        <option value="Canvas">Canvas</option>
                        <option value="Digital">Digital</option>
                        <option value="Collage">Collage</option>
                        <option value="Other">Other</option>
                    </select>
                </NavLink>
                <br></br>
                <label>Sort By:</label>
                <br></br>
                <button className="btn" style={{fontSize: "16px", fontFamily: "Optima"}} onClick={this.lowPriceSort}>Low Price</button>
                <br></br>
                <button className="btn" style={{fontSize: "16px", fontFamily: "Optima"}} onClick={this.highPriceSort}>High Price</button>
                <br></br>
                <button className="btn" style={{fontSize: "16px", fontFamily: "Optima"}} onClick={this.shuffleArt}>Shuffle</button>
                <br></br>
                <button className="btn" style={{fontSize: "16px", fontFamily: "Optima"}} onClick={this.resetArt}>Reset</button>

            </div>
        )
    }
}

export default SideBar;
