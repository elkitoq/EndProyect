import { useState } from "react";
import { useLocation } from "react-router";
import { CardText, Container, Row } from "reactstrap";
import API from "../Tools/API";
import { Display } from "../Components/Display";
import { useCookies } from "react-cookie";


export const ViewOfferJob = () => {
    const { search } = useLocation();
    const getJson = API.getSearchParam(search);

    const api = new API('/job', useState([]), "response", useState({}), "info")

    const [cookies]=useCookies(['selectRole'])
    getJson.role=cookies.selectRole;

    return (
        <Container className="abs-center" fluid={true}>
            <Row >
                <h1>Aca mostraria puestos de la empresa</h1>
                <Display api={api} get={getJson}>
                    <CardText key="name">Puesto:</CardText>
                    <CardText className="text-wrap" key="description">Descripcion:</CardText>
                    <CardText key="req" hideData>Requerimientos:</CardText>
                </Display>
            </Row>

        </Container>
    );
}