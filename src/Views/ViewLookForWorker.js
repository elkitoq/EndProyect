import { Button, ButtonGroup, Card, CardText, Col, Container } from "reactstrap";
import { Busqueda } from "../Components/Busqueda";


export const ViewLookForWorker = () => {

    // const [login] = useCookies(['isLogin']);
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
        <CardText>Si prefiere crear un puesto de trabajo, deveria logearse como empresa</CardText>
        <ButtonGroup className="btn-group-vertical">
            <Button href="/login" color="secondary">    Login         </Button>
            <Button href="/register" color="secondary">    Registrarse   </Button>
        </ButtonGroup>
    </Card>

const SugerirCrearPuesto = () =>
    <Card color="primary" inverse>
        <CardText>Puede que prefiera crear un puesto de trabajo para recibir postulantes</CardText>
        <Button href="/offerJob/" color="secondary">Crear Puesto</Button>
    </Card>