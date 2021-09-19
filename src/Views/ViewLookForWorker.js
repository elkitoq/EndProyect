import { Button, ButtonGroup, Card, CardText, Col, Container } from "reactstrap";
import { Busqueda } from "../Components/Busqueda";
import { Status } from "../Tools/Status";
import { useContext } from "react";

export const ViewLookForWorker = () => {

    const login = false;

    return (
        <Container className="abs-center">
            <Col xs="12">
                <Busqueda text="Buscar Trabajador" href="/findService" param="job" />
                <Col xs={{ size: 6, offset: 3 }} sm={{ size: 4, offset: 4 }} className="separado">
                    {!(login.isLogin === "true") ? <LocalNoLoginCard /> : <SugerirCrearPuesto />}
                </Col>

            </Col>

        </Container>
    );
}

const LocalNoLoginCard = () =>
    <Card color="primary" inverse>
        <CardText>Si prefiere crear una busqueda laboral, debería logearse como empresa</CardText>
        <ButtonGroup className="btn-group-vertical">
            <Button href="/login" color="secondary">    Login         </Button>
            <Button href="/register" color="secondary">    Registrarse   </Button>
        </ButtonGroup>
    </Card>

const SugerirCrearPuesto = () =>
    <Card color="primary" inverse>
        <CardText>Puede que prefiera crear una busqueda laboral para recibir postulantes</CardText>
        <Button href="/offerJob/" color="secondary">Crear Busqueda</Button>
    </Card>