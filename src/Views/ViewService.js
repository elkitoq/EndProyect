import { useLocation } from "react-router";
import { CardText, Container, Row } from "reactstrap";
import { Display } from "../Components/Display";
import API, { APIComponent } from "../Tools/API";
import { ViewCreateOfferService } from "./ViewCreateOfferService"
import RutaTutorial from "../Components/tutorial";





export const ViewService = () =>{

    const { search } = useLocation();
    const getJson = API.getSearchParam(search);






    return (

        <Container className="center-container" fluid={true}>
                REVISA ESTA PAGINA PORQ ME PARECE Q SOBRA
            <Row>
                <ViewCreateOfferService mode="post" id={getJson.service}/>
            </Row>

            <Row>
            <Display nameDownload={()=>"Servicios" /*+getJson.get("b")+")"*/}
                get={getJson}>
                    <APIComponent url="/service"/> 
                    <CardText key="name">Se ofrece:</CardText>
                    <CardText className="text-wrap" key="description">Descripción:</CardText>
                    <CardText key="price" hideData>Requerimientos:</CardText>
                </Display>
            </Row>
            </Container>)

}


// RutaTutorial.get("ViewService").setLink('/ViewService')
//     .setDescription(<>Muestra y permite editar un servicio ofrecido</>)
//     .setRender(ViewService)
//     .setMeta("Editar Servicio")
//     .setInstrucciones(<>Rellena los datos pedidos</>);