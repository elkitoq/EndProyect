import { FormGroup, Button, Label } from 'reactstrap'
import { Form } from '../Components/Form.js';
import { FormItem } from '../Components/FormItem.js';
import API, { APIComponent} from '../Tools/API.js';
import { Status } from "../Tools/Status";
import { useContext } from "react";

export const FormRegister = () => {

    const status = useContext(Status.Context)
    
    class APILogin extends API{
        changeInfo= (newValue) => {
                if (newValue.error)
                    alert(newValue.error);
                if (newValue.isLogin) {
                    status.set("Login")
                }
            }
    } 

    return (
        <Form method="put" className="form-container">
            <APIComponent url='/user' APIClass={APILogin}/>
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
