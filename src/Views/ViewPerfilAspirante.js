import { CardProfileAspirant } from "../Components/CardProfileAspirant";
import { CurriculumProfile } from "../Components/CurriculumProfile";
import { useLocation } from 'react-router-dom'
import {
    Container, Row, Col, Button
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

    const [viewAptitudes,setViewAptitudes]=useState(false)

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
                    <a  href="javascript:void(0)"  className="link-aptitud" onClick={()=>setViewAptitudes(true)}>Aptitudes</a>
                    <a  href="javascript:void(0)"  className="link-curriculum"  onClick={()=>setViewAptitudes(false)}>Curriculum</a>
                </ul>
            </Row>

            <Row className="content-profile">
                <Col sm={{ size: 3 }} className="content-about-me">
                    <CardProfileAspirant imgUser={cv.photo} aboutme={cv.description} profession={cv.puesto} nameUser={`${cv.lastName}, ${cv.name}`}/>
                </Col>

                <Col md={{ size: 6 }}>
                    {viewAptitudes ?<AptitudesProfile info={cv.skill} />: <CurriculumProfile info={cv}/>}
                </Col>

                <Col md={{ size: 3 }}>
                    <ContactProfile number={cv.phone} email={cv.email} />
                </Col>
            </Row>

        </Container>
    )
}