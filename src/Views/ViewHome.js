import { Container, Row } from "reactstrap";
import { OptionMenu } from "../Components/OptionMenu";

import '../Assets/Css/home.css';


export const ViewHome = () =>
    <Container className="abs-center">
        <div className="text-center">
            <div className="title-center">
                <h1>Bienvenido</h1>
                <h2>¿Que estas buscando hoy?</h2>
            </div>
            <Row className="">
                <OptionMenu href="/lookforJob/"                     >Busco Empleo</OptionMenu>
                <OptionMenu href="/createService/" fontSize="2vh"   >Ofrecer mis servicios</OptionMenu>
                <OptionMenu href="/lookforWorker/" fontSize="2vh"   >Busco empleados</OptionMenu>
            </Row>
        </div>
    </Container>