import { FormGroup, Button, Label } from 'reactstrap'
import { Form } from '../Components/Form.js';
import { FormItem } from '../Components/FormItem.js';
import { APIComponent} from '../Tools/API.js';


export const FormRegister = ({showRegister}) => 
        <Form method="put" className="form-container">
            <APIComponent url='/user' />
            <FormItem name="Usuario" idInput="name" required />
            <FormItem name="Password" type="password" minLength={4} idInput="password" required />
            <FormItem name="Repetir Password" type="password" idInput="password2" required />
            <FormItem name="Email" type="email" idInput="email" required />
            <FormGroup className="separado">
                <Button className="buton-create-user" size="lg" color="primary" blocks="true">Crear</Button>
                <Label className="label-login" >
                    ¿Ya tenes cuenta? <a className="a-register" href="#" onClick={()=>{showRegister(false)}}>Logea acá</a>
                </Label>
            </FormGroup>
        </Form>
