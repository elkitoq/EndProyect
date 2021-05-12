import { Form, FormGroup, Container, Row, Col, Button, Input, Label } from 'reactstrap'
import md5 from 'md5'


export const ViewLogin = () => {

    const getUserData = () => {
        let user = document.getElementById('userInput').value
        let userPass = md5(document.getElementById('userPassword').value)
        console.log(user, userPass)
    }

    return (
        <Container className="themed-container">
            <Row>
                <Col sm="12" md={{ size: 4, offset: 4 }}>
                    <Form className="form-container">
                        <FormGroup>
                            <Label for="userInput">Usuario</Label>
                            <Input type="text" id="userInput" className="inputUser" name="user" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userPassword">Password</Label>
                            <Input type="password" id="userPassword" className="form-control" name="password" />
                        </FormGroup>
                        <FormGroup>
                            <Button size="lg" color="primary" onClick={getUserData}>Login</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

