import { useState } from 'react'
import { Form, FormGroup, Container, Row, Col, Button, Input, Label } from 'reactstrap'
import md5 from 'md5'


export const ViewLogin = () => {

    const [datos, setdatos] = useState({
        user: '',
        password: ''
    })

    const handleInputChange = (event) => {
        setdatos({
            [event.target.name]: event.target.value
        })
    }

    const submit = (event) => {
        event.preventDefault()
        //aqui iria la llamada al server
        console.log(datos)

    }

    return (
        <Container className="themed-container">
            <Row>
                <Col sm="12" md={{ size: 4, offset: 4 }}>
                    <Form className="form-container" onSubmit={submit}>
                        <FormGroup>
                            <Label for="userInput">Usuario</Label>
                            <Input type="text" id="userInput" name="user" onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userPassword">Password</Label>
                            <Input type="password" id="userPassword" name="password" onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Button size="lg" color="primary" type="submit">Login</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

