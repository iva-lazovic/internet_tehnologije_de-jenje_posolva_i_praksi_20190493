import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigacija from "./komponente/Navigacija";
import Footer from "./komponente/Footer";
import Naslov from "./komponente/Naslov";
import {Container} from "react-bootstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./stranice/Home";
import ONama from "./stranice/ONama";
import Login from "./stranice/Login";
import MojePrijave from "./stranice/MojePrijave";
import NoviOglas from "./stranice/NoviOglas";
import Pretraga from "./stranice/Pretraga";
import Administracija from "./stranice/Administracija";


function App() {
  return (
    <>
        <Navigacija />
        <Container>
            <div className="glavni">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/o-nama" element={<ONama />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/moje-prijave" element={<MojePrijave />} />
                        <Route path="/novi-oglas" element={<NoviOglas />} />
                        <Route path="/pretraga" element={<Pretraga />} />
                        <Route path="/administracija" element={<Administracija />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Container>
        <Footer />
    </>
  );
}

export default App;
