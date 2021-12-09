import React from 'react';
import { NavLink } from 'react-router-dom'

const ArtworkCard = (props) => {

    const { artwork } = props;

    return (
        <div className='product-div'> 
            <NavLink to={"/artworks/" + artwork.id}>
                <img className="thumbnail-img" src={artwork.img} alt={artwork.name} />
                <div>
                    <h4 className="title-style">{artwork.name}</h4>
                </div>
                <footer>
                    <small className="price">${artwork.price}</small>
                </footer>
            </NavLink>
        </div>
    )
}

export default ArtworkCard;


