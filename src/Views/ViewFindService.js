import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Container, Row } from "reactstrap";
import { CardWorkerDisplay } from "../Components/CardWorkerDisplay";

import API from '../Tools/API';



export const ViewFindService = (props) => {
    const { search } = useLocation();
    const getJson = API.getSearchParam(search);
    const [tarjeta, setTarjetas] = useState([]);

    //Resultados por defecto 10
    getJson.results = getJson.results || 10;  


    useEffect(() => {

        //Correccion para el API random
        getJson.seed=getJson.job;
        delete getJson.job;

        let api=new API('https://randomuser.me/api/');
        api.get(getJson)
            .then(({data}) => {

                //Correccion para el API random
                if (getJson.seed !== undefined)
                    for (let element of data.results) {
                        element.job = getJson.seed;
                    };
                
                setTarjetas(data.results);
            })
    }, [getJson]);


    return (
        <Container className="abs-center" fluid={true}>
            <Row>
                <h1>Aca mostraria los trabajadores disponibles que sean "{getJson.job}" </h1>

                <CardWorkerDisplay tarjeta={tarjeta}/>
            </Row>

        </Container>
    );
}