import { useLocation } from "react-router";
import { Container, Row } from "reactstrap";



export const ViewFindJob = () => {
    let { search } = useLocation();
    let busqueda = new URLSearchParams(search)
    return (
        <Container className="abs-center" fluid={true}>
            <Row>
                <h1>En estos momentos no hay puestos que respondan a "{busqueda.get("post")}" </h1>
            </Row>
        </Container>
    );
}