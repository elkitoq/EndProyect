import { Container, Row } from "reactstrap";
import { OptionMenu } from "../Components/OptionMenu";

import '../Assets/Css/home.css';


export const ViewHome = () => {

    return (
        <Container className="abs-center">
            <div className="text-center">
                <h1>Bienvenido</h1>
                <h2>¿Que estas buscando hoy?</h2>
                <Row className="">
                    <OptionMenu href="/lookforJob/"                     >Necesito Trabajo</OptionMenu>
                    <OptionMenu href="/offerService/"  fontSize="2vh"   >Quiero ofrecer mis humildes servicios</OptionMenu>
                    <OptionMenu href="/lookforWorker/" fontSize="2vh"   >Busco trabajadores para mi viña/pequeño emprendimiento lucrativo</OptionMenu>
                </Row>
            </div>
        </Container>
    );
}