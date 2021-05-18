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
  DropdownItem
} from 'reactstrap'
import { Busqueda } from './Busqueda';
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
          <NavButton href="/CVCreate/"> Crear CV </NavButton>
          <DropdownRol />
          <NavButton href="/jobOffice/">Oficina de empleo</NavButton>
        </Nav>
        <Nav className="ms-auto" navbar>
         <Busqueda className="ocultar-search"
            style={{ width: "40vw" }} 
            href="/lookforJob/" 
            text="Buscar Trabajo"
            othersButtons={[{href:"/lookforWorker/",text:"Buscar Empleado"}]}/>
          <NavButton href="/lookforJob/" children="Buscar Trabajo" className="mostrar-search"/>
          <NavButton href="/lookforWorker/" children="Buscar Empleado" className="mostrar-search"/>
          <NavButton href="/Login/" onClick={toggleLogin} children= {(login.isLogin === "true") ? "Logout" : "Login"}/>
          <NavButton href="/Register/" children={(login.isLogin === "true") ? "Crear Rol" : "Register"} />
        </Nav>
      </Collapse>
    </Navbar>
  )
}

const NavButton= ({href,children,onClick,className}) =>{
  return (
    <NavItem className={className}>
      <NavLink href={href} onClick={onClick}>{children}</NavLink>
      </NavItem>
  );
}




const DropdownRol= () => {


const [user] = useCookies(['selectUser']);

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