import { Container, Row, Button} from "reactstrap";
import { OptionMenu } from "../Components/OptionMenu";

import '../Assets/Css/home.css';
import RutaTutorial from "../Components/tutorial";
import { Señalador } from "../Components/Señalador";

export const ViewHome = () =><Container className="abs-center no-scroll">
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


    RutaTutorial.get("Home")
    .setDescription(<>Puedes ver la pagina inicial</>)
    .setInstrucciones(<>Has clic en nuestro <Señalador marca="logo"/>, está en la esquina superior izquierda de la pagina</>)
    .setRender(ViewHome)
    ;

    