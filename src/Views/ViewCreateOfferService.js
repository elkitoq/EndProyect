import { useState } from "react";
import { useCookies } from "react-cookie";
import { Button, Container, Input } from "reactstrap";
import { Form } from "../Components/Form";
import { FormItem } from "../Components/FormItem";
import API from "../Tools/API";



export const ViewCreateOfferService = () => {

    const [cookies] = useCookies(['selectRole'])

    return (
        <Container>
            <Form api={new API("/service", useState({}), "response", useState({}), "info")} method="put">
                <FormItem name="Ofrezco:" idInput="name" />
                <FormItem name="Description" type="textarea" idInput="description" />
                <FormItem name="Precio" idInput="price" />
                <Input name="role" type="hidden" defaultValue={cookies.selectRole} />
                <Button className='button-submit' size="lg" color="primary" type="submit" block>Enviar</Button>
            </Form>
        </Container>);
}