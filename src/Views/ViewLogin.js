import { useState } from 'react'
import { Form, FormGroup, Container, Row, Col, Button, Input, Label } from 'reactstrap'
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import '../Assets/Css/login.css'



export const ViewLogin = () => {

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

    const responseFacebook = (response) => {
        console.log(response.name, response.email, response.picture.data.url);

    }

    // const componentClicked = () => {
    //     //se agregaria informacion a la cookie 
    // }

    const responseGoogle = (response) => {
        console.log(response)
        console.log(response.profileObj)
        //se agregaria informacion a la cookie usando el response.profileObj que da mas datos sobre el usuario
    }

    return (
        <Container className="themed-container">
            <Row className="row-login">
                <Col className="column" sm="12" md={{ size: 4, offset: 4 }}>
                    <Form className="form-container" onSubmit={submit}>

                        <FormGroup>
                            <Label for="userInput">Usuario</Label>
                            <Input type="text" id="userInput" name="user" onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userPassword">Password</Label>
                            <Input type="password" id="userPassword" name="password" autoComplete="off" onChange={handleInputChange} className="form-control" />
                        </FormGroup>
                        <div>
                            <FacebookLogin
                                appId="323151842756210"
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={responseFacebook}
                                cssClass="my-facebook-button-class"
                                icon="fa-facebook"
                                size="medium"
                                textButton="acebook"

                            />
                            <GoogleLogin
                                className="butonLoginGoogle"
                                clientId="1095958975836-nnf32pq1spueun0hcgmjajiaf3q5s39s.apps.googleusercontent.com"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                theme="ligh"
                                buttonText="Login"
                            />
                        </div>
                        <FormGroup>
                            <Button className='button-submit' size="lg" color="primary" type="submit">Login</Button>
                        </FormGroup>
                    </Form>

                </Col>
            </Row>
        </Container>
    )
}

