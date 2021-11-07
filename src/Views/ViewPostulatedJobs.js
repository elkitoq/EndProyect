import { useState } from "react";
import { useLocation } from "react-router";
import { CardText, Container, Row } from "reactstrap";
import API, { APIComponent } from "../Tools/API";
import { Display, DisplayHelperStep } from "../Components/Display";
import { Status } from "../Tools/Status";
import { useContext } from "react";
import RutaTutorial, { Ayuda } from "../Components/tutorial";

export const ViewPostulatedJobs = () => {

    const status = useContext(Status.Context)
    const [selectRole,] = status.use('selectRole');

    return (
        <Container  fluid={true}>
            <Row >
                <Display nameDownload={()=>"EmpleosSolicitados"}
                get={{role:selectRole}}>
                    <APIComponent url="/postulates"/> 
                    <CardText key="name">Se ofrece:</CardText>
                    <CardText className="text-wrap" key="description">Descripción:</CardText>
                    <CardText className="text-wrap" func={(e)=>e.candidates.date}>Fecha:</CardText>
                </Display>
            </Row>
        <Ayuda ruta={RutaTutorial.get('Postulates')}/>
        </Container>
    );
}


RutaTutorial.get("Postulates").setLink('/postulates')
    .setMeta("Muestra las búsquedas laborales a las que te has postulado")
    .addPaso('Si tienes alguna postulación puedes verla en la lista')
    .addPasos(DisplayHelperStep)
    
