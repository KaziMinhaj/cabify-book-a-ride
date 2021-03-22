import { Link } from 'react-router-dom';
import './Transport.css'

const Transport = (props) => {
    const { id, photo, type } = props.data
    return (

        <Link to={`/home/${id}`}>
            <div className="row">
                <div className="card eachCard col-sm" style={{ width: '18rem' }}>
                    <img src={photo} class="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-text">{type}</h5>
                    </div>
                </div>
            </div>

        </Link>

    );
};

export default Transport;

