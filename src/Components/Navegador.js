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
import API from '../Tools/API';
import { Busqueda } from './Busqueda';
import { DropdownRol } from './role';
// import { Cookie } from './Cookie';





export const NavegadorPrincipal = () => {

  const [login, setCookie, removeCookie] = useCookies(['isLogin']);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    if (login.isLogin === "true")
      removeCookie('selectUser', { path: '/' })
    setCookie("isLogin", false, { path: '/' });
    new API('/logout').send("post",{hola:"mundo"});
  }

  return (
    <Navbar color="primary" dark expand="md">
      <NavbarBrand href="/">Maipú Jobs</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavButton href="/CVCreate/"> Crear CV </NavButton>
          <DropdownRol />
          <NavButton href="/jobOffice/">Oficina de empleo</NavButton>
        </Nav>
        <Nav className="ms-auto" navbar>
          <Busqueda className="ocultar-search"
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
          <NavButton href="/Login/"
            onClick={(login.isLogin === "true") ? logout : () => { }}
            children={(login.isLogin === "true") ? "Logout" : "Login"} />
          <NavButton href="/Register/"
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

