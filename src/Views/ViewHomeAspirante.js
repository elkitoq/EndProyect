import { useLocation } from "react-router";
import { Container, Row, Col } from "reactstrap";
import { OptionMenu } from "../Components/OptionMenu";
import { Status } from "../Tools/Status";
import { useContext } from "react";
import '../Assets/Css/homeAspirante.css'
import { LoadRoles } from "../Components/role";


export const ViewHomeAspirante = () => {

    const { search } = useLocation();
    const userNumber = new URLSearchParams(search).get("user")

    const status = useContext(Status.Context)
    const [selectUser,] = status.use('selectUser');
    const [selectRole,setProfile] = status.use('selectRole');
    const user = selectUser[userNumber || selectRole];
    if (user && userNumber!==undefined && userNumber !== selectRole)
        setProfile(userNumber)
    return (
        <Container className="abs-center">
            <LoadRoles/>
            <Col className="content-home">
                <div className="content-home-inner">
                    <div className="title">
                        <h1>Bienvenido {user?user.profileName:""}</h1>
                        <h2>¿Que estas buscando hoy?</h2>
                    </div>
                    <Row className="option-menu">
                        <OptionMenu href="/CVCreate">Crear Curriculum</OptionMenu>
                        <OptionMenu href="/postulates">Puestos solicitados</OptionMenu>
                        <OptionMenu href={`/perfilAspirante?id=${user?user._id:""}`}   >Mi perfil</OptionMenu>
                        {/* <OptionMenu href="/message/"        >Ver mensajes</OptionMenu> */}
                    </Row>
                </div>
            </Col>
        </Container>

    );
}
