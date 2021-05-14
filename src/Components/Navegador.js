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





export const NavegadorPrincipal = ()=>{
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return(
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
    )
}
