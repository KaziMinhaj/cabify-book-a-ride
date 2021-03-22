import React, { useContext } from 'react';
import { UserContext } from '../../App';

const Blog = () => {
    const [loggedInUser, setloggedInUser] = useContext(UserContext)
    const style = {
        textAlign: 'center',
        padding: '50px'
    }
    return (
        <div style={style}>
            <h3>{loggedInUser.name} Sir, do you want to write blog?</h3>
            <h5>This project is under contruction. Later you will get blog</h5>
        </div>
    );
};

export default Blog; <h1>Blog comming soon</h1>