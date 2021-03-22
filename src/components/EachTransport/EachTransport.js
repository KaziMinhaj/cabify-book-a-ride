import React from 'react';
import { useParams } from 'react-router';

const EachTransport = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Each transport</h1>
            <h1>{id}</h1>
        </div>
    );
};

export default EachTransport;