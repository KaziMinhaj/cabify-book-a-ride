import React, { useContext } from 'react';
import { UserContext } from '../../App';
import './Destination.css'
const Destination = () => {
    const [loggedInUser, setloggedInUser] = useContext(UserContext)
    const style = {
        textAlign: 'center',
        padding: '50px'
    }
    return (
        <div style={style} className="destinaiton">
            <h3>Welcome to Destinaiton page {loggedInUser.name}</h3>
            <h5>This is a priavte place thats why without login people cant access here.</h5>

        </div>
    );
};

export default Destination;