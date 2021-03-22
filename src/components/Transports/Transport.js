import React from 'react';
import { Link } from 'react-router-dom';
import './Transport.css'

const Transport = (props) => {
    return (

        <Link to={`/home/${props.data.id}`}>
            <div className="card eachCard" style={{ width: '18rem' }}>
                <img src={props.data.photo} class="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-text">{props.data.type}</h5>
                </div>
            </div>
        </Link>

    );
};

export default Transport;

