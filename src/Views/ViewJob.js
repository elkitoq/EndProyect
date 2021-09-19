import { useContext, useState } from "react";
import { useLocation } from "react-router";
import { CardText, Container, Row } from "reactstrap";
import { Display } from "../Components/Display";
import API, { APIComponent } from "../Tools/API";
import { Status } from "../Tools/Status";
import { ViewCreateOfferJob } from "./ViewCreateOfferJob";



export const ViewJob = () => {
    const { search } = useLocation();
    const getJson = API.getSearchParam(search);

    const status = useContext(Status.Context)
    const [selectRole,] = status.use('selectRole');

    getJson.role=selectRole;
   

    return (
        <Container className="center-container" fluid={true}>
            <Row>
                <ViewCreateOfferJob mode="post" id={getJson.application}/>
            </Row>    
            <Row>
                <h1>Acá mostraría candidatos de la busqueda</h1>
                <Display get={getJson}>
                    <APIComponent url='/candidates'/>
                    <CardText text="name">Puesto:</CardText>
                    {/* <CardText className="text-wrap" key="description">Descripción:</CardText>
                    <CardText key="req" hideData>Requerimientos:</CardText>  */}
                </Display>
            </Row>

        </Container>
    );
}