import React, {useEffect} from 'react';
import server from "../logika/komunikacijaSaServerom";
import Naslov from "../komponente/Naslov";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import Oglas from "../komponente/Oglas";

const Pretraga = () => {
    const [tagovi, setTagovi] = React.useState([]);
    const [oglasi, setOglasi] = React.useState([]);
    const [izabraniTag, setIzabraniTag] = React.useState(null);
    const [izabraniOglas, setIzabraniOglas] = React.useState(null);
    const [prijave, setPrijave] = React.useState([]);
    const [file, setFile] = React.useState(null);

    const setujOvajFile = (e) => {
        setFile(e.target.files[0]);
    }

    const prijava = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('cv', file);
        formData.append('oglasId', izabraniOglas.id);
        formData.append('userId', user.id);

        server.post('prijave', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(result => {
            alert('Uspešno ste se prijavili na oglas.');
            setIzabraniOglas(null);
        }).catch(err => {
            console.log(err);
        })
    }

    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : null;
    const isStudent = user ? user.tipKorisnika === 'student' : false;

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

    useEffect(() => {
        if (isStudent && izabraniOglas && user) {
            server.get('moje-prijave/' + user.id).then(result => {
                setPrijave(result.data.podaci);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [isStudent, izabraniOglas]);

    return (
        <>
            <Naslov naslov="Pretraga Oglasa"/>

            {
                !izabraniOglas && (
                    <>
                        <Row>
                            {
                                tagovi && tagovi.map((tag, index) => {
                                    const active = izabraniTag && izabraniTag.id === tag.id;
                                    const activeClass = active ? 'badge bg-secondary me-1' : 'badge bg-primary me-1';

                                    return (
                                        <Col md={2} key={index} className="tagovi"><span onClick={() => setIzabraniTag(tag)} className={activeClass}>{tag.tag}</span></Col>
                                    )
                                })
                            }
                        </Row>

                        <Row>
                            {
                                oglasi.map(oglas => (
                                        <Col md={3} key={oglas.id}>
                                            <Oglas oglas={oglas} setIzabraniOglas={setIzabraniOglas} />
                                        </Col>
                                    )
                                )
                            }
                        </Row>
                    </>
                )
            }

            {
                izabraniOglas && (
                    <>
                        <Row>
                            <Col md={8} className="mt-2">
                                <h2>{izabraniOglas.naslov}</h2>
                                <h5>{izabraniOglas.kompanija.naziv}</h5>
                                <p><strong>Tip Oglasa:</strong> {izabraniOglas.tipOglasa.naziv}</p>
                                <p><strong>Rok za prijavu:</strong> {izabraniOglas.rokZaPrijavu}</p>
                                <div dangerouslySetInnerHTML={{ __html: izabraniOglas.opis }}></div>
                                <div className="mt-3">
                                    {
                                        izabraniOglas.tagovi && izabraniOglas.tagovi.map((tag, index) => (
                                            <span key={index} className="badge bg-secondary me-1">{tag.tag}</span>
                                        ))
                                    }
                                </div>
                            </Col>
                            <Col md={4} className="mt-2">
                                {
                                    isStudent && !prijave.some(prijava => prijava.oglas.id === izabraniOglas.id) && (
                                        <>
                                            <Form className="mt-5 mb-5">
                                                <Form.Group className="mb-3" controlId="formBasicEmail1">
                                                    <Form.Label>CV</Form.Label>
                                                    <Form.Control type="file" name="email" onChange={setujOvajFile} placeholder="Unesite CV" />
                                                </Form.Group>

                                                <Button variant="primary" className="dugme" type="submit" onClick={prijava}>
                                                    Prijavi se
                                                </Button>
                                            </Form>
                                        </>
                                    )
                                }
                                {
                                    !isStudent && (
                                        <Alert variant="warning">
                                            Samo studenti mogu da se prijave na oglase.
                                        </Alert>
                                    )
                                }

                                {
                                    isStudent && prijave.some(prijava => prijava.oglas.id === izabraniOglas.id) && (
                                        <Alert variant="warning">
                                            Već ste se prijavili na ovaj oglas.
                                        </Alert>
                                    )
                                }
                            </Col>
                            <Col md={12} className="mt-3">
                                <Button variant="secondary" className="dugme" onClick={() => setIzabraniOglas(null)}>
                                    Nazad na pretragu
                                </Button>
                            </Col>
                        </Row>
                    </>
                )
            }

        </>
    );
};

export default Pretraga;
