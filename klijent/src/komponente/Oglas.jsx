import React from 'react';
import PropTypes from 'prop-types';
import {Card} from "react-bootstrap";

const Oglas = props => {
    const { oglas, setIzabraniOglas } = props;

    const kraciOpis = oglas.opis.length > 100 ? oglas.opis.substring(0, 100) + '...' : oglas.opis;
    return (
        <>
            <Card className="mt-4 mb-2">
                <Card.Body>
                    <Card.Title>{oglas.naslov}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{oglas.tipOglasa.naziv}</Card.Subtitle>
                    <Card.Text dangerouslySetInnerHTML={{ __html: kraciOpis }}>

                    </Card.Text>
                    <Card.Link href="#">{oglas.kompanija.naziv}</Card.Link>
                    <Card.Link href="#">{oglas.rokZaPrijavu}</Card.Link>
                </Card.Body>
                <Card.Footer>
                    {oglas.tagovi && oglas.tagovi.map((tag, index) => (
                        <span key={index} className="badge bg-secondary me-1">{tag.tag}</span>
                    ))}
                    <hr/>
                    <button type="button" className="dugme" onClick={
                        () => setIzabraniOglas(oglas)
                    }>Detaljnije</button>
                </Card.Footer>
            </Card>
        </>
    );
};

Oglas.propTypes = {
    oglas: PropTypes.object.isRequired,
    setIzabraniOglas: PropTypes.func.isRequired
};

export default Oglas;
