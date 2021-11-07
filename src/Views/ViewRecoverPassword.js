import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, FormGroup, Button, Input } from 'reactstrap';
import { Form } from '../Components/Form.js';
import { FormItem } from '../Components/FormItem.js';
import API, { APIComponent } from '../Tools/API';




export const ViewRecoverPassword = () => {

    const { search } = useLocation();
    const getJson = API.getSearchParam(search);

    const [error,setError]=useState(false)
    
    const [update,updater]=useState(1);
    API.updater('/recovery-pass',updater)

    if (API.get("/recovery-pass")){
        var info = API.get("/recovery-pass").getHookInfo()
        if (info.error){
            if (!error)setError(true);}
        else if (info.message)
            if (error!=='ok')setError("ok");
    }
    
    console.log(error);

    document.error = error
    document.setError = setError

    document.updater=updater

    return <>{getJson.code ?
                        <Form method="put" className="form-container">
                            <APIComponent url="/recovery-pass" /> 
                            <h3>Cambiar contraseña:</h3>
                            <FormItem name="Contraseña" type="password" idInput="password" minLength={4} required />
                            <FormItem name="Repetir Contraseña" type="password" idInput="password2" required />
                            <Input type="hidden" name="user" defaultValue={getJson.user} />
                            <Input type="hidden" name="code" defaultValue={getJson.code} />
                            <FormGroup className="separado">
                                {error===true?<Button size="lg" color="primary" blocks="true" href="/recovery-pass">Volver a Solicitar</Button>:""}
                                {error==="ok"?<Button size="lg" color="primary" blocks="true" href="/login">Volver a Login</Button>
                                :<Button size="lg" color="primary" blocks="true">Cambiar Contraseña</Button>}
                            </FormGroup>
                        </Form> :
                        <Form method="post" className="form-container">
                            <APIComponent url="/recovery-pass"/> 
                            <h3>Recuperar Contraseña:</h3>
                            <FormItem name="Usuario" idInput="name" />
                            <FormItem name="Email" type="email" idInput="email" />
                            <Input name="clientUrl" type="hidden" defaultValue={window.location.host} />
                            <FormGroup className="separado">
                                <Button size="lg" color="primary" blocks="true">Solicitar cambio de Contraseña</Button>
                            </FormGroup>
                        </Form>}</>
}


export const ViewRecoverPassword2 = () => {

    const { search } = useLocation();
    const getJson = API.getSearchParam(search);

    return (
        <Container className="themed-container">
            <Row>
                <Col sm="12" md={{ size: 4, offset: 4 }}>
                    {getJson.code ?
                        <Form method="put" className="form-container">
                            <APIComponent url='/recovery-pass' />
                            <FormItem name="Contraseña" type="password" idInput="password" minLength={4} required />
                            <FormItem name="Repetir Contraseña" type="password" idInput="password2" required />
                            <FormGroup className="separado">
                                <Button size="lg" color="primary" blocks="true">Cambiar Contraseña</Button>
                            </FormGroup>
                        </Form>
                        :
                        <Form method="post" className="form-container">
                            <APIComponent url='/recovery-pass' />
                            <FormItem name="Usuario" idInput="name" />
                            <FormItem name="Email" type="email" idInput="email"/>
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

