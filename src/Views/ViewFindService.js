import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Container, Row} from "reactstrap";
import { CardWorkerDisplay } from "../Components/CardWorkerDisplay";

import API from '../Tools/API';



export const ViewFindService = (props) => {
    const { search } = useLocation();
    const getJson = API.getSearchParam(search);
    // const [tarjeta, setTarjetas] = useState([]);

    //Resultados por defecto 10
    getJson.results = getJson.results || 10;

    //Correccion para el API random
    getJson.seed = getJson.job;
    delete getJson.job;

    const api = new API('https://randomuser.me/api/', useState([]), "results");

    console.log(api.getHookData());

    useEffect(() => api.get(getJson)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ,[])



    return (
        <Container className="abs-center" fluid={true}>
            <Row>
                <h1>Aca mostraria los trabajadores disponibles que sean "{getJson.job}" </h1>

                <CardWorkerDisplay tarjeta={api.getHookData()} />
            </Row>

        </Container>
    );
}