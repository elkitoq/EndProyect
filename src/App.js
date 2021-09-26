import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/Css/generic.css';

import {
  BrowserRouter as Router,
} from "react-router-dom";
import React from 'react';
import { NavegadorPrincipal } from './Components/Navegador.js';
import { ViewMain } from './Views/ViewMain.js';
import { StatusComponent } from './Tools/Status';
import { Events } from './Components/Events.js';


function App() {

  return (
    <Router>
      <StatusComponent>
      <Events/>
      <NavegadorPrincipal />
      <ViewMain/>
      </StatusComponent>
    </Router>
  );
}

export default App;