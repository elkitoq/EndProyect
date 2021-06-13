import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FormGroup, Container, Row, Col, Button } from 'reactstrap'
import { Form } from '../Components/Form.js';
import { FormItem } from '../Components/FormItem.js';
import API from '../Tools/API.js';


export const ViewRegister = () => {

    const [, setCookie] = useCookies(['isLogin']);

    const api = new API('/user', useState({}), "response",useState({}), "info")

    api.changeInfo= (newValue) => {
        if (newValue.error)
            alert(newValue.error);
        if (newValue.isLogin){
            setCookie("isLogin", true, { path: '/' });
        }
    }

    return (
        <Container className="themed-container">
            <Row>
                <Col sm="12" md={{ size: 4, offset: 4 }}>
                    <Form api={api} method="put" className="form-container">
                        <FormItem name="Usuario" idInput="name" required/>
                        <FormItem name="Password" type="password" minLength={8} idInput="password" required/>
                        <FormItem name="Repetir Password" type="password" idInput="password2" required/>
                        <FormItem name="Email" type="email" idInput="email" required/>
                        <FormGroup className="separado">
                            <Button size="lg" color="primary" blocks="true">Crear</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
