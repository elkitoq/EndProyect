import { CardProfileAspirant } from "../Components/CardProfileAspirant";
import { CurriculumProfile } from "../Components/CurriculumProfile";

import {
    Container, Row, Col
} from 'reactstrap'

import '../Assets/Css/AspiranteProfile.css';

export const ViewPerfilAspirante = () => {
    return (

        <Container fluid>

            <Row className="sub-navigation">
                <ul className="navigation-profile">
                    <a href="#">Actividad</a>
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
                    <h2>hola</h2>
                </Col>

            </Row>

        </Container>
    )
}