
import { Button, ButtonGroup, Card, CardText, Col, Container} from "reactstrap";
import { Busqueda } from "../Components/Busqueda";

import RutaTutorial from "../Components/tutorial";
import { Status } from "../Tools/Status";
import { useContext } from "react";

const tutorial=RutaTutorial.get("look")

export const ViewLookForJob = () => {

    const status = useContext(Status.Context)
    const [login,] = status.use('Login');

    return (
        <Container className="abs-center">
            <Col xs="12">
                <Busqueda text="Buscar Puesto" href="/findJob" param="post" />
                <Col xs={{ size: 6, offset: 3 }} sm={{ size: 4, offset: 4 }} className="separado">
                    {!(login.isLogin === "true") ? <LocalNoLoginCard /> : ""}
                </Col>
            </Col>
        </Container>
    );
}

const LocalNoLoginCard = () =>
    <Card color="primary" inverse>
        <CardText>Si te logeas, podes crear tu CV y enviarlo a las empresas que elijas</CardText>
        <Col lg={{size:6,offset:3}}>
            <ButtonGroup>
                <Button href="/login" color="secondary">    Login         </Button>
                <Button href="/register" color="secondary">    Registrarse   </Button>
            </ButtonGroup>
        </Col>
    </Card>