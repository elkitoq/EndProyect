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

    const [viewAptitudes, setViewAptitudes] = useState(2)

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
                    <a href="javascript:void(0)" className="link-aptitud" onClick={(e) => setViewAptitudes(1)}>Aptitudes</a>
                    <a href="javascript:void(0)" className="link-curriculum" onClick={(e) => setViewAptitudes(2)}>Curriculum</a>
                    <a href="javascript:void(0)" className="link-postulaciones" onClick={(e) => setViewAptitudes(3)}>Postulaciones</a>
                </ul>
            </Row>

            <Row className="content-profile">
                <Col sm={{ size: 3 }} className="content-about-me">
                    <CardProfileAspirant imgUser={cv.photo} aboutme={cv.description} profession={cv.puesto} nameUser={`${cv.lastName}, ${cv.name}`} />
                </Col>

                <Col md={{ size: 6 }} >
                    {viewAptitudes === 1 ? <AptitudesProfile info={cv.skill} /> : viewAptitudes === 2 ? <CurriculumProfile info={cv} /> : <PostulacionesProfile info={postulaciones} />}
                </Col>

                <Col md={{ size: 3 }}>
                    <ContactProfile number={cv.phone} email={cv.email} />
                </Col>
            </Row>

        </Container>
    )
}