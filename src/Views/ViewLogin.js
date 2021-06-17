
import { Container, Row, Col, Button} from 'reactstrap'
import logo from '../Assets/image/logo-sin-fondo-web.png'
import '../Assets/Css/login.css'
import { FormLogin } from '../Components/FormLogin'
import { SlideShow } from '../Components/SlideShow'
import { useCookies } from 'react-cookie'
import { LoadRoles } from '../Components/role';
import { useLocation } from 'react-router-dom'
import { ViewCreateUser } from './ViewCreateUser.js';
import { ViewRecoverPassword } from './ViewRecoverPassword.js';

export const ViewLogin = () => {

    const [login] = useCookies(['isLogin']);
    const { pathname } = useLocation();
    return (
        <Container className="themed-container" fluid="md">
            <Row className="row-login">
                <Col className="column" sm="5" >
                    <div className="container-logo">
                        <img className="logo-login" alt="logo" src={logo} />
                    </div>
                    {(pathname === "/Register/") ? <ViewCreateUser /> :
                        (pathname.substring(0, 14) === "/recovery-pass") ? <ViewRecoverPassword /> :
                            (login.isLogin === "true") ? <CorrectLogin /> :
                                <FormLogin />}

                </Col>
                <Col className="col-slideshow" sm="7">
                    <SlideShow className="carousel" />
                </Col>
            </Row>
        </Container>
    )
}

const CorrectLogin = () => {

    return (<div className="abs-center">
        <LoadRoles />
        <Col xs="6">
            <Row >
                <h1 className="abs-center">Bienvenido</h1>
            </Row>
            <Row>
                <Button className="separado3" href="/" fontSize="2vh"  color="primary" >Inicio</Button>
                <Button className="separado3" href="/CVCreate" fontSize="2vh"  color="primary" >Crear CV</Button>
            </Row>
        </Col>
    </div>);
}