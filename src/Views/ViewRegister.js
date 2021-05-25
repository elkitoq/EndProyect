import { useCookies } from 'react-cookie';
import { Form, FormGroup, Container, Row, Col, Button } from 'reactstrap'
import { FormItem } from '../Components/FormItem.js';


export const ViewRegister = () => {

    const [, setCookie] = useCookies(['isLogin']);
    return (
        <Container className="themed-container">
            <Row>
                <Col sm="12" md={{ size: 4, offset: 4 }}>
                    <Form onSubmit={guardarCambios.bind(this, setCookie)}>
                        <FormItem name="Usuario" />
                        <FormItem name="Password" type="password" />
                        <FormItem name="Repetir Password" type="password" />
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
    setCookie("isLogin", true, { path: '/' });
}