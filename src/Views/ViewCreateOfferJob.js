import { useState } from "react";
import { Button, Container, Input } from "reactstrap";
import { Form } from "../Components/Form";
import { FormItem } from "../Components/FormItem";
import API, { APIComponent } from "../Tools/API";
import { Status } from "../Tools/Status";
import { useContext } from "react";
import { ApplicationStatus } from "../Server/models/ApplicationStatus";


export const ViewCreateOfferJob = ({ mode = "put",id}) => {

    const status = useContext(Status.Context)
    const [selectRole,] = status.use('selectRole');

    class APIcreateJob extends API{
        didMount = ()=>{
            this.get({id});
        }
    } 

    return (
        <Container>
            <Form method={mode}>
                <APIComponent url="/job" APIClass={APIcreateJob} events={{}}/>
                <FormItem name="Se busca:" idInput="name" />
                <FormItem name="Descripción" type="textarea" idInput="description" />
                <FormItem name="Requerimientos" type="textarea" idInput="req" />
                <FormItem name="Estado" type="select" idInput="status">
                    {ApplicationStatus.map(
                        (element, index) =>
                            <option key={`option-${index}`} value={element.code}>{element.title}</option>
                    )}
                </FormItem>
                <Input name="role" type="hidden" defaultValue={selectRole} />
                <Button className='button-submit' size="lg" color="primary" type="submit" block>{mode==="put"?"Enviar":"Guardar"}</Button>
            </Form>
        </Container>);
}