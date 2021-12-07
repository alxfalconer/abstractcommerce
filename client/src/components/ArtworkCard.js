import React from 'react';
import { NavLink } from 'react-router-dom'

const ArtworkCard = (props) => {

    const { artwork } = props;

    return (
        <div className='product-div'> 
            <NavLink to={"/artworks/" + artwork.id} style={{textDecorationColor: "#929ca7"}}>
                <img className="thumbnail-img" src={artwork.img} alt={artwork.name} />
                <div>
                    <h4 style={{color: "#343a40", fontFamily: "Optima", fontSize: "18px"}}>{artwork.name}</h4>
                </div>
                <footer>
                    <small style={{fontFamily: "Optima", fontSize: "18px"}} className="text-muted">${artwork.price}</small>
                </footer>
            </NavLink>
        </div>
    )
}

export default ArtworkCard;


