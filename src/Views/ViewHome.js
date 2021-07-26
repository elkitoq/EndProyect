import { Container, Row } from "reactstrap";
import { OptionMenu } from "../Components/OptionMenu";

import '../Assets/Css/home.css';
import RutaTutorial from "../Components/tutorial";
import { Señalado, Señalador } from "../Components/Señalador";
import { Mapa } from '../Components/tutorial.js'

export const ViewHome = ({id}) =>{
    console.log(id);
    return <Container className="abs-center">
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
}

const tutorial =
    new RutaTutorial("Home")
    .setDescription(<>Puedes ver la pagina inicial</>)
    .setInstrucciones(<>Has clic en nuestro <Señalador marca="logo"/>, está en la esquina superior izquierda de la pagina</>)
    .setRender(ViewHome);


new RutaTutorial("q").setRender(Mapa);

new RutaTutorial("a").setRender(Mapa);

new RutaTutorial("c").setRender(Mapa);

new RutaTutorial("b").setRender(Mapa);

new RutaTutorial("jaja").setRender(Mapa);

    tutorial.addRequisito(RutaTutorial.get["a"]);
    tutorial.addRequisito(RutaTutorial.get["c"]);
    tutorial.addRequisito(RutaTutorial.get["b"]);
    tutorial.addRequisito(RutaTutorial.get["jaja"]);
    tutorial.addRequisito(RutaTutorial.get["a"]);
    tutorial.addRequisito(RutaTutorial.get["q"]);
    RutaTutorial.get["q"].addRequisito(RutaTutorial.get["c"])
    