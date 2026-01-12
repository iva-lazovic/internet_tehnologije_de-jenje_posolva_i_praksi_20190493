import React, {useEffect, useState} from 'react';
import Naslov from "../komponente/Naslov";
import {
    BtnBold,
    BtnItalic,
    BtnRedo, BtnUnderline,
    BtnUndo,
    Editor,
    EditorProvider,
    Toolbar
} from "react-simple-wysiwyg";
import {Button, Form} from "react-bootstrap";
import useForm from "../logika/useForm";
import server from "../logika/komunikacijaSaServerom";

const NoviOglas = () => {

    const [kompanije, setKompanije] = useState([]);
    const [tipoviOglasa, setTipoviOglasa] = useState([]);

    const {formData, handleChange} = useForm({
        'naslov': '',
        'opis': '',
        'rokZaPrijavu': '',
        'kompanijaId': '',
        'tipOglasaId': '',
        'tagovi': ''
    });

    useEffect(() => {
        server.get('kompanije').then(result => {
            setKompanije(result.data.podaci);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        server.get('tip-oglasa').then(result => {
            setTipoviOglasa(result.data.podaci);
        }).catch(err => {
            console.log(err);
        });
    }, []);


    const unesi = () => {
        server.post('oglasi', {
            naslov: formData.naslov,
            opis: formData.opis,
            rokZaPrijavu: formData.rokZaPrijavu,
            kompanijaId: formData.kompanijaId,
            tipOglasaId: formData.tipOglasaId,
            tagovi: formData.tagovi.split(',').map(tag => tag.trim())
        }).then(result => {
            alert('Uspešno ste dodali novi oglas.');
            window.location.href = '/';
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div>
            <Naslov naslov="Dodaj novi oglas" />
            <Form className="mt-5 mb-5">
                <Form.Group className="mb-3" controlId="formNaslov">
                    <Form.Label>Naslov</Form.Label>
                    <Form.Control type="text" name="naslov" onChange={handleChange} placeholder="Unesite naslov" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formOpis">
                    <Form.Label>Opis</Form.Label>
                    <EditorProvider>
                        <Editor name="opis" value={formData.opis} onChange={handleChange} >
                            <Toolbar>
                                <BtnUndo/>
                                <BtnRedo />
                                <BtnBold />
                                <BtnItalic />
                                <BtnUnderline />
                            </Toolbar>
                        </Editor>
                    </EditorProvider>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRok">
                    <Form.Label>Rok za prijavu</Form.Label>
                    <Form.Control type="date" name="rokZaPrijavu" onChange={handleChange} placeholder="Unesite naslov" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formKompanije">
                    <Form.Label>Kompanije</Form.Label>
                    <Form.Select name="kompanijaId" onChange={handleChange} >
                        <option>Izaberite kompaniju</option>
                        {
                            kompanije.map(kompanija => (
                                <option key={kompanija.id} value={kompanija.id}>{kompanija.naziv}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTipOglasa">
                    <Form.Label>Tip oglasa</Form.Label>
                    <Form.Select name="tipOglasaId" onChange={handleChange} >
                        <option>Izaberite tip oglasa</option>
                        {
                            tipoviOglasa.map(tip => (
                                <option key={tip.id} value={tip.id}>{tip.naziv}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTagovi">
                    <Form.Label>Tagovi(unesite tagove sa zarezom izmedju)</Form.Label>
                    <Form.Control type="text" name="tagovi" onChange={handleChange} placeholder="Unesite tagove" />
                </Form.Group>

                <Button variant="primary" className="dugme" type="submit" onClick={(e) => {
                    e.preventDefault();
                    unesi();
                }}>
                    Kreiraj oglas
                </Button>
            </Form>

        </div>
    );
};

export default NoviOglas;
