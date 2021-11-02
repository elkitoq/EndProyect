
import { Button, ButtonGroup, Card, CardText, Col, Container} from "reactstrap";
import { Busqueda } from "../Components/Busqueda";

import RutaTutorial from "../Components/tutorial";
import { Status } from "../Tools/Status";
import { useContext } from "react";
import { Señalador } from "../Components/Señalador";

const tutorial=RutaTutorial.get("look")

export const ViewLookForJob = () => {

    const status = useContext(Status.Context)
    return (
        <Container className="abs-center">
            <Col xs="12">
                <Busqueda text="Buscar Empleo" href="/findJob"/>
                <Col xs={{ size: 8, offset: 3 }} sm={{ size: 10, offset: 1 }} className="separado">
                    {!(status.get('Login')) ? <LocalNoLoginCard /> : ""}
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
                <Button href="/SendCV" color="secondary">    Login         </Button>
                {/* <Button href="/register" color="secondary">    Registrarse   </Button> */}
            </ButtonGroup>
        </Col>
    </Card>

RutaTutorial.get("LookForJobSendCV")
    .setDescription(<>Accede a nuestra lista de busquedas laborales</>)
    .setRender(ViewLookForJob)
    .addRequisito("CreateCV")
    .setMeta("Buscar Trabajo")
    .setInstrucciones(<>Escribe algunas palabras claves relacionadas con lo que estas buscando en la <Señalador marca="BarraBusqueda" texto="barra superior"/>, y has clic en Buscar Trabajo<Señalador marca="BotonBuscarTrabajo" texto="barra superior"/></>);


RutaTutorial.get("LookForJob")
    .setDescription(<>Accede a nuestra lista de busquedas laborales</>)
    .setRender(ViewLookForJob)
    .setMeta("Buscar Trabajo")
    .setInstrucciones(<>Escribe algunas palabras claves relacionadas con lo que estas buscando en la <Señalador marca="BarraBusqueda" texto="barra superior"/>, y has clic en Buscar Trabajo<Señalador marca="BotonBuscarTrabajo" texto="barra superior"/></>);

