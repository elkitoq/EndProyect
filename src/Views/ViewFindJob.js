import { useLocation } from "react-router";
import { CardText, Container, Row } from "reactstrap";
import { Busqueda } from "../Components/Busqueda";
import { Display } from "../Components/Display";
import RutaTutorial, { NextButton } from "../Components/tutorial";
import { APIComponent } from "../Tools/API";




export const ViewFindJob = () => {
    let { search } = useLocation();
    let busqueda = new URLSearchParams(search)
    return (<>
            <Container className="abs-center separado">
            <Row>
                <Busqueda text="Buscar Puesto" href="/findJob" param="post" defaultValue={busqueda.get("post")}/>
                <h1>Estos son los puestos que responden a "{busqueda.get("post")}" </h1>
                <Display get={busqueda}>
                    <APIComponent url='/job' />
                    <CardText key="name">Puesto:</CardText>
                    <CardText className="text-wrap" key="description">Descripción:</CardText>
                    <CardText key="req" hideData>Requerimientos:</CardText>
                    <CardText key="match">Coincidencias:</CardText>
                </Display>
            </Row>
            </Container>
            </>
    );
}


RutaTutorial.get("findJob")
    .setMeta("Lista de Puestos")
    .setRender(ViewFindJob)