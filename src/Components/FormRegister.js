import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FormGroup, Button, Label } from 'reactstrap'
import { Form } from '../Components/Form.js';
import { FormItem } from '../Components/FormItem.js';
import API from '../Tools/API.js';


export const FormRegister = () => {

    const [, setCookie] = useCookies(['isLogin']);

    const api = new API('/user', useState({}), "response", useState({}), "info")

    api.changeInfo = (newValue) => {
        if (newValue.error)
            alert(newValue.error);
        if (newValue.isLogin) {
            setCookie("isLogin", true, { path: '/' });
        }
    }

    return (
        <Form api={api} method="put" className="form-container">
            <FormItem name="Usuario" idInput="name" required />
            <FormItem name="Password" type="password" minLength={4} idInput="password" required />
            <FormItem name="Repetir Password" type="password" idInput="password2" required />
            <FormItem name="Email" type="email" idInput="email" required />
            <FormGroup className="separado">
                <Button size="lg" color="primary" blocks="true">Crear</Button>
                <Label style={{marginLeft:"5rem"}}>
                    ¿Ya tenes cuenta? <a className="a-register" href="/Login/">Logea acá</a>
                </Label>
            </FormGroup>
        </Form>
    )
}
