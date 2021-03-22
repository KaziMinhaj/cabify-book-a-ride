import React, { useState } from 'react';
import { useParams } from 'react-router';
import { allData } from '../FakeData/FakeData'
import './EachTransport.css'
import map from '../../images/Map.png'
import SearchResult from './SearchResult';

const EachTransport = () => {
    const { id } = useParams();
    const [state, setState] = useState({
        type: '',
        img: ''

    })
    const [location, setLocation] = useState({
        to: '',
        from: '',
        date: '',
        isSubmitted: false
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        location.isSubmitted = !location.isSubmitted;
    }
    const handleBlur = (event) => {
        location[event.target.name] = event.target.value
        console.log(location);
    }
    return (
        <div className="container">
            {
                allData.map(data => {
                    if (data.id === parseFloat(id)) {
                        state.type = data.type
                        state.img = data.photo
                    }
                })
            }
            <div className="row">
                <div className="col-sm search-box">
                    <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="">Pick form</label>
                        <br />
                        <input onBlur={handleBlur} name="from" type="text" required />
                        <br />
                        <label htmlFor="">Pick form</label>
                        <br />
                        <input onBlur={handleBlur} name="to" type="text" required />
                        <br />
                        <label htmlFor="">Pick a date</label>
                        <br />
                        <input onBlur={handleBlur} name="date" type="date" required />
                        <br />
                        <input type="submit" className="btn btn-warning searchBtn" />
                    </form>
                </div>
                <div className="col-sm map">
                    <img src={map} alt="" />
                </div>
            </div>

        </div >
    );
};

export default EachTransport;