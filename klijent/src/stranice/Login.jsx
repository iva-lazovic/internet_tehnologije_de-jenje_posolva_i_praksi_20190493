import React, {useState} from 'react';
import Naslov from "../komponente/Naslov";
import {Button, Form} from "react-bootstrap";
import server from "../logika/komunikacijaSaServerom";
import useForm from "../logika/useForm";

const Login = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [poruka, setPoruka] = useState('');

    const forma =  isLogin ? 'Prijava korisnika' : 'Registracija korisnika';

    const {formData, handleChange} = useForm({
        name: '',
        email: '',
        password: ''
    });

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

    const registracija = (e) => {
        e.preventDefault();

        server.post('register-student', {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }).then(result => {
            console.log(result);
            const podaci = result.data;
            if (podaci.uspesno) {
                setPoruka('Uspešno ste se registrovali. Sada se možete prijaviti.');
                setIsLogin(true);
            } else {
                setPoruka('Došlo je do greške prilikom registracije.');
            }
        }).catch(err => {
            setPoruka('Došlo je do greške prilikom registracije.');
            console.log(err);
        })
    }

    return (
        <>
        <Naslov naslov={forma} podnaslov={poruka} />
            {
                isLogin && (
                    <>
                        <Form className="mt-5 mb-5">
                            <Form.Group className="mb-3" controlId="formBasicEmail1">
                                <Form.Label>Email adresa</Form.Label>
                                <Form.Control type="email" name="email" onChange={handleChange} placeholder="Unesite email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword1">
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

                            <Form.Group className="mb-3" controlId="formBasicEmail2">
                                <Form.Label>Email adresa</Form.Label>
                                <Form.Control type="email" name="email" onChange={handleChange} placeholder="Unesite email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword2">
                                <Form.Label>Lozinka</Form.Label>
                                <Form.Control type="password" name="password" onChange={handleChange} placeholder="Unesite lozinku" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox2">
                                <a href="#"> <span onClick={
                                    () => {
                                        setIsLogin(true)
                                }}>Imate nalog? Molimo Vas da se prijavite!!!</span></a>
                            </Form.Group>
                            <Button variant="primary" className="dugme" type="submit" onClick={registracija}>
                                Registruj se
                            </Button>
                        </Form>
                    </>
                )
            }
        </>
    );
};

export default Login;
