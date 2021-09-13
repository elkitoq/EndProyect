import { CardProfileAspirant } from "../Components/CardProfileAspirant";
import { CurriculumProfile } from "../Components/CurriculumProfile";
import { useLocation } from 'react-router-dom'
import {
    Container, Row, Col
} from 'reactstrap'

import '../Assets/Css/AspiranteProfile.css';
import { ContactProfile } from "../Components/ContactProfile";
import { AptitudesProfile } from "../Components/AptitudesProfile";

export const ViewPerfilAspirante = () => {

    const { pathname } = useLocation();

    return (

        <Container fluid>

            <Row className="sub-navigation">
                <ul className="navigation-profile">
                    <a className="link-aptitud" href="/perfilAspirante/aptitudes">Aptitudes</a>
                    <a className="link-curriculum" href="/perfilAspirante/curriculum">Curriculum</a>
                </ul>
            </Row>

            <Row className="content-profile">
                <Col sm={{ size: 3 }} className="content-about-me">
                    <CardProfileAspirant />
                </Col>

                <Col md={{ size: 6 }}>
                    {(pathname === "/perfilAspirante" || pathname === "/perfilAspirante/curriculum") ? <CurriculumProfile /> : (pathname === "/perfilAspirante/aptitudes") ? <AptitudesProfile /> : <CurriculumProfile />}
                </Col>

                <Col md={{ size: 3 }}>
                    <ContactProfile number="+549026135549" email="elkitoq@gmail.com" />
                </Col>
            </Row>

        </Container>
    )
}