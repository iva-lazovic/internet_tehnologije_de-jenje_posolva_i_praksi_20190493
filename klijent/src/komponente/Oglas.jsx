import React from 'react';
import PropTypes from 'prop-types';
import {Card} from "react-bootstrap";

const Oglas = props => {
    const { naslov, opis, rok, kompanija, tip, tagovi } = props;

    const kraciOpis = opis.length > 100 ? opis.substring(0, 100) + '...' : opis;
    return (
        <>
            <Card style={{ width: '18rem' }} className="mt-4 mb-2">
                <Card.Body>
                    <Card.Title>{naslov}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{tip}</Card.Subtitle>
                    <Card.Text dangerouslySetInnerHTML={{ __html: kraciOpis }}>

                    </Card.Text>
                    <Card.Link href="#">{kompanija}</Card.Link>
                    <Card.Link href="#">{rok}</Card.Link>
                </Card.Body>
                <Card.Footer>
                    {tagovi && tagovi.map((tag, index) => (
                        <span key={index} className="badge bg-secondary me-1">{tag}</span>
                    ))}
                </Card.Footer>
            </Card>
        </>
    );
};

Oglas.propTypes = {
    naslov: PropTypes.string.isRequired,
    opis: PropTypes.string.isRequired,
    rok: PropTypes.string.isRequired,
    kompanija: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
    tagovi: PropTypes.array
};

export default Oglas;
