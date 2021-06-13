
import { Container, Row, Col } from 'reactstrap'
import logo from '../Assets/image/logo-sin-fondo-web.png'
import '../Assets/Css/login.css'
import { FormLogin } from '../Components/FormLogin'
import { SlideShow } from '../Components/SlideShow'
import { useCookies } from 'react-cookie'
import { LoadRoles } from '../Components/role';
import { FormRegister } from "../Components/FormRegister";
import { useLocation } from 'react-router-dom'
import { ViewCreateUser } from './ViewCreateUser.js';

export const ViewLogin = () => {

    const [login] = useCookies(['isLogin']);
    const {pathname}=useLocation();
    
    return (
        <Container className="themed-container" fluid="md">
            <Row className="row-login">
                <Col className="column" sm="5" >
                    <div className="container-logo">
                        <img className="logo-login" alt="logo" src={logo} />
                    </div>
                    {(pathname==="/Register/")? <ViewCreateUser />:
                    (login.isLogin === "true") ? 
                    <CorrectLogin /> : <FormLogin/>}
                    
                </Col>
                <Col className="col-slideshow" sm="7">
                    <SlideShow className="carousel" />
                </Col>
            </Row>
        </Container>
    )
}

const CorrectLogin = () => {
    
    return (<h1><LoadRoles/>LOGIN CORRECTO</h1>);
}