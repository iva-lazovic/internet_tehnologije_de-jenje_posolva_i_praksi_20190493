import React, {useEffect} from 'react';
import Naslov from "../komponente/Naslov";
import server from "../logika/komunikacijaSaServerom";
import {Alert, Col, Row, Table} from "react-bootstrap";

const MojePrijave = () => {

    const [prijave, setPrijave] = React.useState([]);

    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : null;

    useEffect(() => {
        server.get('moje-prijave/' + user.id).then(result => {
            setPrijave(result.data.podaci);
        }).catch(err => {
            console.log(err);
        })

    }, []);

    const obrisiPrijavu = (id) => {
        server.delete('prijave/' + id).then(result => {
            setPrijave(prijave.filter(p => p.id !== id));
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <>
            <Naslov naslov="Moje prijave" podnaslov="Pregled vaših prijava na oglase" />

            <Row>
                <Col md={12}>
                    {
                        prijave.length === 0 ? (
                            <Alert variant="info">
                                Nemate nijednu prijavu na oglase.
                            </Alert>
                        ) : (
                            <>
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>Oglas</th>
                                            <th>Rok</th>
                                            <th>CV</th>
                                            <th>Akcije</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            prijave.map((prijava) => (
                                                <tr key={prijava.id}>
                                                    <td>{prijava.oglas.naslov}</td>
                                                    <td>{prijava.oglas.rokZaPrijavu}</td>
                                                    <td>
                                                        <a href={prijava.cvLink} target="_blank" rel="noreferrer">
                                                            Pogledaj CV
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => {
                                                            obrisiPrijavu(prijava.id);
                                                        }} type="button" > Otkaži prijavu</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </>
                        )
                    }
                </Col>
            </Row>
        </>
    );
};

export default MojePrijave;
