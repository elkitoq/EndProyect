import { useCookies } from "react-cookie";
import { useHistory, useLocation } from "react-router";
import { Button, Card, CardText, Col, Container, Row } from "reactstrap";
import { OptionMenu } from "../Components/OptionMenu";




export const ViewHomeAutonomo = () => {

    const history = useHistory();
    const routeChange = (path) => {
        history.push(path);
    }

    
    const { search } = useLocation();
    const userNumber = new URLSearchParams(search).get("user")
    const [{selectUser}] = useCookies(['selectUser']);
    const user = selectUser[userNumber];

    return (
        <Container className="abs-center">
            <div className="text-center">
                <h1>Bienvenido {user.name}</h1>
                <h2>¿Que estas buscando hoy?</h2>
                <Row className="">
                    <OptionMenu href="/CVCreate/"       >Crear Curriculum</OptionMenu>
                    <OptionMenu href="/offerService/"   >Ofrecer Servicio</OptionMenu>
                    {/* <OptionMenu href="/message/"        >Ver mensajes</OptionMenu> */}
                </Row>
            </div>
        </Container>

    );
}