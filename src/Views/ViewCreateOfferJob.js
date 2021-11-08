import { useState } from "react";
import { Button, Container, Input } from "reactstrap";
import { Form } from "../Components/Form";
import { FormItem } from "../Components/FormItem";
import API, { APIComponent } from "../Tools/API";
import { Status } from "../Tools/Status";
import { useContext } from "react";
import { ApplicationStatus } from "../Server/models/ApplicationStatus";
import { ApplicationContrato } from "../Server/models/AplicationContrato";
import { Applicationhorario } from "../Server/models/Aplicationhorario";
import RutaTutorial, { Ayuda } from "../Components/tutorial";
import { ViewOfferJob } from "./ViewOfferJob";
import { LoadRoles } from "../Components/role";
import '../Assets/Css/Company.css';
import { useHistory, useLocation } from "react-router";

export const ViewCreateOfferJob = ({ mode = "put",id}) => {

    const { pathname } = useLocation();
    const history = useHistory();

    const status = useContext(Status.Context)
    const [selectRole,] = status.use('selectRole');
    const [selectStatus,setStatus]= useState(0)

    const [saved,setSaved] = useState(false)

    // class APIcreateJob extends API{
    //     didMount = ()=>{
    //         this.setData({status:0})
    //         if (id)
    //         this.get({id}).then((res)=>(res.data && res.data.response)?setStatus(res.data.response.status):"");
    //     }
    //     changeInfo =(info)=>{
    //         if (info.error)
    //             alert(info.error);               
    //         if (mode==="put") 
    //         setSaved(info.saved)
    //     }
    // } 

    
    const [update,updater]=useState(1);
    API.updater('/job',updater)

    //API.apis=[]
    
    API.on(API.events.MOUNT,
        (api)=>{
            if(api.id==='/job'){
            api.setData({status:0})
            if (id)
            api.get({id}).then((res)=>(res.data && res.data.response)?setStatus(res.data.response.status):"");
        }
        },
        'CreateJob')

    API.on(API.events.CHANGEINFO,(api)=>{
        if(api.id==='/job'){
        if (mode==="put") 
        setSaved(api.getHookInfo().saved)}

    },'CreateJob')

    const api=API.get('/job')

    if (api){
        if ( api.getHookData() && api.getHookData().tipoContratacion === 'Planta Permanente')
        api.getHookData().tipoContrato=99
        if (api.getHookData() && api.getHookInfo().saved)
             if(pathname.substring(0, 10) === "/createJob") history.push('/offerJob')
        if ( api.getHookData() && api.getHookData())
            api.getHookData().role=selectRole

    }

    return (
        <>  
        {saved?<ViewOfferJob/>:
        <Container className="container-form-busqueda">
            <LoadRoles select={0}/>
            <Form method={mode} className="form-create-jobs">
                <APIComponent url="/job" />
                <FormItem name="Se busca:" idInput="name" />
                <FormItem name="Descripción:" type="textarea" idInput="description" />
                <FormItem name="Requerimientos:" type="textarea" idInput="req" />
                <FormItem name="Zona:" type="textarea" idInput="zona" />
                
                <FormItem name="Tipo de contratacion" type="select" idInput="tipoContratacion">
                    <option value="Contratado" selected="selected">Contratado</option>
                    <option value="Planta Permanente">Planta Permanente</option>
                </FormItem>
                <div style={{visibility:(api && api.getHookData() && api.getHookData().tipoContratacion === 'Planta Permanente')?"hidden":"visible"}}>
                <FormItem name="Tipo de contrato" type="select" idInput="tipoContrato" 
                value={(api && api.getHookData() && api.getHookData().tipoContratacion === 'Planta Permanente' )?99:undefined} 
                disabled={(api && api.getHookData() && api.getHookData().tipoContratacion === 'Planta Permanente' )}
                >
                {ApplicationContrato.map(
                        (element, index) =>
                            <option key={`option-${index}`} value={element.code} selected={(element.code===selectStatus)?"selected":undefined}>{element.title}</option>
                    )}
                </FormItem>
                </div>
                <FormItem name="Tipo de Jornada" type="select" idInput="tipoJornada"> 
                {Applicationhorario.map(
                        (element, index) =>
                            <option key ={`option-${index}`} value={element.code} selected={(element.code===selectStatus)?"selected":undefined}>{element.title}</option>
                )}
                </FormItem>
                <FormItem name="Estado" type="select" idInput="status">
                    {ApplicationStatus.map(
                        (element, index) =>
                            <option key={`option-${index}`} value={element.code} selected={(element.code===selectStatus)?"selected":undefined}>{element.title}</option>
                    )}
                </FormItem>
                <Input name="role" type="hidden" defaultValue={selectRole} />
                <div className="container-button-submit">
                    <Button className='button-submit separado' size="lg" color="primary" type="submit" block>{mode==="put"?"Enviar":"Guardar"}</Button>
                </div>
            </Form>
            <div className="container-back-button">
                <Button className='back-button' size="lg" href="/offerJob/" color="secondary">Volver a Búsquedas Laborales</Button>  
            </div>
            {mode==="put"?<Ayuda ruta={RutaTutorial.get('CreateJob')}/>:""}
        </Container>
        }
        </>);
}

RutaTutorial.get("CreateJob").setLink('/CreateJob')
    .setDescription(<>Crea una Búsqueda laboral para tu empresa</>)
    .setRender(ViewCreateOfferJob)
    .addRequisito('haveEmpresa')
    .setMeta("Crear Búsqueda")
    .setInstrucciones(<>Rellena los datos pedidos</>)
    .addPaso(<>En 'Se busca' escribe el título del perfil de aspirante que estás buscando</>)
    .addPaso(<>En 'Descripción' puedes incluir como es el puesto de trabajo que quieres crear, tambien palabras claves que le permitan al aspirante encontrar tu búsqueda</>)
    .addPaso(<>En 'Requerimientos' escribe lo que esperas de los aspirantes que se presenten, desde experiencia previa, movilidad o lenguajes, etc. (en caso que se necesite)
    <br/>En Zona incluye en donde puede esperar el aspirante a trabajar. Puede ser el distrito donde se encuentre las oficinas o si requerirá viajar</>)
    .addPaso(<>En caso de que lo que ofrezcas sea un contrato temporal, elegí 'Tipo de contratación': Contrato y selecciona el periodo de duración en Tipo de contrato
    <br/>En caso contrario seleccioná Tipo de contratación: Planta permanente.
    <br/>En Tipo de Jornada, seleccioná la duración de la jornada laboral habitual
    </>)
    .addPaso(<>Por ultimo vas a seleccionar el estado en que se creará la Búsqueda, esto puede ser:
    <br/><b>Provisorio</b>: Tu búsqueda queda en modo borrador, para seguir editándola, nadie puede verla hasta que la pases a Abierta
    <br/><b>Abierta</b>: El estado normal de una búsqueda que espera nuevos postulantes, ellos pueden verla en la página de búsqueda y postularse a ella
    <br/><b>En proceso</b>: Cuando ya no recibes nuevos postulantes, esta es la etapa de entrevistas. Aún puedes mandar mensajes a los aspirantes que se hayan postulando
    <br/><b>Cerrada</b>: cuando ya se ha seleccionado a los candidatos y se da por terminada la búsqueda.</>) 
    .addPaso(<>Puedes cambiar el estado en cualquier momento, de la misma manera que cambias cualquier otro campo. Desde tu lista de búsquedas has click en ella y pulsá 'Editar'
    </>);
