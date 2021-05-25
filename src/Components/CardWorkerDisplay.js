import { useEffect, useState } from "react";
import { Card, CardText, CardBody, CardImg, CardTitle, Col } from "reactstrap";
import '../Assets/Css/cardWorker.css'


export const CardWorkerDisplay = ({ seed, gender, cant = 10 }) => {

    const [tarjeta, setTarjetas] = useState([])

    useEffect(() => {
        let seedString = "";
        if (seed !== undefined)
            seedString = `seed=${seed}`;

        let api = `https://randomuser.me/api/?gender=${gender}&${seedString}&results=${cant}&inc=gender,name,cell,email,picture`
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
    }, [cant, gender, seed]);

    return (
        <>
            {tarjeta.length > 0 ? tarjeta.map(CardWorker) : ""}

        </>
    );
}


// export const CardWorker = (elemento, index) => {
//     return (
//         <div key={`cardWorker-${index}`}>
//             <Card>
//                 <Row className="no-gutters">

//                     <Col xs="8">
//                     <CardText>
//                         Nombre: <b>{` ${elemento.name.last}, ${elemento.name.first}`}</b>
//                     </CardText>
//                     <CardText>
//                         Email: <b>{`${elemento.email.replace(/(@)([a-z]*)/, "@trabajesparatodes")}`}</b>
//                     </CardText>
//                     <CardText>
//                         Telefono: <b>{`${elemento.cell}`}</b>
//                     </CardText>
//                     <CardText>
//                         Ocupacion: <b>{`${elemento.job}`}</b>
//                     </CardText>
//                     </Col>
//                     <Col xs="3">
//                         <img width="200px" height="200px" src={`${elemento.picture.large  }`} alt="No se puede mostrar foto de Perfil" />
//                     </Col>
//                 </Row>


//             </Card>
//         </div>
//     );
// }

export const CardWorker = (elemento, index) => {
    return (
        <Col xs="3">
            <div key={`cardWorker-${index}`}>
                <Card className="card-worker">
                    <Col className="col-img" sm="12" md={{ size: 6, offset: 3 }}><CardImg className="container-img" top width="128px" height="170px" src={`${elemento.picture.large}`} alt="No se puede mostrar foto de Perfil" /></Col>
                    <CardBody className="card-body">
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                            <CardText>Nombre: <b>{` ${elemento.name.last}, ${elemento.name.first}`}</b></CardText>
                            <CardText>Email: <b>{`${elemento.email.replace(/(@)([a-z]*)/, "@gmail")}`}</b></CardText>
                            <CardText>Telefono: <b>{`${elemento.cell}`}</b></CardText>
                            <CardText>Ocupacion: <b>{`${elemento.job}`}</b></CardText>
                        </Col>
                    </CardBody>
                </Card>
            </div>
        </Col>
    );
}