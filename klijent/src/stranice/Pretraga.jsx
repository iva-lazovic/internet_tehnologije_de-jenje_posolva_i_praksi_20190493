import React, {useEffect} from 'react';
import server from "../logika/komunikacijaSaServerom";
import Naslov from "../komponente/Naslov";
import {Col, Row} from "react-bootstrap";
import Oglas from "../komponente/Oglas";

const Pretraga = () => {
    const [tagovi, setTagovi] = React.useState([]);
    const [oglasi, setOglasi] = React.useState([]);
    const [izabraniTag, setIzabraniTag] = React.useState(null);

    useEffect(() => {
        server.get('tagovi').then(result => {
            setTagovi(result.data.podaci);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        server.get('oglasi').then(result => {
            setOglasi(result.data.podaci);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        if (izabraniTag) {
            server.get('pretraga-tagovi/' + izabraniTag.tag).then(result => {
                setOglasi(result.data.podaci);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [izabraniTag]);

    return (
        <>
            <Naslov naslov="Pretraga Oglasa" podnaslov="Mozete pretraziti oglase po tagu"/>

            <Row>
                {
                    tagovi.map(tag => (
                        <Col md={1} key={tag.id} className="d-flex justify-content-center m-1">
                            <button  onClick={() => setIzabraniTag(tag)} className="mb-1 dugme" disabled={
                                izabraniTag && izabraniTag.id === tag.id
                            } style={{
                                borderRadius: '20px',
                            }}>
                                {tag.tag}
                            </button>
                        </Col>
                    ))
                }
            </Row>

            <Row>
                {
                    oglasi.map(oglas => (
                        <Col md={3} key={oglas.id}>
                            <Oglas naslov={oglas.naslov} opis={oglas.opis} rok={oglas.rokZaPrijavu} kompanija={oglas.kompanija.naziv} tip={oglas.tipOglasa.naziv} />
                        </Col>
                        )
                    )
                }
            </Row>

        </>
    );
};

export default Pretraga;
