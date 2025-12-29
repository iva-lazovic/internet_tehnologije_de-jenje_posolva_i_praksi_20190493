import React from 'react';
import Naslov from "../komponente/Naslov";
import {Col, Image, Row} from "react-bootstrap";
import pocetna from "../slike/pocetna.png";

const Home = () => {
    return (
        <div>
            <Naslov naslov="Dobrodošli na Poslovi i prakse" podnaslov="Pronađite savršeni posao ili praksu za vas!" />
            <div className="mt-3">
                <Row>
                    <Col md={6}>
                        <Image src={pocetna} className="img-fluid" alt="Poslovi i prakse" />
                    </Col>
                    <Col md={6}>
                        <h3>Za kandidate</h3>
                        <ul>
                            <li>Pretražujte najnovije oglase za posao i prakse</li>
                            <li>Prijavite se brzo i jednostavno</li>
                            <li>Sačuvajte omiljene oglase za kasnije</li>
                        </ul>

                        <p>
                            Naša platforma vam omogućava da pronađete prilike koje odgovaraju vašim veštinama i interesovanjima. Bilo da ste student, diplomirani ili profesionalac, ovde ćete pronaći nešto za sebe.
                        </p>
                        <p>
                            Registrujte se danas i započnite svoju potragu za idealnim poslom ili praksom!
                        </p>
                    </Col>

                </Row>
            </div>
        </div>
    );
};

export default Home;
