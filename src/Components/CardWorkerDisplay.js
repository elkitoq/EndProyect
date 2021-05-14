import { useEffect, useState } from "react";
import { Card, CardBody, CardImg, CardText, Col, Row } from "reactstrap";



export const CardWorkerDisplay = ({ seed,gender, cant = 10 }) => {

    const [tarjeta, setTarjetas] = useState([])

    useEffect(() => {
        let seedString = "";
        if (seed !== undefined)
            seedString = `seed=${seed}`;

        let api=`https://randomuser.me/api/?gender=${gender}&${seedString}&results=${cant}&inc=gender,name,cell,email,picture`
        console.log(api);
        fetch(api)
            .then((response) => {
                return response.json()
            })
            .then((recurso) => {

                if (seed !== undefined)
                    for (let element of recurso.results) {
                        element.job = seed;
                    };
                setTarjetas(recurso.results);
                console.log(recurso.results);
            })
    }, []);

    return (
        <>
            {tarjeta.length > 0 ? tarjeta.map(CardWorker) : ""}

        </>
    );
}


export const CardWorker = (elemento, index) => {
    return (
        <div key={`cardWorker-${index}`}>
            <Card>
                <Row className="no-gutters">

                    <Col xs="8">
                    <CardText>
                        Nombre: <b>{` ${elemento.name.last}, ${elemento.name.first}`}</b>
                    </CardText>
                    <CardText>
                        Email: <b>{`${elemento.email.replace(/(@)([a-z]*)/, "@trabajesparatodes")}`}</b>
                    </CardText>
                    <CardText>
                        Telefono: <b>{`${elemento.cell}`}</b>
                    </CardText>
                    <CardText>
                        Ocupacion: <b>{`${elemento.job}`}</b>
                    </CardText>
                    </Col>
                    <Col xs="3">
                        <img width="200px" height="200px" src={`${elemento.picture.large  }`} alt="No se puede mostrar foto de Perfil" />
                    </Col>
                </Row>
                    
                
            </Card>
        </div>
    );
}

