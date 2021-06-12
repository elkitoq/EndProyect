import { useState } from 'react'
import { ButtonFacebook } from '../Components/ButtonFacebook';
import { ButtonGoogle } from '../Components/ButtonGoogle';
import { BoxLoginRecoveryPass } from '../Components/BoxLoginRecoveryPass'
import { Form } from './Form';
import API from '../Tools/API';
import { Button, FormGroup, Label } from 'reactstrap';
import { FormItem } from './FormItem';
import { useCookies } from 'react-cookie';
// import { Form, Input } from 'reactstrap'


export const FormLogin = () => {

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

    const [, setCookie] = useCookies(['isLogin']);

    const api = new API('/login', useState({}), "response", useState({}), "info")
    
    api.changeInfo= (newValue) => {
        if (newValue.error)
            alert(newValue.error);
        if (newValue.isLogin) {
            setCookie("isLogin", true, { path: '/' });
        }
    }

    return (
        <Form className="form-container" onSubmit={submit} api={api}>

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


            <ButtonFacebook />

            <ButtonGoogle />

            <FormGroup className="separado">
                <Button className='button-submit' size="lg" color="primary" type="submit" block>Login</Button>
            </FormGroup>

            <BoxLoginRecoveryPass />

            <FormGroup className="label-register">
                <Label >
                    No tenes cuenta todavia? <a className="a-register" href="/Register/">Registrate aca</a>
                </Label>
            </FormGroup>
        </Form>
    )
}