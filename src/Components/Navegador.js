import { useState } from 'react';
import { useCookies } from 'react-cookie';
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
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  ButtonGroup
} from 'reactstrap'
// import { Cookie } from './Cookie';





export const NavegadorPrincipal = () => {

  const [login, setCookie, removeCookie] = useCookies(['isLogin']);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const toggleLogin = () => {
    if (login.isLogin === "true")
      removeCookie('selectUser', { path: '/' })
    setCookie("isLogin", !(login.isLogin === "true"), { path: '/' });

  }

  return (
    <Navbar color="primary" dark expand="md">
      <NavbarBrand href="/">Trabaje para todes</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/CVCreate/">Crear CV</NavLink>
          </NavItem>
          <DropdownRol />
          <NavItem>
            <NavLink href="/jobOffice/">Oficina de empleo</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ms-auto" navbar>
          <InputGroup style={{ width: "40vw" }}>
            <Input placeholder="Busqueda" />
            <InputGroupAddon addonType="append">
              <ButtonGroup>
                <Button color="secondary" href="/lookforJob/">Buscar Trabajo</Button>
                <Button color="secondary" href="/lookforWorker/">Buscar Empleado</Button>
              </ButtonGroup>
            </InputGroupAddon>
          </InputGroup>
          <NavItem>
            <NavLink href="/Login/" onClick={toggleLogin}>{(login.isLogin === "true") ? "Logout" : "Login"}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Register/">{(login.isLogin === "true") ? "Crear Rol" : "Register"}</NavLink>
          </NavItem>
        </Nav>


      </Collapse>
    </Navbar>
  )
}




const DropdownRol= () => {


const [user, setUser] = useCookies(['selectUser']);

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        Roles
    </DropdownToggle>
      <DropdownMenu right>
      {
        Array.isArray(user.selectUser)?user.selectUser.map(
          (element,index)=>
          <DropdownItem href={
            element.type === 0 ?    "/homeEmpresa/":
            element.type === 1 ?    "/homeAspirante/":
                                    "/homeAdmin/"
          }>
          {element.name}
          </DropdownItem>
        ):""
      }
        <DropdownItem divider />
        <DropdownItem href="/Register/">
          Crear Roles
      </DropdownItem>

      </DropdownMenu>
    </UncontrolledDropdown>);
}