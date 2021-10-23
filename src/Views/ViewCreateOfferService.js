import { Button, Container, Input } from "reactstrap";
import { Form } from "../Components/Form";
import { FormItem } from "../Components/FormItem";
import API, { APIComponent } from "../Tools/API";
import { Status } from "../Tools/Status";
import { useContext, useState } from "react";
import { ViewOfferService } from "./ViewOfferService";
import RutaTutorial from "../Components/tutorial";
import { useLocation } from "react-router";


export const ViewCreateOfferService = ({ mode = "put",id}) => {


    const status = useContext(Status.Context)
    const [selectRole,] = status.use('selectRole');
    
    const { search } = useLocation();
    const getJson = API.getSearchParam(search);

    id = id || getJson.service
    
    const [saved,setSaved] = useState(false)


    API.on(API.events.MOUNT,
        (api)=>{
            if(api.id==='/service'){
            api.setData({status:0})
            if (id)
            api.get({id})//.then((res)=>(res.data && res.data.response)?setStatus(res.data.response.status):"");
        }
        },
        'CreateJob')


    API.on(API.events.CHANGEINFO,(api)=>{
        if(api.id==='/service'){
        if (mode==="put") 
        setSaved(api.getHookInfo().saved)}
    },'CreateService')

    return (<>
        {saved?<ViewOfferService/>:
        <Container className="container-form">
            <Form method="put" className="form">
                <APIComponent url="/service" />
                <FormItem name="Ofrezco:" idInput="name" />
                <FormItem name="Description" type="textarea" idInput="description" />
                <FormItem name="Precio" idInput="price" />
                <Input name="role" type="hidden" defaultValue={selectRole} />
                <Button className='button-submit' href="/offerService" onClick={()=>API.get('/service').put()} size="lg" color="primary" type="submit" block>Enviar</Button>
            </Form>
        </Container>
        }</>);
}

RutaTutorial.get("CreateService")
    .setDescription(<>Crea un servicio para ofrecerlo</>)
    .setRender(ViewCreateOfferService)
    .addRequisito("haveAutonomo")
    .setMeta("Crear Servicio")
    .setInstrucciones(<>Rellena los datos pedidos</>);