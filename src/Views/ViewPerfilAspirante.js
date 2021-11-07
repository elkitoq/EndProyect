import { CardProfileAspirant } from "../Components/CardProfileAspirant";
import { CurriculumProfile } from "../Components/CurriculumProfile";
import { useLocation } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import 'animate.css'
import '../Assets/Css/AspiranteProfile.css';
import { ContactProfile } from "../Components/ContactProfile";
import { AptitudesProfile } from "../Components/AptitudesProfile";
// import { Status } from "../Tools/Status";
import { useEffect, useState, useContext } from "react";
import API, { QAPI } from "../Tools/API";
import { PostulacionesProfile } from "../Components/PostulacionesProfile";

export const ViewPerfilAspirante = () => {

    const { search } = useLocation();
    const { id } = API.getSearchParam(search);

    const [cv, setCV] = useState({})
    const [postulaciones, setPostulaciones] = useState({})

    const [viewAptitudes, setViewAptitudes] = useState(true)

    // const status = useContext(Status.Context)
    // const [selectUser,] = status.use('selectUser');
    // const [selectRole,] = status.use('selectRole');
    // const user = selectUser[selectRole];


    useEffect(() => {
        new QAPI('/cv').send("get", { id, type: 1 }).then((res) => {
            if (res && res.data && res.data.response) {
                setCV(res.data.response)

            }
        });

        new QAPI('/postulates').send("get", { role: 1 }).then((res) => {
            if (res && res.data && res.data.response) {
                setPostulaciones(res.data.response)
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (

        <Container fluid>

            <Row className="sub-navigation">
                <ul className="navigation-profile">
                    <a href="javascript:void(0)" className="link-aptitud" onClick={(e) => setViewAptitudes(false)}>Aptitudes</a>
                    <a href="javascript:void(0)" className="link-curriculum" onClick={(e) => setViewAptitudes(true)}>Curriculum</a>
                </ul>
            </Row>

            <Row className="content-profile">
                <Col sm={{ size: 3 }} className="content-about-me">
                    <CardProfileAspirant imgUser={cv.photo} aboutme={cv.description} profession={cv.puesto} nameUser={`${cv.lastName}, ${cv.name}`} />
                </Col>

                <Col md={{ size: 6 }} >
                    {viewAptitudes ? <CurriculumProfile info={cv} /> : <AptitudesProfile info={cv.skill} />}
                </Col>

                <Col md={{ size: 3 }}>
                    <ContactProfile number={cv.phone} email={cv.email} />
                </Col>
            </Row>

        </Container>
    )
}