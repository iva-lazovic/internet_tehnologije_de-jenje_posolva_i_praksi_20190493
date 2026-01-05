import React from 'react';
import Naslov from "../komponente/Naslov";
import yettel from "../slike/logoi/yettel.jpg";
import raifaisen from "../slike/logoi/raifaisen.png";
import cocacola from "../slike/logoi/coca-cola.png";

const ONama = () => {
    return (
        <div>
            <Naslov naslov="O nama" podnaslov="Saznajte više o našoj misiji i timu" />
            <p>
                Dobrodošli na našu platformu za oglašavanje poslova! Naša misija je povezati poslodavce sa
                kvalifikovanim kandidatima i olakšati proces zapošljavanja za sve uključene strane.
            </p>
            <p>
                Naš tim čine iskusni profesionalci iz oblasti ljudskih resursa, tehnologije i marketinga,
                posvećeni pružanju najbolje moguće usluge našim korisnicima. Verujemo u transparentnost,
                efikasnost i inovacije kao ključne vrednosti koje nas vode u našem radu.
            </p>
            <p>
                Hvala vam što ste deo naše zajednice. Radujemo se što ćemo zajedno graditi uspešne karijere
                i poslovne prilike!
            </p>

            <Naslov naslov="Naši partneri" />

            <div className="d-flex justify-content-around align-items-center mt-4">
                <div className="text-center">
                    <img src={yettel} alt="Yettel" style={{ maxWidth: '150px', height: 'auto' }} />
                    <p>Yettel</p>
                </div>
                <div className="text-center">
                    <img src={raifaisen} alt="Raiffeisen Bank" style={{ maxWidth: '150px', height: 'auto' }} />
                    <p>Raiffeisen Bank</p>
                </div>
                <div className="text-center">
                    <img src={cocacola} alt="Coca-Cola" style={{ maxWidth: '150px', height: 'auto' }} />
                    <p>Coca-Cola</p>
                </div>
            </div>

        </div>
    );
};

export default ONama;
