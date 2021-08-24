import { useState } from "react";
import { useLocation } from "react-router";
import { CardText, Container, Row } from "reactstrap";
import API, { APIComponent } from "../Tools/API";
import { Display } from "../Components/Display";
import { useCookies } from "react-cookie";

export const ViewOfferService = () => {
    const { search } = useLocation();
    const getJson = API.getSearchParam(search);

    const [cookies]=useCookies(['selectRole'])
    getJson.role=cookies.selectRole;

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