import { useContext, useState} from "react";
import { useLocation } from "react-router";
import { Button, CardImg, CardText, Container, Input, Modal, ModalBody, ModalFooter, Row } from "reactstrap";
import { Display, DisplayHelperStep } from "../Components/Display";
import { Form } from "../Components/Form";
import { FormItem } from "../Components/FormItem";
import RutaTutorial, { Ayuda } from "../Components/tutorial";
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
    const toggle = () => {
        setModal(!modal)
    };

    API.on(API.events.MOUNT, (api)=>{
        if (api.id==='/mensajeApplications')
        api.getHookData().application= API.get('/job').getHookData()._id
        api.refresh()
    },"ViewJob");

    const sendMessage = () =>{
        API.get('/mensajeApplications').put();
        //API.get('/mensajeApplications').getHookData().mensaje=""
        //API.get('/mensajeApplications').refresh()
        setModal(false)
    }

    const ModalCard = () =>
    <Modal isOpen={modal} toggle={toggle} >
        <ModalBody >
            <Form method="put">
                <APIComponent url='/mensajeApplications'/>
                <b>Se enviara el mensaje a todos los postulantes que esten en el estado actual de la Búsqueda</b>
                <Input name="clientUrl" type="hidden" defaultValue={window.location.host} />
                <FormItem type="textarea" idInput="mensaje"/>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" href="#" onClick={sendMessage}>Enviar</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>
    
    return (
        <Container className="" fluid={true}>
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
            <Ayuda ruta={RutaTutorial.get('ViewJob')}/>

        </Container>
    );
}


RutaTutorial.get("ViewJob")
    .setDescription(<>Muestra y permite editar una Búsqueda laboral de tu empresa</>)
    .setRender(ViewJob)
    .setMeta("Editar Búsqueda")
    .setInstrucciones(<>Rellena los datos pedidos</>)
    .addPasos(RutaTutorial.get("CreateJob").pasos)
    .addPaso(<>Puedes ver una lista de los candidatos, y la fecha y hora de su postulación, has click en alguno para ver detalles o ir a su perfil</>)
    .addPasos(DisplayHelperStep)
    ;