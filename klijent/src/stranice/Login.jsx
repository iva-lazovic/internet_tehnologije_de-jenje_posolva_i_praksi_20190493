import React, {useState} from 'react';
import Naslov from "../komponente/Naslov";
import {Button, Form} from "react-bootstrap";
import server from "../logika/komunikacijaSaServerom";

const Login = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [poruka, setPoruka] = useState('');

    const forma =  isLogin ? 'Prijava korisnika' : 'Registracija korisnika';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const login = (e) => {
        e.preventDefault();
        setPoruka("");

        server.post('login', {
            email: formData.email,
            password: formData.password
        }).then(result => {
            const data = result.data.podaci;
            window.sessionStorage.setItem('token', data.token);
            window.sessionStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = '/';
        }).catch(err => {
            setPoruka('Došlo je do greške prilikom prijave.');
            console.log(err);
        });
    }

    return (
        <>
        <Naslov naslov={forma} podnaslov={poruka} />
            {
                isLogin && (
                    <>
                        <Form className="mt-5 mb-5">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email adresa</Form.Label>
                                <Form.Control type="email" name="email" onChange={handleChange} placeholder="Unesite email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Lozinka</Form.Label>
                                <Form.Control type="password" name="password" onChange={handleChange} placeholder="Unesite lozinku" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <a href="#"><span onClick={() => {
                                    setIsLogin(false)
                                }}>Nemate nalog? Molimo Vas da se registrujete!!!</span></a>
                            </Form.Group>
                            <Button variant="primary" className="dugme" type="submit" onClick={login}>
                                Prijavi se
                            </Button>
                        </Form>
                    </>
                )
            }

            {
                !isLogin && (
                    <>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Ime i prezime</Form.Label>
                                <Form.Control type="text" name="name" onChange={handleChange} placeholder="Unesite ime i prezime" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email adresa</Form.Label>
                                <Form.Control type="email" name="email" onChange={handleChange} placeholder="Unesite email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Lozinka</Form.Label>
                                <Form.Control type="password" name="password" onChange={handleChange} placeholder="Unesite lozinku" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <a href="#"> <span onClick={
                                    () => {
                                        setIsLogin(true)
                                }}>Imate nalog? Molimo Vas da se prijavite!!!</span></a>
                            </Form.Group>
                            <Button variant="primary" className="dugme" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </>
                )
            }
        </>
    );
};

export default Login;
