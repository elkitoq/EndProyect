import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Container, Row, CardText, CardImg } from "reactstrap";
import { CardDisplay } from "../Components/CardDisplay";

import API from '../Tools/API';



export const ViewFindService = (props) => {
    const { search } = useLocation();
    const getJson = API.getSearchParam(search);
    // const [tarjeta, setTarjetas] = useState([]);

    //Resultados por defecto 10
    getJson.results = getJson.results || 10;

    //Correccion para el API random
    getJson.seed = getJson.job;
    //delete getJson.job;
    //reducimos los atributos del API random
    getJson.inc = "gender,name,cell,email,picture";

    const api = new API('https://randomuser.me/api/', useState([]), "results");

    return (
        <Container className="abs-center" fluid={true}>
            <Row>
                <h1>Aca mostraria los trabajadores disponibles que sean "{getJson.job}" </h1>

                <CardDisplay api={api} get={getJson}>
                    <CardImg func={(elemento) => elemento.picture.large} />
                    <CardText func={(elemento) => ` ${elemento.name.last}, ${elemento.name.first}`}>Nombre: <b>{ }</b></CardText>
                    <CardText func={(elemento) => elemento.email.replace(/(@)([a-z]*)/, "@gmail")}>Email: </CardText>
                    <CardText key="cell">Telefono:</CardText>
                    <CardText text={getJson.job}>Ocupacion: <b></b></CardText>
                </CardDisplay>
            </Row>

        </Container>
    );
}