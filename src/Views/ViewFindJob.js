import { useLocation } from "react-router";
import { Container, Row } from "reactstrap";
import RutaTutorial, { NextButton } from "../Components/tutorial";




export const ViewFindJob = () => {
    let { search } = useLocation();
    let busqueda = new URLSearchParams(search)
    return (<>
            <Row>
                <h1>En estos momentos no hay puestos que respondan a "{busqueda.get("post")}" </h1>
                
            </Row>
            </>
    );
}


RutaTutorial.get("findJob")
    .setMeta("Lista de Puestos")
    .setRender(ViewFindJob)