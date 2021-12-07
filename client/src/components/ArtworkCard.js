import React from 'react';
import { NavLink } from 'react-router-dom'



const ArtworkCard = (props) => {

    const { artwork } = props;

    return (
        <div className='product-div'> 
            <NavLink to={"/artworks/" + artwork.id} style={{textDecorationColor: "#929ca7"}}>
                <img className="thumbnail-img" src={artwork.img} alt={artwork.name} />
                <div>
                    <h4 style={{color: "#343a40"}}>{artwork.name}</h4>
                    {/* <p style={{minHeight: "30px", maxHeight: "150px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{rock.description}</p> */}
                </div>
                <footer>
                    <small className="text-muted">${artwork.price}</small>
                </footer>
            </NavLink>
        </div>
    )
}

export default ArtworkCard;


