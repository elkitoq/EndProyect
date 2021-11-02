
import { Container, Row, Col, Button } from 'reactstrap'
import logo from '../Assets/image/logo-sin-fondo-web1.png'
import '../Assets/Css/login.css'
import { FormLogin } from '../Components/FormLogin'
import { SlideShow } from '../Components/SlideShow'

import { LoadRoles } from '../Components/role';
import { useLocation } from 'react-router-dom'
import { ViewCreateUser } from './ViewCreateUser.js';
import { ViewRecoverPassword } from './ViewRecoverPassword.js';
import RutaTutorial, { Ayuda } from '../Components/tutorial'
import { Señalador } from '../Components/Señalador'
import { Status } from "../Tools/Status";
import { useContext } from "react";

import userNameHelp from'../Assets/HelpGif/username.gif'
import loginHelp from'../Assets/HelpGif/login.gif'
import forgetPassHelp from'../Assets/HelpGif/forgetpass.gif'
import passwordHelp from'../Assets/HelpGif/password.gif'
import registerHelp from'../Assets/HelpGif/register.gif'


export const ViewLogin = () => {

    const status = useContext(Status.Context)
    const [login,] = status.use('Login');

    const { pathname } = useLocation();

    return (
        <Container className="themed-container" fluid="md" >
            <Row className="row-login" style={{ marginTop: pathname === "/Register/" || pathname === "/register" ? "1rem" : "-1rem" }}>
                <Col className="column" sm="5" >
                    <div className="container-logo">
                        <img className="logo-login" alt="logo" src={logo} />
                    </div>
                    {(pathname === "/Register/") ? <ViewCreateUser /> :
                        (pathname.substring(0, 14) === "/recovery-pass") ? <ViewRecoverPassword /> :
                            (login) ? <CorrectLogin /> :
                                <FormLogin />}

                </Col>
                <Col className="col-slideshow" sm="7">
                    <SlideShow className="carousel" />
                </Col>
            </Row>
            <Ayuda ruta = {RutaTutorial.get("Login")}/>
        </Container>
    )
}

const CorrectLogin = () => {

    return (<div className="abs-center column-welcome">
        <Col xs="6">
            <Row>
                <h1>Bienvenido</h1>
            </Row>
            <Row>
                <Button className="separado3" href="/" color="primary" >Inicio</Button>
                <Button className="separado3" href="/CVCreate" color="primary" >Crear CV</Button>
                <Button className="separado3" href="/offerJob/" color="primary" >Ofrecer Empleo</Button>
            </Row>
        </Col>
        <LoadRoles />
    </div>);
}

RutaTutorial.get("Login")
    .setDescription(<>Ingresa con tu cuenta para guardar tus datos</>)
    .setRender(ViewLogin)
    .setMeta("Iniciar Sesión")
    .setInstrucciones(<>Has clic en <Señalador marca="Login" texto="Login" />, está en la esquina superior derecha de la pagina</>)
    .addPaso(<>Si no tienes cuenta, has click en <a className="a-register" href="/Register/">Registrate acá</a>
                <br/><img className="logo-login" alt="Nombre de usuario" src={registerHelp}/></>,'Ya tengo')
    .addPaso(<>Si ya tienes cuenta, Escribe tu nombre de usuario
                <br/><img className="logo-login" alt="Nombre de usuario" src={userNameHelp}/></>)
    .addPaso(<>Si no recuerdas tu contraseña has click en <a className='a-recovery-pass' href="/recovery-pass/">Olvidaste tu contraseña?</a>
                <br/><img className="logo-login" alt="Nombre de usuario" src={forgetPassHelp}/></>,'La recuerdo')
    .addPaso(<>Si la recuerdas, Escribe tu contraseña
                <br/><img className="logo-login" alt="Nombre de usuario" src={passwordHelp}/></>)
    .addPaso(<>Pulsa en Login
                <br/><img className="logo-login" alt="Nombre de usuario" src={loginHelp}/></>)
    ;