import React from 'react';
import { NavLink } from 'react-router-dom'



const ArtworkCard = (props) => {

    const { artwork } = props;

    return (
        <div style={{width: "200px", margin: "40px",  overflow: "hidden"}}> 
            <NavLink to={"/rocks/" + artwork.id} style={{textDecorationColor: "#929ca7"}}>
                <img height="200px" variant="top" src={artwork.img} alt={artwork.name} />
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


