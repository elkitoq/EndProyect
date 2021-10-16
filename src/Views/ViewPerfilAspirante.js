import { CardProfileAspirant } from "../Components/CardProfileAspirant";
import { CurriculumProfile } from "../Components/CurriculumProfile";
import { useLocation } from 'react-router-dom'
import {
    Container, Row, Col
} from 'reactstrap'

import '../Assets/Css/AspiranteProfile.css';
import { ContactProfile } from "../Components/ContactProfile";
import { AptitudesProfile } from "../Components/AptitudesProfile";

import { useEffect, useState } from "react";
import API, { QAPI } from "../Tools/API";

export const ViewPerfilAspirante = () => {

    const { search, pathname } = useLocation();
    const { id } = API.getSearchParam(search);

    const [cv, setCV] = useState({})
    const [skill, setSkill] = useState({})

    useEffect(() => {
        new QAPI('/cv').send("get", { id, type: 1 }).then((res) => {
            if (res && res.data && res.data.response) {
                setCV(res.data.response)
                setSkill(res.data.response.skill)
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



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
                    <CardProfileAspirant aboutme={cv.description} profession={cv.puesto} nameUser={`${cv.lastName}, ${cv.name}`} />
                </Col>

                <Col md={{ size: 6 }}>
                    {(pathname === "/perfilAspirante" || pathname === "/perfilAspirante/curriculum") ? <CurriculumProfile info={cv} /> : (pathname === "/perfilAspirante/aptitudes") ? <AptitudesProfile info={skill} /> : <CurriculumProfile info={cv} />}
                </Col>

                <Col md={{ size: 3 }}>
                    <ContactProfile number={cv.phone} email={cv.email} />
                </Col>
            </Row>

        </Container>
    )
}