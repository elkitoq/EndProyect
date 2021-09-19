import { useLocation } from "react-router";
import { Button, CardText, Container, Row } from "reactstrap";
import API, { APIComponent } from "../Tools/API";
import { Display } from "../Components/Display";

import { Status } from "../Tools/Status";
import { useContext } from "react";
import RutaTutorial from "../Components/tutorial";
import { ApplicationStatus } from "../Server/models/ApplicationStatus";

export const ViewOfferJob = () => {
    const { search } = useLocation();
    const getJson = API.getSearchParam(search);

    const status = useContext(Status.Context)
    const [selectRole,] = status.use('selectRole');
    getJson.role=selectRole;

    return (
        <Container className="abs-center" fluid={true}>
            <Row >
                <h1>Acá mostraría Busquedas laborales de la empresa</h1>
                <Button size="lg"  style={{width:"100px",left:"10%"}} color="primary" href="/createJob/">Nuevo</Button>
                <Display 
                get={getJson}
                link={(element)=>`/ViewJob?application=${element._id}`}
                >
                    <APIComponent url='/jobs' />
                    <CardText key="name">Puesto:</CardText>
                    <CardText className="text-wrap" key="description">Descripción:</CardText>
                    <CardText key="req" hideData>Requerimientos:</CardText>
                    <CardText func={(elemento)=>{
                        const status = ApplicationStatus.find((status)=>status.code===elemento.status)
                        return (status?status.title:"") + " " + elemento.status
                    }}>Estado:</CardText>
                </Display>
            </Row>

        </Container>
    );
}

RutaTutorial.get("OfferJob")
    .setDescription(<>Lista las actuales Busquedas de tu empresa</>)
    .setRender(ViewOfferJob)
    .addRequisito("haveEmpresa")
    .setMeta("Listar Busquedas")
    .setInstrucciones(<>Guarda tu nueva Busqueda</>);