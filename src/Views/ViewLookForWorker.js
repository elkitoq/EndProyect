import { Button, ButtonGroup, Card, CardText, Col, Container } from "reactstrap";
import { Busqueda } from "../Components/Busqueda";
import { Status } from "../Tools/Status";
import { useContext } from "react";
import RutaTutorial from "../Components/tutorial";

export const ViewLookForWorker = () => {

    const status = useContext(Status.Context)

    return (
        <Container className="abs-center container-home no-scroll">
            <Col xs="12">
                <Busqueda text="Buscar Trabajador" href="/findService" param="job" />
                <Col xs={{ size: 10, offset: 1 }} sm={{ size: 10, offset: 1 }} className="separado">
                    {!(status.get('HaveEmpresa')) ? <LocalNoLoginCard login={(status.get('Login'))}/> : <SugerirCrearPuesto />}
                </Col>

            </Col>

        </Container>
    );
}

const LocalNoLoginCard = ({login}) =>
    <Card color="primary" inverse>
        <CardText>Si prefiere crear una busqueda laboral, debería logearse como empresa</CardText>
        <ButtonGroup className="btn-group-vertical">
            <Button href="/createJob" color="secondary">{!login?'Login':'Crear Perfil de Empresa'}</Button>
        </ButtonGroup>
    </Card>

const SugerirCrearPuesto = () =>
    <Card color="primary" inverse>
        <CardText>Puede que prefiera crear una busqueda laboral para recibir postulantes</CardText>
        <Button href="/offerJob/" color="secondary">Crear Busqueda</Button>
    </Card>

RutaTutorial.get("BuscarPostulantes")
    .setDescription(<>Buscar Postulantes</>)
    .setRender(ViewLookForWorker)
    .setMeta("Buscar Postulantes")
    .setInstrucciones(<>Buscar Postulantes</>);
