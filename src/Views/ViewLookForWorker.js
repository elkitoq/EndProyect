import { Button, ButtonGroup, Card, CardText, Col, Container } from "reactstrap";
import { Busqueda } from "../Components/Busqueda";
import { Status } from "../Tools/Status";
import { useContext } from "react";
import RutaTutorial from "../Components/tutorial";
import { Señalado } from "../Components/Señalador";

export const ViewLookForWorker = ({get}) => {

    const status = useContext(Status.Context)

    return (
        <Container className="abs-center container-home no-scroll">
            <Col xs="12">
                <Busqueda text="Buscar Trabajador" href="/findService" param="job" defaultValue={get?get.job:undefined} id='barraBusquedalookforworker'/>
                <Señalado marca="barraBusquedalookforworker" text="Escribe palabras claves para encontrar los servicios que otros están ofreciendo"/>
                <Col xs={{ size: 10, offset: 1 }} sm={{ size: 10, offset: 1 }} className="separado">
                    {!(status.get('haveEmpresa')) ? <LocalNoLoginCard login={(status.get('Login'))} /> : <SugerirCrearPuesto />}
                </Col>

            </Col>

        </Container>
    );
}

const LocalNoLoginCard = ({ login }) =>
    <Card color="primary" inverse>
        <CardText className="text-center mt-2">Si prefiere crear una búsqueda laboral, debería logearse como empresa</CardText>
        <ButtonGroup className="btn-group-vertical">
            <Button href="/createJob" color="secondary">{!login ? 'Login' : 'Crear Perfil de Empresa'}</Button>
        </ButtonGroup>
    </Card>

const SugerirCrearPuesto = () =>
    <Card color="primary" inverse>
        <CardText className="text-center mt-2">Puede que prefiera crear una búsqueda laboral para recibir postulantes</CardText>
        <Button href="/offerJob/" color="secondary">Crear Búsqueda</Button>
    </Card>

RutaTutorial.get("BuscarPostulantes")
    .setDescription(<>Buscar Postulantes</>)
    .setRender(ViewLookForWorker)
    .setMeta("Buscar Postulantes")
    .setInstrucciones(<>Buscar Postulantes</>);
