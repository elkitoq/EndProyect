import React from 'react';
import { BoxLoginRecoveryPass } from '../Components/BoxLoginRecoveryPass';
import { useState } from 'react';
import { Container, Row, Col, FormGroup, Button } from 'reactstrap';
import { Form } from '../Components/Form.js';
import { FormItem } from '../Components/FormItem.js';
import API from '../Tools/API';

export const ViewRecoverPassword = () => {
   
const api = new API('/recovery-pass', useState({}), "response",useState({}), "info")

return (
    <Container className="themed-container">
        <Row>
            <Col sm="12" md={{ size: 4, offset: 4 }}>
                <Form api={api} method="post">
                    <FormItem name="Usuario" idInput="name"/>
                    <FormItem name="Email" idInput="email"/>
                    <FormGroup className="separado">
                        <Button size="lg" color="primary" blocks="true">Crear</Button>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
    </Container>
)
}
