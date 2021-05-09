import { Form, FormGroup, Container } from 'reactstrap'
import { Buttons } from '../Components/Buttons.js'
import { Inputs } from '../Components/Inputs.js'
import { Labels } from '../Components/Labels.js'

export const ViewLogin = () => {
    return (
        <Container>
            <Form>
                <FormGroup>
                    <Labels name="Usuario"></Labels>
                    <Inputs classname="inputUser" />
                </FormGroup>
                <FormGroup>
                    <Labels name="Password"></Labels>
                    <Inputs type="password" classname="inputPassword"></Inputs>
                </FormGroup>
                <FormGroup>
                    <Buttons name="Login" size="lg" color="primary"></Buttons>
                </FormGroup>
            </Form>
        </Container>
    )
}