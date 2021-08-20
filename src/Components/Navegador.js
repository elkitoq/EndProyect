import { useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  Navbar,
  NavbarBrand,
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import { QAPI } from '../Tools/API';
import { Busqueda } from './Busqueda';
import { DropdownRol } from './role';
import logo from '../Assets/image/logo_nabvar.png'
import '../Assets/Css/navBar.css'
import { Señalado } from './Señalador';
// import { Cookie } from './Cookie';





export const NavegadorPrincipal = () => {

  const [login, setCookie, removeCookie] = useCookies(['isLogin']);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    if (login.isLogin === "true")
      removeCookie('selectUser', { path: '/' })
    setCookie("isLogin", false, { path: '/' });
    new QAPI('/logout').send("post", { hola: "mundo" });
  }

  return (
    <Navbar color="primary" dark expand="md">
      <NavbarBrand href="/">
        <img className="logo_navbar" width="70px" height="45px" alt="logo" src={logo} id="logo"/>
        <Señalado marca="logo" title="Logo" text="Si haces click te lleva a la pagina principal"/>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavButton className="btn-cv-navbar" href="/CVCreate/"><span id="CrearCV"> Crear CV </span></NavButton>
          <Señalado marca="CrearCV" title="Crear CV" text="Si haces click te lleva a la pagina para crear tu Curriculum"/>
          <DropdownRol />
          <NavButton className="btn-oficina-navbar" href="/jobOffice/">Oficina de empleo</NavButton>
        </Nav>
        <Nav className="ms-auto buscador" navbar>
          <Busqueda className="ocultar-search input-search"
            style={{ width: "40vw" }}
            href="/lookforJob/"
            text="Buscar Trabajo"
            othersButtons={[{ href: "/lookforWorker/", text: "Buscar Empleado" }]} />
          <NavButton href="/lookforJob/"
            className="mostrar-search"
            children="Buscar Trabajo" />
          <NavButton href="/lookforWorker/"
            className="mostrar-search"
            children="Buscar Empleado" />
        </Nav>
        <Nav className="ms-auto" navbar>
          <NavButton href="/Login/"
            onClick={(login.isLogin === "true") ? logout : () => { }}
            children={(login.isLogin === "true") ? "Logout" : "Login"}
            className="a-login" />
          <NavButton href="/Register/"
            className="a-register"
            children={(login.isLogin === "true") ? "Crear Rol" : "Register"} />
        </Nav>
      </Collapse>
    </Navbar>
  )
}

const NavButton = ({ href, children, onClick, className }) => {
  return (
    <NavItem className={className}>
      <NavLink href={href} onClick={onClick}>{children}</NavLink>
    </NavItem>
  );
}

