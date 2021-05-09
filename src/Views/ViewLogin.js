import { Form, FormGroup } from 'reactstrap'
import { Buttons } from '../Components/Buttons.js'
import { Inputs } from '../Components/Inputs.js'
import { Labels } from '../Components/Labels.js'

export const ViewLogin = () => {
    return (
        <Form>
            <FormGroup>
                <Labels name="Usuario"></Labels>
                <Inputs classname="inputUser" />
            </FormGroup>
            <FormGroup>
                <Labels name="Password"></Labels>
                <Inputs type="password" classname="inputPassword"></Inputs>
            </FormGroup>
        </Form>
    )
}