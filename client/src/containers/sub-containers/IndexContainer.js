import React from 'react';
import ArtworkCard from '../../components/ArtworkCard'
import SideBar from "../../components/SideBar";
    const style = {
        marginLeft: "180px",
        marginTop:"5%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        fontFamily: "Courier New, Monospace", 
        fontWeight: "100", 
        color: "#343a40", 
        textAlign: "center",
        justifyContent: "space-around"
      }

class IndexContainer extends React.Component {
    
    render(){
        
        const displayArtworks = this.props.displayArtworks.map(artwork => <ArtworkCard key={artwork.id} artwork={artwork} />)

        return (
            <React.Fragment >
            <SideBar allArtworks={this.props.allArtworks} sortArtworks={this.props.sortArtworks} filterArtworksByCategory={this.props.filterArtworksByCategory} displayArtworks={this.props.displayArtworks}/>
                <div style={style}>
                {displayArtworks}
                </div>
            </React.Fragment>
        )
    }
}

export default IndexContainer
