import React from 'react';
import PropTypes from 'prop-types';

const Naslov = props => {
    const { naslov, podnaslov } = props;
    return (
        <>
            <div className="naslov-container">
                <h1 className="naslov">{naslov}</h1>
                <br/>
                {podnaslov && <p className="podnaslov">{podnaslov}</p>}
                <br/>
            </div>
        </>
    );
};

Naslov.propTypes = {
    naslov: PropTypes.string.isRequired,
    podnaslov: PropTypes.string
};

export default Naslov;
