import 'bootstrap/dist/css/bootstrap.min.css';
import { ViewLogin } from './Views/ViewLogin.js'
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
  NavbarText
} from 'reactstrap'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
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
                <DropdownItem>
                  Proletario
                </DropdownItem>
                <DropdownItem>
                  Cerdo Capitalista
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Administrador
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavbarText> Queremos que trabajes</NavbarText>

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
          Crear CV
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