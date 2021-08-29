import { CardProfileAspirant } from "../Components/CardProfileAspirant";
import { CurriculumProfile } from "../Components/CurriculumProfile";

import {
    Container, Row, Col
} from 'reactstrap'

import '../Assets/Css/AspiranteProfile.css';
import { ContactProfile } from "../Components/ContactProfile";

export const ViewPerfilAspirante = () => {
    return (

        <Container fluid>

            <Row className="sub-navigation">
                <ul className="navigation-profile">
                    <a href="#">Aptitudes</a>
                    <a href="#">Curriculum</a>
                </ul>
            </Row>

            <Row>
                <Col sm={{ size: 3 }} className="content-about-me">
                    <CardProfileAspirant />
                </Col>

                <Col md={{ size: 6 }}>
                    <CurriculumProfile />
                </Col>

                <Col md={{ size: 3 }}>
                    <ContactProfile number="+549026135549" email="elkitoq@gmail.com" />
                </Col>
            </Row>

        </Container>
    )
}