import { useState } from 'react'
import { ButtonFacebook } from '../Components/ButtonFacebook';
import { ButtonGoogle } from '../Components/ButtonGoogle';
import { BoxLoginRecoveryPass } from '../Components/BoxLoginRecoveryPass'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export const FormLogin = () => {

    const [datos, setdatos] = useState({
        user: '',
        password: ''
    })

    const handleInputChange = (event) => {
        setdatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const submit = (event) => {
        event.preventDefault()
        //aqui iria la llamada al server
        console.log(datos)

    }

    return (
        <Form className="form-container" onSubmit={submit}>

            <FormGroup>
                <Label for="userInput">Usuario</Label>
                <Input type="text" id="userInput" name="user" onChange={handleInputChange} />
            </FormGroup>

            <FormGroup>
                <Label for="userPassword">Password</Label>
                <Input type="password" id="userPassword" name="password" autoComplete="off" onChange={handleInputChange} className="form-control" />
            </FormGroup>

            <ButtonFacebook />

            <ButtonGoogle />

            <FormGroup>
                <Button className='button-submit' size="lg" color="primary" type="submit" block>Login</Button>
            </FormGroup>

            <BoxLoginRecoveryPass />

            <FormGroup className="label-register">
                <Label >
                    No tenes cuenta todavia? <a className="a-register" href="http://localhost:3000/Register/">Registrate aca</a>
                </Label>
            </FormGroup>

        </Form>
    )
}