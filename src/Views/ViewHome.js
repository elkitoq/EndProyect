import { Container, Row, Button } from "reactstrap";
import { OptionMenu } from "../Components/OptionMenu";

import '../Assets/Css/home.css';
import RutaTutorial, { Ayuda, Ruta } from "../Components/tutorial";
import { Señalado, Señalador } from "../Components/Señalador";

const menu1='podes consultar las diferentes búsquedas laborales en las que actualmente miles de empresas buscan trabajadores como vos. Podrás también postularte en ellos si creas un perfil de aspirante y cargas un Curriculum Vitae'
const menu2='podes cargar aquellos trabajos que estas realizando por cuenta propia para encontrar posibles clientes'
const menu3='podes encontrar personas dispuestos a realizar el trabajo que vos necesitas.'
export const ViewHome = () => <Container className="abs-center container-home no-scroll">
    <div className="text-center">
        <div className="title-center">
            <h1>Bienvenido</h1>
            <h2>¿Que estas buscando hoy?</h2>
        </div>
        <Row className="menu-home">
            <OptionMenu href="/lookforJob/"><span id="buscoEmpleo">Busco Empleo</span></OptionMenu>
            <Señalado marca="buscoEmpleo" title='Busco Empleo' text={menu1}/>
            <OptionMenu href="/createService/" fontSize="2vh"><span id="offServicio">Ofrecer mis servicios</span></OptionMenu>
            <Señalado marca="offServicio" title='Servicios' text={menu2}/>
            <OptionMenu href="/lookforWorker/" fontSize="2vh"><span id="buscoEmpleado">Busco empleados</span></OptionMenu>
            <Señalado marca="buscoEmpleado" title='Busco Empleado' text={menu3}/>
            <Ayuda ruta={RutaTutorial.get('Home')}/>
        </Row>
    </div>
</Container>


RutaTutorial.get("Home")
    .setDescription(<>Puedes ver la pagina inicial</>)
    .setInstrucciones(<>Has clic en nuestro <Señalador marca="logo" />, está en la esquina superior izquierda de la pagina</>)
    .setRender(ViewHome)
    .addPaso(<>En 'Busco empleo' {menu1}</>)
    .addPaso(<>{`En 'Ofrecer mis servicios' ${menu2} (Te pediremos que crees una cuenta o inicies sesión con un perfil de autónomo)`}</>)
    .addPaso(<>En 'Busco empleados' {menu3} Si sos una empresa y buscas contratar a alguien te sugerimos que crees una búsqueda laboral. Has click en <Señalador  marca="OfferJob" text ="Ofrecer Empleo"/></>)
    ;
