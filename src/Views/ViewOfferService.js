import { useState } from "react";
import { useLocation } from "react-router";
import { CardText, Container, Row } from "reactstrap";
import API, { APIComponent } from "../Tools/API";
import { Display } from "../Components/Display";
import { Status } from "../Tools/Status";
import { useContext } from "react";

export const ViewOfferService = () => {
    const { search } = useLocation();
    const getJson = API.getSearchParam(search);

    const status = useContext(Status.Context)
    const [selectRole,] = status.use('selectRole');

    getJson.role=selectRole;

    return (
        <Container className="abs-center" fluid={true}>
            <Row >
                <h1>Acá mostraría los servicios ofrecidos</h1>
                <Display get={getJson}>
                    <APIComponent url="/service"/> 
                    <CardText key="name">Se ofrece:</CardText>
                    <CardText className="text-wrap" key="description">Descripción:</CardText>
                    <CardText key="price" hideData>Requerimientos:</CardText>
                </Display>
            </Row>

        </Container>
    );
}