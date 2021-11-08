import { useState } from "react";
import { useLocation } from "react-router";
import { CardText, Container, Row } from "reactstrap";
import API, { APIComponent } from "../Tools/API";
import { Display } from "../Components/Display";
import { Status } from "../Tools/Status";
import { useContext } from "react";
import RutaTutorial from "../Components/tutorial";


export const ViewOfferService = () => {
    const { search } = useLocation();
    const getJson = API.getSearchParam(search);

    const status = useContext(Status.Context)
    const [selectRole,] = status.use('selectRole');

    getJson.role=selectRole;

    return (
        <Container className="abs-center" fluid={true}>
            <Row >
                <Display nameDownload={()=>"Servicios" /*+getJson.get("b")+")"*/}
                get={getJson}
                link={{onClick:(element)=>`/CreateService?service=${element._id}`,text:"Ver y Editar"}}
                >
                    <APIComponent url="/service"/> 
                    <CardText key="name">Se ofrece:</CardText>
                    <CardText className="text-wrap" key="description">Descripción:</CardText>
                    <CardText key="price" hideData>Requerimientos:</CardText>
                </Display>
            </Row>

        </Container>
    );
}


RutaTutorial.get("OfferService").setLink('/OfferService')
    .setDescription(<>Lista los actuales Servicios ofrecidos</>)
    .setRender(ViewOfferService)
    .addRequisito("haveAutonomo")
    .setMeta("Listar Servicios")
    .setInstrucciones(<>Guarda un servicio</>);