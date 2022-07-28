import React from 'react';
import './Home.scss';


export default function Home(props) {
    return (
        <div className="home-page">
            <p className="text text-home-page">
                <h1>Witamy w serwisie </h1><h2>Antyzłodziej</h2><br/>
                Ta strona pomoże sprawdzić Ci czy sprzęt który chcesz kupić został skradziony oraz zgłosić kradzież takiego sprzętu
                Zakładka <strong>"Dodaj urządzenie"</strong> pozwoli Ci dodać swój sprzęt do listy posiadanych
                przez Ciebie sprzętów oraz zgłosić kradzież
                Zakładka <strong>"Sprawdź urządzenie"</strong> pozwoli Ci sprawdzić czy dany sprzęt został skradziony<br/><br/>
                Jeśli widzisz sposób na ulepszenie naszego serwisu to zapraszam do kontaktu poprzez
                zakładkę <strong>"Informacje o nas"</strong>
                Życzymy miłego korzystania z serwisu


            </p>
        </div>
    );
}
