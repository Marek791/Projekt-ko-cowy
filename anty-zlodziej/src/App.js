import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


import Add   from "./components/addsection/Add";
import Home  from "./components/homesection/Home";
import Info  from './components/infosection/Info';
import Check from './components/searchsection/Check';




export default function App() {
  return (
      <div>
        <div className="container container-app">
          <Router>
            <div className="nav nav-app">
              <div className="logo-app" style={{fontFamily:"Rubik-Moonrocks"}}>Antyzłodziej</div>
              <nav>
                <ul className="menu">
                  <li>
                    <Link to="/home">Strona<br/> Domowa</Link>
                  </li>
                  <li>
                    <Link to="/add">Dodaj<br/> urządzenie</Link>
                  </li>
                  <li>
                    <Link to="/check">Sprawdź<br/> urządzenie</Link>
                  </li>
                  <li>
                    <Link to="/info">Informacje<br/> o nas</Link>
                  </li>
                </ul>


              </nav>
            </div>
            <Switch>
              <Route path="/Home"><Home/></Route>
              <Route path="/Add"><Add/></Route>
              <Route path="/Info"><Info/></Route>
              <Route path="/check"><Check/></Route>
            </Switch>
          </Router>
        </div>
        <fotter className="footer">
          <div className="footer_logo">Antyzłodziej</div>
          <div className="footer_icon">
            <img src="../src/components/photos/Facebook.svg" alt="facebook_icon" className="facebook_icon"/>
            <img src="../src/components/photos/Twitter.svg" alt="twitter_icon" className="twitter_icon"/>
          </div>
        </fotter>
      </div>

  );
}

//ReactDOM.render(<App />, document.getElementById("app"));


