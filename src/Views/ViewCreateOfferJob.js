import { useState } from "react";
import { useCookies } from "react-cookie";
import { Button, Container, Input } from "reactstrap";
import { Form } from "../Components/Form";
import { FormItem } from "../Components/FormItem";
import API, { APIComponent } from "../Tools/API";



export const ViewCreateOfferJob = () => {

    const [cookies] = useCookies(['selectRole'])

    return (
        <Container>
            <Form method="put">
                <APIComponent url="/job"/>
                <FormItem name="Se busca:" idInput="name" />
                <FormItem name="Descripción" type="textarea" idInput="description" />
                <FormItem name="Requerimientos" type="textarea" idInput="req" />
                <Input name="role" type="hidden" defaultValue={cookies.selectRole} />
                <Button className='button-submit' size="lg" color="primary" type="submit" block>Enviar</Button>
            </Form>
        </Container>);
}