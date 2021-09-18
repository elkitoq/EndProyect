import { CardProfileAspirant } from "../Components/CardProfileAspirant";
import { CurriculumProfile } from "../Components/CurriculumProfile";

import {
    Container, Row, Col
} from 'reactstrap'

import '../Assets/Css/AspiranteProfile.css';
import { ContactProfile } from "../Components/ContactProfile";
import { useEffect, useState } from "react";
import API, { QAPI } from "../Tools/API";
import { useLocation } from "react-router";

export const ViewPerfilAspirante = () => {

    const { search } = useLocation();
    const {id} = API.getSearchParam(search);

    const [cv, setCV] = useState({})

    useEffect(() => {
        new QAPI('/cv').send("get", { id,type:1 }).then((res) => {
            if (res && res.data && res.data.response)
                setCV(res.data.response)
        });
        
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    <CardProfileAspirant aboutme={cv.description} profession={cv.puesto} nameUser={`${cv.lastName}, ${cv.name}`}/>
                </Col>

                <Col md={{ size: 6 }}>
                    <CurriculumProfile info={cv}/>
                </Col>

                <Col md={{ size: 3 }}>
                    <ContactProfile number={cv.phone} email={cv.email} />
                </Col>
            </Row>

        </Container>
    )
}