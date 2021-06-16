import { useState } from "react";
import { useCookies } from "react-cookie";
import { Button, Container, Input } from "reactstrap";
import { Form } from "../Components/Form";
import { FormItem } from "../Components/FormItem";
import API from "../Tools/API";



export const ViewCreateOfferJob = () => {

    const [cookies] = useCookies(['selectRole'])

    return (
        <Container>
            <Form api={new API("/job", useState({}), "response", useState({}), "info")} method="put">
                <FormItem name="Se busca:" idInput="name" />
                <FormItem name="Descripion" type="textarea" idInput="description" />
                <FormItem name="Requerimientos" type="textarea" idInput="req" />
                <Input name="role" type="hidden" defaultValue={cookies.selectRole} />
                <Button className='button-submit' size="lg" color="primary" type="submit" block>Enviar</Button>
            </Form>
        </Container>);
}