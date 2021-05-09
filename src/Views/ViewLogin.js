import { Form, FormGroup, Container, Row, Col } from 'reactstrap'
import { Buttons } from '../Components/Buttons.js'
import { Inputs } from '../Components/Inputs.js'
import { Labels } from '../Components/Labels.js'

export const ViewLogin = () => {
    return (
        <Container className="themed-container">
            <Row>
                <Col sm="12" md={{ size: 4, offset: 4 }}>
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
                            <Buttons name="Login" size="lg" color="primary" blocks="true"></Buttons>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}