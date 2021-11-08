import { useLocation } from "react-router";
import { Container, Row, CardText, CardImg } from "reactstrap";
import { Display, DisplayHelperStep } from "../Components/Display";
import API, { APIComponent } from "../Tools/API";
import RutaTutorial, { Ayuda, NextButton } from "../Components/tutorial";

import {ViewLookForWorker} from "./ViewLookForWorker";
import { Señalador } from "../Components/Señalador";



export const ViewFindService = (props) => {
    const { search } = useLocation();
    const getJson = API.getSearchParam(search);
    // const [tarjeta, setTarjetas] = useState([]);

    //Correccion para el API random
    getJson.seed = getJson.job;
    //delete getJson.job;
    //reducimos los atributos del API random
    getJson.inc = "gender,name,cell,email,picture";

    return (
        <Container className="abs-center" fluid={true}>
            <Row className="row-service-card">
                <h1 className="title-find">Estos son los resultados que responden a su búsqueda de "{getJson.job}" </h1>
                {/* <Display get={getJson} nameDownload={"Busqueda("+getJson.job+")"}>
                    <APIComponent url='https://randomuser.me/api/' responseKey="results" />
                    <CardImg func={(elemento) => elemento.picture.large} />
                    <CardText func={(elemento) => ` ${elemento.name.last}, ${elemento.name.first}`}>Nombre: </CardText>
                    <CardText func={(elemento) => elemento.email.replace(/(@)([a-z]*)/, "@gmail")}>Email: </CardText>
                    <CardText key="cell">Teléfono:</CardText>
                    <CardText text={getJson.job}>Ocupación: </CardText>
                    <CardText hideData text="OTROS DATOS SON DESCONOCIDOS">{""}</CardText>
                </Display> */}

                <ViewLookForWorker get={getJson}/>
                <Display get={getJson} nameDownload={"Busqueda(" + getJson.job + ")"}>
                    <APIComponent url='/service' />
                    <CardImg func={(elemento) => elemento.freelance.photo} />
                    <CardText func={(elemento) => ` ${elemento.freelance.lastName ? elemento.freelance.lastName : ""}${(elemento.freelance.lastName && elemento.freelance.name) ? ', ' : ''}${elemento.freelance.name ? elemento.freelance.name : ""}`}>Nombre: </CardText>
                    <CardText func={(elemento) => elemento.name}>Ofrece: </CardText>
                    <CardText hideData func={(elemento) => elemento.description}>Descripcion: </CardText>
                    <CardText hideData func={(elemento) => elemento.freelance.email}>Email: </CardText>
                    <CardText hideData func={(elemento) => elemento.freelance.phone}>Teléfono:</CardText>
                    <CardText hideData func={(elemento) => elemento.price}>Precio: </CardText>
                    <CardText func={(elemento) => elemento.match}>Coincidencias: </CardText>

                </Display>
                <Ayuda ruta={RutaTutorial.get('FindService')}/>
            </Row>

        </Container>
    );
}


RutaTutorial.get("FindService").setLink('/FindService')
    .setMeta("Lista de servicios")
    .setRender(ViewFindService)
    .addPaso(<>Acá puedes ver una lista de los servicios que se están ofreciendo y que responden a la busqueda que has hecho. Puedes cambiar la busqueda en la
    <Señalador marca="barraBusquedalookforworker" texto=" barra de búsqueda"/></>)
    .addPasos(DisplayHelperStep)

/*
RutaTutorial.get("PostulateJob")
    .setMeta("Postularse a una Búsqueda")
    .setRender(ViewFindService)
    .addRequisito("haveAspirante")
    */