import React from 'react';
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import logo from '../slike/logo-fixed.png';

const Navigacija = () => {

    const token = window.sessionStorage.getItem('token');
    const user = token ? JSON.parse(window.sessionStorage.getItem('user')) : null;
    const tipKorisnika = user ? user.tip_korisnika : null;
    const isAdmin = tipKorisnika === 'admin';
    const isAdminIliKompanija = tipKorisnika === 'admin' || tipKorisnika === 'kompanija';

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/"><Image width={180} height={60} src={logo} className="img-fluid" alt="poslovi i prakse" /> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/o-nama">O nama</Nav.Link>
                            <Nav.Link href="/pretraga">Pretraga</Nav.Link>

                            <Nav.Link href="/login">Login</Nav.Link>
                            {
                                isAdminIliKompanija && (
                                    <>
                                        <Nav.Link href="/novi-oglas">Novi oglas</Nav.Link>
                                    </>
                                )
                            }
                            {
                                isAdmin && (
                                    <>
                                        <Nav.Link href="/administracija">Administracija</Nav.Link>
                                    </>
                                )
                            }
                            {
                                token && (
                                    <>
                                        <Nav.Link href="/moje-prijave">Moje prijave</Nav.Link>
                                        <Nav.Link href="/logout">Logout</Nav.Link>
                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigacija;
