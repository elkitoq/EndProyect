




import { useCookies } from 'react-cookie';
import { Form, FormGroup, Container, Row, Col, Button } from 'reactstrap'
import { Inputs } from '../Components/Inputs.js'
import { Labels } from '../Components/Labels.js'

export const ViewRegister = () => {

    const [, setCookie] = useCookies(['isLogin']);
    return (
        <Container className="themed-container">
            <Row>
                <Col sm="12" md={{ size: 4, offset: 4 }}>
                    <Form onSubmit={guardarCambios.bind(this,setCookie)}>
                        <FormGroup>
                            <Labels name="Usuario"></Labels>
                            <Inputs classname="inputUser" />
                        </FormGroup>
                        <FormGroup>
                            <Labels name="Password"></Labels>
                            <Inputs type="password" classname="inputPassword" autoComplete="off"></Inputs>
                        </FormGroup>
                        <FormGroup>
                            <Labels name="Repetir Password"></Labels>
                            <Inputs type="password" classname="inputPassword" autoComplete="off"></Inputs>
                        </FormGroup>
                        <FormGroup className="separado">
                            <Button size="lg" color="primary" blocks="true">Crear</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

const guardarCambios = (setCookie, event) => {
    event.preventDefault();
    setCookie("isLogin",true,{ path: '/' });
}