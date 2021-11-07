
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


import cambiarPass from '../Assets/HelpGif/cambiarPass.GIF'
import mailrecuperacion from '../Assets/HelpGif/mailrecuperacion.GIF'
import recuperarPass from '../Assets/HelpGif/recuperarPass.GIF'


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
            {(pathname.substring(0, 14) === "/recovery-pass") ?
            <Ayuda ruta = {RutaTutorial.get("recovery")}/>:
            <Ayuda ruta = {RutaTutorial.get("Login")}/>}
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
    .addPaso(<>Si no tienes cuenta, has click en <a className="a-register" href="/Register/">Regístrate acá</a>
                <br/><img className="gif-ayuda" alt="Tu navegador no te permite ver la imagen" src={registerHelp}/></>,'Ya tengo')
    .addPaso(<>Si ya tienes cuenta, Escribe tu nombre de usuario
                <br/><img className="gif-ayuda" alt="Tu navegador no te permite ver la imagen" src={userNameHelp}/></>)
    .addPaso(<>Si no recuerdas tu contraseña has click en <a className='a-recovery-pass' href="/recovery-pass/">Olvidaste tu contraseña?</a>
                <br/><img className="gif-ayuda" alt="Tu navegador no te permite ver la imagen" src={forgetPassHelp}/></>,'La recuerdo')
    .addPaso(<>Si la recuerdas, Escribe tu contraseña
                <br/><img className="gif-ayuda" alt="Tu navegador no te permite ver la imagen" src={passwordHelp}/></>)
    .addPaso(<>Pulsa en Login
                <br/><img className="gif-ayuda" alt="Tu navegador no te permite ver la imagen" src={loginHelp}/></>);

RutaTutorial.get("recovery")
    .setDescription(<>Si la olvidaste, puedes recuperar tu contraseña</>)
    .setMeta("Recupera tu contraseña")
    .setInstrucciones(<>Si lo solicitas, desde la pantalla de iniciar sesión, Te enviaremos un mail para recuperar tu contraseña</>)
    .addPaso(<> Para cambiar tu contraseña, necesitamos enviarte un mail. Escribe tu nombre de usuario o tu email y presione 'Solicitar cambio de Contraseña'
                <br/><img className="gif-ayuda" alt="Tu navegador no te permite ver la imagen" src={recuperarPass}/></>)
    .addPaso(<> En la bandeja de entrada de su correo recibirá un mail, haga click en 'Restablecer Contraseña'
                <br/><img className="gif-ayuda" alt="Tu navegador no te permite ver la imagen" src={mailrecuperacion}/></>)
    .addPaso(<> Escriba y repita su nueva contraseña
                <br/><img className="gif-ayuda" alt="Tu navegador no te permite ver la imagen" src={cambiarPass}/></>)