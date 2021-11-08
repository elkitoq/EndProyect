import { ButtonFacebook } from '../Components/ButtonFacebook';
import { ButtonGoogle } from '../Components/ButtonGoogle';
import { BoxLoginRecoveryPass } from '../Components/BoxLoginRecoveryPass'
import { Form } from './Form';
import API, { APIComponent } from '../Tools/API';
import { Button, FormGroup, Label } from 'reactstrap';
import { FormItem } from './FormItem';
import { ViewCreateUser } from '../Views/ViewCreateUser';
import { useState } from 'react';

// import { Form, Input } from 'reactstrap'


export const FormLogin = ({showRegister}) => {

    // const [datos, setdatos] = useState({
    //     user: '',
    //     password: ''
    // })

    // const handleInputChange = (event) => {
    //     setdatos({
    //         ...datos,
    //         [event.target.name]: event.target.value
    //     })
    // }

    const submit = (event) => {
        // event.preventDefault()
        // //aqui iria la llamada al server
        // console.log(datos)

    }

    const [register,setRegister] = useState(showRegister||false)
   
   

    return (<>{register?<ViewCreateUser showRegister={setRegister}/>:
        <Form className="form-container" onSubmit={submit}>
            <APIComponent url='/login'/>

            {/* <FormGroup>
                <Label for="userInput">Usuario</Label>
                <Input type="text" id="userInput" name="user" onChange={handleInputChange} className="form-control" />
            </FormGroup>

            <FormGroup>
                <Label for="userPassword">Password</Label>
                <Input type="password" id="userPassword" name="password" autoComplete="off" onChange={handleInputChange} className="form-control" />
            </FormGroup> */}

            <FormItem name="Usuario" idInput="name" />
            <FormItem name="Password" type="password" idInput="password" />

            <FormGroup className="separado">
                <Button className='button-submit' size="lg" color="primary" type="submit" block>Login</Button>
            </FormGroup>

            <ButtonFacebook />

            <ButtonGoogle />


            <BoxLoginRecoveryPass />

            <FormGroup className="label-register">
                <Label >
                    ¿No tenes cuenta todavía? <a className="a-register" href="#" onClick={
                        ()=>{setRegister(true)}
                    }>Regístrate  acá</a>
                </Label>
            </FormGroup>
        </Form>}</>
    )
}