import { useLocation } from "react-router";
import { Container, Row } from "reactstrap";
import { CardWorkerDisplay } from "../Components/CardWorkerDisplay";





export const ViewFindService = (props) => {
    let { search } = useLocation();
    let busqueda = new URLSearchParams(search)
    return (
        <Container className="abs-center">
            <Row>
                <h1>Aca mostraria los trabajadores disponibles que sean "{busqueda.get("job")}" </h1>

                <CardWorkerDisplay seed={busqueda.get("job")} gender={busqueda.get("gender")} />
            </Row>

        </Container>
    );
}