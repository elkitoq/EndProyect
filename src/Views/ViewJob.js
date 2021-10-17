import { useContext, useState} from "react";
import { useLocation } from "react-router";
import { Button, CardImg, CardText, Container, Input, Modal, ModalBody, ModalFooter, Row } from "reactstrap";
import { Display } from "../Components/Display";
import { Form } from "../Components/Form";
import { FormItem } from "../Components/FormItem";
import RutaTutorial from "../Components/tutorial";
import API, { APIComponent } from "../Tools/API";
import { Status } from "../Tools/Status";
import { ViewCreateOfferJob } from "./ViewCreateOfferJob";
import { ViewAddCVData } from './ViewAddCVData'


export const ViewJob = () => {
    const { search } = useLocation();
    const getJson = API.getSearchParam(search);

    const status = useContext(Status.Context)
    const [selectRole,] = status.use('selectRole');

    getJson.role=selectRole;
    const getJsonCandidates= Object.assign({},getJson)

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const ModalCard = () =>
    <Modal isOpen={modal} toggle={toggle} >
        <ModalBody >
            <Form method="put">
                <APIComponent url='/mensaje'/>
                <b>Se enviara el mensaje a todos los postulantes que esten en el estado actual de la Busqueda</b>
                <FormItem type="textarea" idInput="mensaje"/>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" href="#" onClick={toggle}>Enviar</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>
    
    return (
        <Container className="center-container" fluid={true}>
            <Row>
                <ViewCreateOfferJob mode="post" id={getJson.application}/>
            </Row>
            <Button onClick={(a)=>{toggle()}}>abrir</Button>   
            <ModalCard/> 
            <Row>
                <h3>Candidatos de la busqueda:</h3>
                <Display  nameDownload={"Candidatos"}
                get={getJsonCandidates}
                link={{onClick:(element)=>`/perfilAspirante?id=${element.postulate?element.postulate.data._id:""}`,text:"Ver Perfil"
            }}
            buttons={[{text:'Mensaje',onClick:(a)=>{toggle()}}]}
                >
                    <APIComponent url='/candidates'/>
                    <CardImg func={(elemento) => elemento.cv.photo} />
                    <CardText func={(elemento) => ` ${elemento.cv.name}, ${elemento.cv.lastName}`}>Nombre: </CardText>
                    <CardText func={(elemento) => elemento.cv.age}>Edad:</CardText>
                    <CardText func={(elemento) => elemento.cv.email}>Email: </CardText>
                    <CardText hideData func={(elemento) => elemento.cv.phone}>Teléfono:</CardText>
                    <CardText hideData func={(elemento) => elemento.cv.address}>Dirección:</CardText>
                    <CardText hideData func={(elemento) => elemento.cv.city}>Ciudad / Distrito:</CardText>
                    <CardText hideData func={(elemento) => elemento.cv.cp}>Código Postal:</CardText>
                    <CardText func={(elemento) => elemento.postulate.date}>Fecha: </CardText>

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