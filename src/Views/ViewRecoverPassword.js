import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, FormGroup, Button, Input } from 'reactstrap';
import { Form } from '../Components/Form.js';
import { FormItem } from '../Components/FormItem.js';
import API from '../Tools/API';

export const ViewRecoverPassword = () => {

    const { search } = useLocation();
    const getJson = API.getSearchParam(search);

    const api = new API('/recovery-pass', useState({}), "response", useState({}), "info")

    api.changeInfo = (info) => {
        if (info.error)
            alert(info.error)
        if (info.message)
            alert(info.message)
    }




    return (
        <Container className="themed-container">
            <Row>
                <Col sm="12" md={{ size: 4, offset: 4 }}>
                    {getJson.code ?
                        <Form api={api} method="put" className="form-container">
                            <FormItem name="Contraseña" type="password" idInput="password" minLength={4} required />
                            <FormItem name="Repetir Contraseña" type="password" idInput="password2" required />
                            <Input type="hidden" name="user" defaultValue={getJson.user} />
                            <Input type="hidden" name="code" defaultValue={getJson.code} />
                            <FormGroup className="separado">
                                <Button size="lg" color="primary" blocks="true">Cambiar Contraseña</Button>
                            </FormGroup>
                        </Form> :
                        <Form api={api} method="post" className="form-container">
                            <FormItem name="Usuario" idInput="name" />
                            <FormItem name="Email" type="email" idInput="email" />
                            <Input name="clientUrl" type="hidden" defaultValue={window.location.host} />
                            <FormGroup className="separado">
                                <Button size="lg" color="primary" blocks="true">Solicitar</Button>
                            </FormGroup>
                        </Form>}
                </Col>
            </Row>
        </Container>
    )
}


export const ViewRecoverPassword2 = () => {

    const api = new API('/recovery-pass', useState({}), "response", useState({}), "info")

    const { search } = useLocation();
    const getJson = API.getSearchParam(search);

    return (
        <Container className="themed-container">
            <Row>
                <Col sm="12" md={{ size: 4, offset: 4 }}>
                    {getJson.code ?
                        <Form api={api} method="put" className="form-container">asd
                            <FormItem name="Contraseña" type="password" idInput="password" minLength={4} required />
                            <FormItem name="Repetir Contraseña" type="password" idInput="password2" required />
                            <FormGroup className="separado">
                                <Button size="lg" color="primary" blocks="true">Cambiar Contraseña</Button>
                            </FormGroup>
                        </Form>
                        :
                        <Form api={api} method="post" className="form-container">
                            <FormItem name="Usuario" idInput="name" />
                            <FormItem name="Email" type="email" idInput="email" defaultValue="rey.cristian.eze@gmail.com"/>
                            <FormGroup className="separado">
                                <Button size="lg" color="primary" blocks="true">Solicitar</Button>
                            </FormGroup>
                        </Form>
                    }
                </Col>
            </Row>
        </Container>
    )
}