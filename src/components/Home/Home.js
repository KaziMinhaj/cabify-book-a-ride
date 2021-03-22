import React from 'react';
import './Home.css'
import { allData } from '../FakeData/FakeData'
import Transport from '../Transports/Transport';

const Home = () => {
    return (
        <div className="home-container">
            <div className="card-container col-sm">
                {
                    allData.map(data => <Transport data={data} ></Transport>)
                }
            </div>

        </div>
    );
};

export default Home;