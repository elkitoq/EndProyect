import { useContext, useState } from "react";
import { useLocation } from "react-router";
import { CardText, Container, Row } from "reactstrap";
import { Display } from "../Components/Display";
import RutaTutorial from "../Components/tutorial";
import API, { APIComponent } from "../Tools/API";
import { Status } from "../Tools/Status";
import { ViewCreateOfferJob } from "./ViewCreateOfferJob";



export const ViewJob = () => {
    const { search } = useLocation();
    const getJson = API.getSearchParam(search);

    const status = useContext(Status.Context)
    const [selectRole,] = status.use('selectRole');

    getJson.role=selectRole;
   

    return (
        <Container className="center-container" fluid={true}>
            <Row>
                <ViewCreateOfferJob mode="post" id={getJson.application}/>
            </Row>    
            <Row>
                <h1>Acá mostraría candidatos de la busqueda</h1>
                <Display 
                get={getJson}
                link={{onClick:(element)=>`/perfilAspirante?id=${element._id}`,text:"Ver Perfil"}}
                >
                    <APIComponent url='/candidates'/>
                    <CardText key="profileName">Nombre:</CardText>
                    {/* <CardText className="text-wrap" key="description">Descripción:</CardText>
                    <CardText key="req" hideData>Requerimientos:</CardText>  */}
                </Display>
            </Row>

        </Container>
    );
}


RutaTutorial.get("ViewJob")
    .setDescription(<>Muestra y permite editar una Busqueda laboral de tu empresa</>)
    .setRender(ViewJob)
    .setMeta("Editar Busqueda")
    .setInstrucciones(<>Rellena los datos pedidos</>);