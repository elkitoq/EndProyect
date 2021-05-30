import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FormGroup, Container, Row, Col, Button } from 'reactstrap'
import { Form } from '../Components/Form.js';
import { FormItem } from '../Components/FormItem.js';
import API from '../Tools/API.js';


export const ViewRegister = () => {

    const [, setCookie] = useCookies(['isLogin']);

    const api = new API('/user',useState({}))

    return (
        <Container className="themed-container">
            <Row>
                <Col sm="12" md={{ size: 4, offset: 4 }}>
                    <Form onSubmit={guardarCambios.bind(this, setCookie)} api={api}>
                        <FormItem name="Usuario" />
                        <FormItem name="Password" type="password" />
                        <FormItem name="Repetir Password" type="password" />
                        <FormItem name="Email" />
                        <FormGroup className="separado">
                            <FormItem name="otro dato" />
                            <Button size="lg" color="primary" blocks="true">Crear</Button>
                        </FormGroup>
                    </Form>
                    {JSON.stringify(api.getHookData())}
                </Col>
            </Row>
        </Container>
    )
}

const guardarCambios = (setCookie) => {
    setCookie("isLogin", true, { path: '/' });
}