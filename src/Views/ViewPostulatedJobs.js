import { useState } from "react";
import { useLocation } from "react-router";
import { CardText, Container, Row } from "reactstrap";
import API, { APIComponent } from "../Tools/API";
import { Display } from "../Components/Display";
import { Status } from "../Tools/Status";
import { useContext } from "react";

export const ViewPostulatedJobs = () => {

    const status = useContext(Status.Context)
    const [selectRole,] = status.use('selectRole');

    return (
        <Container className="abs-center" fluid={true}>
            <Row >
                <Display nameDownload={()=>"EmpleosSolicitados"}
                get={{role:selectRole}}>
                    <APIComponent url="/postulates"/> 
                    <CardText key="name">Se ofrece:</CardText>
                    <CardText className="text-wrap" key="description">Descripción:</CardText>
                    <CardText className="text-wrap" func={(e)=>e.candidates.date}>Fecha:</CardText>
                </Display>
            </Row>

        </Container>
    );
}