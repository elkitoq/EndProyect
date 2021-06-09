import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FormGroup, Container, Row, Col, Button } from 'reactstrap'
import { Form } from '../Components/Form.js';
import { FormItem } from '../Components/FormItem.js';
import API from '../Tools/API.js';


export const ViewRegister = () => {

    const [, setCookie] = useCookies(['isLogin']);

    const [info, setInfo] = useState({});

    const changeInfo = (newValue) => {
        setInfo(newValue);
        if (newValue.error)
            alert(newValue.error);
    }

    const api = new API('/user', useState({}), "response", [info, changeInfo], "info")
    console.log(api.getHookData());

    return (
        <Container className="themed-container">
            <Row>
                <Col sm="12" md={{ size: 4, offset: 4 }}>
                    <Form onSubmit={guardarCambios.bind(this, setCookie)} api={api} method="put">
                        <FormItem name="Usuario" idInput="name"/>
                        <FormItem name="Password" type="password" idInput="password"/>
                        <FormItem name="Repetir Password" type="password" idInput="password2"/>
                        <FormItem name="Email" idInput="email"/>
                        <FormGroup key="otros" className="separado">
                            <FormItem name="otro dato" />
                            <Button size="lg" color="primary" blocks="true">Crear</Button>
                        </FormGroup>
                    </Form>
                    {api.toString()}
                </Col>
            </Row>
        </Container>
    )
}

const guardarCambios = (setCookie) => {
    //setCookie("isLogin", true, { path: '/' });
}