import React from 'react';
import './Home.css'
import { allData } from '../FakeData/FakeData'
import Transport from '../Transports/Transport';

const Home = () => {
    return (
        <div className="home-container">
            <div className="card-container row row-cols-1 row-cols-md-4 g-4">
                {
                    allData.map(data => <Transport data={data} ></Transport>)
                }
            </div>

        </div>
    );
};

export default Home;