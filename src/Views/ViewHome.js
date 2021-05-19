import { useHistory } from "react-router";
import { Card, CardText, Container, Row } from "reactstrap";

import '../style/home.css';


export const ViewHome = () => {

    const history = useHistory();

    const routeChange = (path) => {
        history.push(path);
    }

    return (
        <Container className="abs-center">
            <div className="text-center">
                <h1>Bienvenido</h1>
                <h2>¿Que estas buscando hoy?</h2>
                <Row className="">

                    <Card onClick={routeChange.bind(this, "/lookforJob/")}
                        body inverse color="primary" className="text-wrap tarjetasQBuscas alinearVertical">
                        <CardText
                            tag="h5"
                            style={{ "fontSize": '3vh' }}>
                            Necesito Trabajo
                        </CardText>
                    </Card>
                    <Card onClick={routeChange.bind(this, "/offerService/")}
                        body inverse color="primary" className="text-wrap tarjetasQBuscas alinearVertical">
                        <CardText
                            tag="h5"
                            style={{ "fontSize": '3vh' }}>
                            Quiero Dinero
                        </CardText>
                    </Card>
                    <Card onClick={routeChange.bind(this, "/lookforWorker/")}
                        body inverse color="primary" className="text-wrap tarjetasQBuscas alinearVertical">
                        <CardText
                            tag="h5"
                            style={{ "fontSize": '2vh' }} >
                            Busco trabajadores para mi viña/pequeño emprendimiento lucrativo
                            </CardText>
                    </Card>
                </Row>
            </div>
        </Container>
    );
}