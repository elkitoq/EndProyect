import { Container, Row, Button} from "reactstrap";
import { OptionMenu } from "../Components/OptionMenu";

import '../Assets/Css/home.css';
import RutaTutorial, { NextButton } from "../Components/tutorial";
import { Señalador } from "../Components/Señalador";
import { useContext } from "react";
import { Status } from "../Tools/Status";

export const ViewHome = () =><Container className="abs-center">
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
        <NextButton ruta="Home"/>
    </Container>


    RutaTutorial.get("Home")
    .setDescription(<>Puedes ver la pagina inicial</>)
    .setInstrucciones(<>Has clic en nuestro <Señalador marca="logo"/>, está en la esquina superior izquierda de la pagina</>)
    .setRender(ViewHome)
    .addRequisito("findJob")
    ;

    