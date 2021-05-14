import { useHistory } from "react-router";
import { Button, ButtonGroup, Card, CardText, Col, Container, Input, InputGroup, InputGroupAddon } from "reactstrap";


export const ViewLookForWorker = () => {

    const history = useHistory();

    const routeChange = (path) => {
        history.push(path);
    }


    return (
        <Container className="abs-center">
            <Col xs="12">
                <InputGroup>
                <Input autoFocus  placeholder="Busqueda" />
                <InputGroupAddon addonType="append">
                  <Button color="secondary" href="/findService/">Buscar Trabajador</Button>
                </InputGroupAddon>
            </InputGroup>
            <Col xs={{size:4,offset:4}} className="separado">
                <Card color="primary" inverse>
                    <CardText>Si prefiere crear un puesto de trabajo, deveria logearse como empresa</CardText>
                    <ButtonGroup>                    
                        <Button onClick={routeChange.bind(this, "/login/")} color="secondary">Login</Button>
                        <Button onClick={routeChange.bind(this, "/register/")} color="secondary"    >Registrarse</Button>
                        </ButtonGroup>

                </Card>
            </Col>
            
            </Col>
            
        </Container>
        );
    }