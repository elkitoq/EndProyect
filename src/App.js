import 'bootstrap/dist/css/bootstrap.min.css';
import { ViewLogin } from './Views/ViewLogin.js'
import { ViewCreateCV } from './Views/ViewCreateCV'
import { ViewFindWorker } from "./Views/ViewFindWorker";
import { ViewHomeAdmin } from "./Views/ViewHomeAdmin";
import { ViewHomeAspirante } from "./Views/ViewHomeAspirante";
import { ViewHomeEmpresa } from "./Views/ViewHomeEmpresa";
import { ViewJobOffice } from "./Views/ViewJobOffice";
import { ViewLookForJob } from "./Views/ViewLookForJob";
import { ViewLookForWorker } from "./Views/ViewLookForWorker";
import { ViewOfferJob } from "./Views/ViewOfferJob";
import { ViewOfferService } from "./Views/ViewOfferService";
import { ViewFindJob } from "./Views/ViewFindJob";
import { ViewFindService } from "./Views/ViewFindService";

import { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  ButtonGroup 
} from 'reactstrap'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React from 'react';



function App() {


  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Router>
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="/">Trabaje para todes</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/CVCreate/">Crear CV</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Usuarios
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/homeAspirante/">
                  Proletario
                </DropdownItem>
                <DropdownItem href="/homeEmpresa/">
                  Cerdo Capitalista
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/homeAdmin/">
                  Administrador
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="/jobOffice/">Oficina de empleo</NavLink>
            </NavItem>
            <Nav>
              <InputGroup>
                <Input placeholder="Busqueda" />
                <InputGroupAddon addonType="append">
                <ButtonGroup>
                  <Button color="secondary" href="/lookforJob/">Buscar Trabajo</Button>
                  <Button color="secondary" href="/lookforWorker/">Buscar Empleado</Button>
                </ButtonGroup>
                </InputGroupAddon>
              </InputGroup>
            </Nav>
          </Nav>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink href="/Login/">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Register/">Register</NavLink>
            </NavItem>
          </Nav>


        </Collapse>
      </Navbar>


      <Switch>
        <Route path="/Login">
          <ViewLogin />
        </Route>
        <Route path="/Register">
          <ViewLogin />
        </Route>
        <Route path="/CVCreate">
          <ViewCreateCV />
        </Route>
        <Route path="/lookforJob">
          <ViewLookForJob />
        </Route>
        <Route path="/lookforWorker">
          <ViewLookForWorker />
        </Route>
        <Route path="/findWorker">
          <ViewFindWorker />
        </Route>
        <Route path="/homeAdmin">
          <ViewHomeAdmin/>
        </Route>
        <Route path="/homeAspirante">
          <ViewHomeAspirante />
        </Route>
        <Route path="/homeEmpresa">
          <ViewHomeEmpresa />
        </Route>

        <Route path="/jobOffice">
          <ViewJobOffice />
        </Route>        
        <Route path="/offerJob">
          <ViewOfferJob />
        </Route>        
        <Route path="/offerService">
          <ViewOfferService />
        </Route>
        <Route path="/findJob">
          <ViewFindJob />
        </Route>

        <Route path="/findService">
          <ViewFindService />
        </Route>
        
        <Route path="/">
          <h1>HOLA MUNDO</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
<div className="App">



</div>