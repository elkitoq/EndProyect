import { useState } from 'react';
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

import { useContext } from "react";
import { Status } from "../Tools/Status";



export const NavegadorPrincipal = () => {

  const status = useContext(Status.Context)

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const profile=status.get("selectUser")[status.get("selectRole")]

  const logout = () => {
    // if (login.isLogin === "true")
    //    removeCookie('selectUser', { path: '/' })
    status.clear()
    // if (status.get("Login"))
    //   status.set("selectUser", undefined)
    // status.set("Login", false)

    // setCookie("isLogin", false, { path: '/' });
    new QAPI('/logout').send("post", { hola: "mundo" });
  }

  return (
    <Navbar color="primary" dark expand="md">
      <NavbarBrand href="/">
        <img className="logo_navbar" width="70px" height="45px" alt="logo" src={logo} id="logo" />
        <Señalado marca="logo" title="Logo" text="Si haces click te lleva a la pagina principal" />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <div style={profile && !profile.new && profile.profileType===0?{display:"none"}:{}}>
          <NavButton className="btn-cv-navbar" href={profile && !profile.new && profile.profileType===2?"/CVCreate2/":"/CVCreate/"} ><span id="CrearCV"> Crear CV </span></NavButton>
          <Señalado marca="CrearCV" title="Crear CV" text="Si haces click te lleva a la pagina para crear tu Curriculum" />
          </div>
          <div style={profile && !profile.new && profile.profileType!==0?{display:"none"}:{}}>
          <NavButton className="btn-cv-navbar" href="/OfferJob/" ><span id="OfferJob"> Ofrecer Empleo </span></NavButton>
          <Señalado marca="OfferJob" title="Ofrecer Empleo" text="Si haces click te lleva a la pagina para crear busquedas laborales" />
          </div>
          {(status.get("Login")) ?<DropdownRol />:""}
          {/* <NavButton className="btn-oficina-navbar" href="/jobOffice/">Oficina de empleo</NavButton> */}
          <NavButton className="btn-cv-navbar" onClick={()=>status.set('helperPopup')} href={status.get('helperPopup')?'/mapSite':'#'}>{status.get('helperPopup')?'Mas ':''}Ayuda</NavButton>
        </Nav>
        <Nav className="ms-auto buscador" navbar>
          <Busqueda className="ocultar-search input-search"
            href="/findJob/"
            text="Buscar Trabajo"
            othersButtons={[{ href: "/lookforWorker/", text: "Buscar Empleado" }]} />
          <NavButton href="/lookforJob/"
            className="mostrar-search"
            children="Buscar Trabajo" />
          <NavButton href="/lookforWorker/"
            className="mostrar-search"
            children="Buscar Empleado" />
        </Nav>
        <Nav className="ms-auto ul-login" navbar>
          <NavButton href="/Login/"
            onClick={(status.get("Login")) ? logout : () => { }}
            // onClick={(login.isLogin === "true") ? logout : () => { }}
            // children={(login.isLogin === "true") ? "Logout" : "Login"}
            className="a-login" >
            <span id="Login">
              {(status.get("Login")) ? "Logout" : "Login"}
            </span>
          </NavButton>
          <Señalado marca="Login" title="Login" text={(status.get("Login")) ? "Cierra sesión" : "Te permite iniciar sesión"} />
          <NavButton href="/Register/"
            className="a-register"
          // children={(status.get("Login")) ? "Crear Rol" : "Register"} 
          // children={(login.isLogin === "true") ? "Crear Rol" : "Register"}
          >
            <span id="CrearPerfil">{(status.get("Login")) ? "Crear Perfil" : "Register"}</span>
          </NavButton>
          <Señalado marca="CrearPerfil" title="Crear Perfil" text={(status.get("Login")) ? "Crea un nuevo perfil con el Rol que prefieras (Aspirante, Empresa, Autónomo)" : "Crear una cuenta de usuario"} />
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

