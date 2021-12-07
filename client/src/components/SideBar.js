import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

const style = {
    margin: "10px",
    position: "fixed",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    fontFamily: "Courier New, Monospace", 
    fontWeight: "100", 
    color: "#343a40", 
    textAlign: "center"
  }

export class SideBar extends Component {

    state = {
        value: '',
        sortedArtworks: []
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
    
    render() {
        return (
            <div style={style}>
                <h4 style={{marginTop: "50px", marginBottom: "30px"}}>Categories:</h4>
                <label>Filter:</label>
                <NavLink to="/artworks" style={{marginBottom: "20px"}}>
                    <select value={this.state.value} onChange={this.handleCategoryChange}>
                        <option value="All">All</option>
                        <option value="Paper">Paper</option>
                        <option value="Canvas">Canvas</option>
                        <option value="Digital">Digital</option>
                        <option value="Collage">Collage</option>
                        <option value="Other">Other</option>
                    </select>
                </NavLink>
                <label>Sort By:</label>
                <button style={{fontSize: "18px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "20px"}}  onClick={this.lowPriceSort}>Low Price</button>
                <button style={{fontSize: "18px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "20px"}}  onClick={this.highPriceSort}>High Price</button>

            </div>
        )
    }
}

export default SideBar;
