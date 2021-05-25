import { Button, Container, Row } from "reactstrap"
import { OptionMenu } from "../Components/OptionMenu";




export const ViewHomeEmpresa = () => {
    return (
        <Container className="abs-center">
            <div className="divtext center">
                <h1>Paquina de inicio para empresas</h1>
                <Row className="">
                    <OptionMenu href="/offerJob/">Crear puesto</OptionMenu>
                    <OptionMenu href="/offerJob/">Crear puesto</OptionMenu>
                    <OptionMenu href="/offerJob/">Crear puesto</OptionMenu>
                </Row>
            </div>
        </Container>
    );
}