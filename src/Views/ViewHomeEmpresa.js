import { Container, Row } from "reactstrap"
import { OptionMenu } from "../Components/OptionMenu";




export const ViewHomeEmpresa = () => {
    return (
        <Container className="abs-center">
            <div className="divtext center">
                <h1>Pagina de inicio para empresas</h1>
                <Row className="">
                    <OptionMenu href="/createJob/">Crear puesto</OptionMenu>
                    <OptionMenu href="/offerJob/">Ver puestos</OptionMenu>
                    <OptionMenu href="/offerJob/">puestos</OptionMenu>
                </Row>
            </div>
        </Container>
    );
}