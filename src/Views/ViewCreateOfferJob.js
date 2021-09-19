import { useState } from "react";
import { Button, Container, Input } from "reactstrap";
import { Form } from "../Components/Form";
import { FormItem } from "../Components/FormItem";
import API, { APIComponent } from "../Tools/API";
import { Status } from "../Tools/Status";
import { useContext } from "react";
import { ApplicationStatus } from "../Server/models/ApplicationStatus";
import RutaTutorial from "../Components/tutorial";
import { ViewOfferJob } from "./ViewOfferJob";

export const ViewCreateOfferJob = ({ mode = "put",id}) => {

    const status = useContext(Status.Context)
    const [selectRole,] = status.use('selectRole');
    const [selectStatus,setStatus]= useState(0)

    const [saved,setSaved] = useState(false)

    class APIcreateJob extends API{
        didMount = ()=>{
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

    return (
        <>
        {saved?<ViewOfferJob/>:
        <Container >
            <Form method={mode}>
                <APIComponent url="/job" APIClass={APIcreateJob} events={{}}/>
                <FormItem name="Se busca:" idInput="name" />
                <FormItem name="Descripción" type="textarea" idInput="description" />
                <FormItem name="Requerimientos" type="textarea" idInput="req" />
                <FormItem name="Estado" type="select" idInput="status">
                    {ApplicationStatus.map(
                        (element, index) =>
                            <option key={`option-${index}`} value={element.code} selected={(element.code===selectStatus)?"selected":undefined}>{element.title}</option>
                    )}
                </FormItem>
                <Input name="role" type="hidden" defaultValue={selectRole} />
                <Button className='button-submit separado' size="lg" color="primary" type="submit" block>{mode==="put"?"Enviar":"Guardar"}</Button>
            </Form>
                <Button className='separado' size="lg" color="primary" href="/offerJob/">Volver a Busquedas Laborales</Button>      
        </Container>
        }
        </>);
}

RutaTutorial.get("CreateJob")
    .setDescription(<>Crea una Busqueda laboral para tu empresa</>)
    .setRender(ViewCreateOfferJob)
    .setMeta("Crear Busqueda")
    .setInstrucciones(<>Rellena los datos pedidos</>);