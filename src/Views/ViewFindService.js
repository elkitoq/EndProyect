import { useLocation } from "react-router";
import { Container, Row, CardText, CardImg } from "reactstrap";
import { Display } from "../Components/Display";
import API, { APIComponent } from "../Tools/API";
import RutaTutorial, { NextButton } from "../Components/tutorial";




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
            <Row >
                <h1 className="title-find">Estos son los resultados que responden a su busqueda de "{getJson.job}" </h1>
                <Display get={getJson} nameDownload={"Busqueda("+getJson.job+")"}>
                    <APIComponent url='https://randomuser.me/api/' responseKey="results" />
                    <CardImg func={(elemento) => elemento.picture.large} />
                    <CardText func={(elemento) => ` ${elemento.name.last}, ${elemento.name.first}`}>Nombre: </CardText>
                    <CardText func={(elemento) => elemento.email.replace(/(@)([a-z]*)/, "@gmail")}>Email: </CardText>
                    <CardText key="cell">Teléfono:</CardText>
                    <CardText text={getJson.job}>Ocupación: </CardText>
                    <CardText hideData text="OTROS DATOS SON DESCONOCIDOS">{""}</CardText>
                </Display>
            </Row>

        </Container>
    );
}


RutaTutorial.get("FindService")
    .setMeta("Lista de servicios")
    .setRender(ViewFindService)

/*
RutaTutorial.get("PostulateJob")
    .setMeta("Postularse a una Busqueda")
    .setRender(ViewFindService)
    .addRequisito("haveAspirante")
    */