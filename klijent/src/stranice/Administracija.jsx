import React, {useEffect, useState} from 'react';
import Naslov from "../komponente/Naslov";
import server from "../logika/komunikacijaSaServerom";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import {Chart} from "react-google-charts";
import useForm from "../logika/useForm";

const Administracija = () => {

    const [grafikonStatusi, setGrafikonStatusi] = React.useState([]);
    const [grafikonTipovi, setGrafikonTipovi] = React.useState([]);
    const [poruka, setPoruka] = useState('');

    const [oglasi, setOglasi] = useState([]);
    const [dugmici, setDugmici] = useState([]);
    const [link, setLink] = useState('paginacija');

    const {formData, handleChange, resetForm} = useForm({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        server.get('grafikon-podaci-status').then(result => {
            let podaci = result.data.podaci;
            let podaciZaGrafik = [];
            podaciZaGrafik.push(['Status', 'Broj Oglasa']);
            podaci.forEach(item => {
                podaciZaGrafik.push([item.status, item.broj_oglasa]);
            });
            setGrafikonStatusi(podaciZaGrafik);

        })
    }, []);

    useEffect(() => {
        server.get('grafikon-podaci-tipovi').then(result => {
            let podaci = result.data.podaci;
            let podaciZaGrafik = [];
            podaciZaGrafik.push(['Tip', 'Broj Oglasa']);
            podaci.forEach(item => {
                podaciZaGrafik.push([item.tip_oglasa, item.broj_oglasa]);
            });
            setGrafikonTipovi(podaciZaGrafik);

        })
    }, []);

    useEffect(() => {
        server.get(link).then(result => {
            setOglasi(result.data.podaci.data);
            setDugmici(result.data.podaci.links);
        }).catch(err => {
            console.log(err);
        });
    }, [link]);


    const registracija = (e) => {
        e.preventDefault();

        server.post('register-kompanija', {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }).then(result => {
            console.log(result);
            const podaci = result.data;
            if (podaci.uspesno) {
                resetForm();
                setPoruka('Uspešno ste se registrovali kompaniju');
            } else {
                setPoruka('Došlo je do greške prilikom registracije.');
            }
        }).catch(err => {
            setPoruka('Došlo je do greške prilikom registracije.');
            console.log(err);
        })
    }

    return (
        <div>
            <Naslov naslov="Administracija" podnaslov={
                poruka
            }/>

            <Row>
                <Col md={6}>
                    <Chart
                        chartType="PieChart"
                        data={grafikonStatusi}
                        options={{title: 'Raspodela Oglasa po Statusima'}}
                        width={"100%"}
                        height={"400px"}
                    />
                </Col>
                <Col md={6}>

                    <Chart
                        chartType="BarChart"
                        data={grafikonTipovi}
                        options={{title: 'Raspodela Oglasa po Tipovima'}}
                        width={"100%"}
                        height={"400px"}
                    />

                </Col>
            </Row>

            <Row>
                <Col md={12} className="mt-4 mb-4">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Ime i prezime</Form.Label>
                            <Form.Control type="text" name="name" onChange={handleChange} placeholder="Unesite ime i prezime" value={formData.name} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail2">
                            <Form.Label>Email adresa</Form.Label>
                            <Form.Control type="email" name="email" onChange={handleChange} placeholder="Unesite email" value={formData.email} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword2">
                            <Form.Label>Lozinka</Form.Label>
                            <Form.Control type="password" name="password" onChange={handleChange} placeholder="Unesite lozinku" value={formData.password} />
                        </Form.Group>
                        <Button variant="primary" className="dugme" type="submit" onClick={registracija}>
                            Registruj se
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Row>
                <Row>
                    <Col md={12}>
                        <Table hover>
                            <thead>
                            <tr>
                                <th>Naslov</th>
                                <th>Kompanija</th>
                                <th>Tip Oglasa</th>
                                <th>Rok za prijavu</th>
                                <th>Akcije</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                oglasi.map((oglas) => (
                                    <tr key={oglas.id}>
                                        <td>{oglas.naslov}</td>
                                        <td>{oglas.kompanija.naziv}</td>
                                        <td>{oglas.tip_oglasa.naziv}</td>
                                        <td>{oglas.rokZaPrijavu}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => {
                                                server.delete('oglasi/' + oglas.id).then(result => {
                                                    setOglasi(oglasi.filter(o => o.id !== oglas.id));
                                                }).catch(err => {
                                                    console.log(err);
                                                })
                                            }}>Obrišddi Oglas</Button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Col md={12} className="d-flex justify-content-center mb-3">
                    {
                        dugmici.map((dugme, index) => (
                            <Button key={index} variant={dugme.active ? 'primary' : 'secondary'} className="me-2" onClick={() => setLink(dugme.url)}>
                                {dugme.label.replace('&laquo; Previous', 'Prethodna').replace('Next &raquo;', 'Sledeća')}
                            </Button>
                        ))
                    }
                </Col>
            </Row>
        </div>
    );
};

export default Administracija;
