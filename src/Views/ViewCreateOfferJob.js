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
import RutaTutorial from "../Components/tutorial";
import { ViewOfferJob } from "./ViewOfferJob";
import { LoadRoles } from "../Components/role";
import '../Assets/Css/Company.css';

export const ViewCreateOfferJob = ({ mode = "put",id}) => {

    const status = useContext(Status.Context)
    const [selectRole,] = status.use('selectRole');
    const [selectStatus,setStatus]= useState(0)

    const [saved,setSaved] = useState(false)

    class APIcreateJob extends API{
        didMount = ()=>{
            this.setData({status:0})
            if (id)
            this.get({id}).then((res)=>(res.data && res.data.response)?setStatus(res.data.response.status):"");
        }
        changeInfo =(info)=>{
            if (info.error)
                alert(info.error);               
            if (mode==="put") 
            setSaved(info.saved)
        }
    } 

    
    // const [api,setApi]=useState(null)

    // API.on(API.events.MOUNT,
    //     (api)=>{
    //         api.setData({status:0})
    //         if (id)
    //         api.get({id}).then((res)=>(res.data && res.data.response)?setStatus(res.data.response.status):"");
    //         setApi(api)
    //     },
    //     'CreateJob')

    // API.on(API.events.CHANGEINFO,(api)=>{
    //     if (mode==="put") 
    //     setSaved(api.getHookInfo().saved)
    // },'CreateJob')

    // document.val=api

    return (
        <>
        {saved?<ViewOfferJob/>:
        <Container className="container-form-busqueda">
            <LoadRoles select={0}/>
            <Form method={mode} className="form-create-jobs">
                <APIComponent url="/job" APIClass={APIcreateJob} events={{}}/>
                <FormItem name="Se busca:" idInput="name" />
                <FormItem name="Descripción:" type="textarea" idInput="description" />
                <FormItem name="Requerimientos:" type="textarea" idInput="req" />
                <FormItem name="Zona:" type="textarea" idInput="zona" />
                
                <FormItem name="Tipo de contratacion" type="select" idInput="tipoContratacion">
                    <option value="Contratado" selected="selected"/>
                    <option value="Planta Permanente"/>
                </FormItem>
                <FormItem name="Tipo de contrato" type="select" idInput="tipoContrato" style={{ visibility: true ? "visible " : "hidden" }}>
                {ApplicationContrato.map(
                        (element, index) =>
                            <option key={`option-${index}`} value={element.code} selected={(element.code===selectStatus)?"selected":undefined}>{element.title}</option>
                    )}
                </FormItem>
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
                <Button className='back-button' size="lg" href="/offerJob/" color="secondary">Volver a Busquedas Laborales</Button>  
            </div>

        </Container>
        }
        </>);
}

RutaTutorial.get("CreateJob")
    .setDescription(<>Crea una Busqueda laboral para tu empresa</>)
    .setRender(ViewCreateOfferJob)
    .addRequisito('haveEmpresa')
    .setMeta("Crear Busqueda")
    .setInstrucciones(<>Rellena los datos pedidos</>);