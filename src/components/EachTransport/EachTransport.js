import React, { useState } from 'react';
import { useParams } from 'react-router';
import { allData } from '../FakeData/FakeData'
import './EachTransport.css'
import map from '../../images/Map.png'
import icon from '../../images/peopleicon.png'


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
        const newInfo = { ...location }
        newInfo.isSubmitted = true;
        setLocation(newInfo)
    }
    const handleBlur = (event) => {
        location[event.target.name] = event.target.value
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
                <div style={location.isSubmitted ? { display: "none" } : { display: "block" }} className="col-sm search-box">
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
                <div style={location.isSubmitted ? { display: "block" } : { display: "none" }} className="col-sm search-box">
                    <div className="toFrom card shadow bg-warning">
                        <h5>From : {location.to}</h5>
                        <hr />
                        <h5>To : {location.from}</h5>
                    </div>
                    <div className="result shadow">
                        <div className="eachResult">
                            <img className="searched-img" src={state.img} alt="" />
                        </div>
                        <div className="eachResult">
                            <h5>{state.type}</h5>
                        </div>
                        <div className="eachResult">
                            <img className="searched-img" src={icon} alt="" />
                        </div>
                        <div className="eachResult ">
                            <h5>$67</h5>
                        </div>
                    </div>
                    <div className="result shadow">
                        <div className="eachResult">
                            <img className="searched-img" src={state.img} alt="" />
                        </div>
                        <div className="eachResult">
                            <h5>{state.type}</h5>
                        </div>
                        <div className="eachResult">
                            <img className="searched-img" src={icon} alt="" />
                        </div>
                        <div className="eachResult ">
                            <h5>$67</h5>
                        </div>
                    </div>
                    <div className="result shadow">
                        <div className="eachResult">
                            <img className="searched-img" src={state.img} alt="" />
                        </div>
                        <div className="eachResult">
                            <h5>{state.type}</h5>
                        </div>
                        <div className="eachResult">
                            <img className="searched-img" src={icon} alt="" />
                        </div>
                        <div className="eachResult ">
                            <h5>$67</h5>
                        </div>
                    </div>
                    <div className="result shadow">
                        <div className="eachResult">
                            <img className="searched-img" src={state.img} alt="" />
                        </div>
                        <div className="eachResult">
                            <h5>{state.type}</h5>
                        </div>
                        <div className="eachResult">
                            <img className="searched-img" src={icon} alt="" />
                        </div>
                        <div className="eachResult ">
                            <h5>$67</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm map">
                    <img src={map} alt="" />
                </div>
            </div>

        </div >
    );
};

export default EachTransport;