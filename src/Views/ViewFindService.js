import { useState } from "react";
import { useLocation } from "react-router";
import { Container, Row, CardText, CardImg} from "reactstrap";
import { Display } from "../Components/Display";

import API from '../Tools/API';



export const ViewFindService = (props) => {
    const { search } = useLocation();
    const getJson = API.getSearchParam(search);
    // const [tarjeta, setTarjetas] = useState([]);

    //Correccion para el API random
    getJson.seed = getJson.job;
    //delete getJson.job;
    //reducimos los atributos del API random
    getJson.inc = "gender,name,cell,email,picture";

    const api = new API('https://randomuser.me/api/', useState([]), "results",useState({}),"info");

    return (
        <Container className="abs-center" fluid={true}>
            <Row >
                <h1>Acá mostraría los trabajadores disponibles que sean "{getJson.job}" </h1>
                <Display api={api} get={getJson}>
                    <CardImg func={(elemento) => elemento.picture.large} />
                    <CardText func={(elemento) => ` ${elemento.name.last}, ${elemento.name.first}`}>Nombre: <b>{ }</b></CardText>
                    <CardText func={(elemento) => elemento.email.replace(/(@)([a-z]*)/, "@gmail")}>Email: </CardText>
                    <CardText key="cell">Teléfono:</CardText>
                    <CardText text={getJson.job}>Ocupación: <b></b></CardText>
                    <CardText hideData>OTROS DATOS SON DESCONOCIDOS</CardText>
                </Display>
            </Row>

        </Container>
    );
}