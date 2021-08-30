import { Button, Container, Input } from "reactstrap";
import { Form } from "../Components/Form";
import { FormItem } from "../Components/FormItem";
import { APIComponent } from "../Tools/API";
import { Status } from "../Tools/Status";
import { useContext } from "react";


export const ViewCreateOfferService = () => {


    const status = useContext(Status.Context)
    const [selectRole,] = status.use('selectRole');

    return (
        <Container>
            <Form method="put">
                <APIComponent url="/service" /> 
                <FormItem name="Ofrezco:" idInput="name" />
                <FormItem name="Description" type="textarea" idInput="description" />
                <FormItem name="Precio" idInput="price" />
                <Input name="role" type="hidden" defaultValue={selectRole} />
                <Button className='button-submit' size="lg" color="primary" type="submit" block>Enviar</Button>
            </Form>
        </Container>);
}