import { Form, FormGroup, Container, Row, Col } from 'reactstrap'
import { Button } from 'reactstrap'
import { Input } from 'reactstrap'
import { Labels } from '../Components/Labels'
import { ViewAddCVData } from './ViewAddCVData'
import '../style/generic.css';
import '../style/cargarCV.css';


export const ViewCreateCV = () => {
    return (
        <Container>
            <Form onSubmit={guardarCambios}>
                <Row className="separado">
                    <Row>
                        <Col xs="4" sm="4" md="4" lg={{ size: 3, offset: 1 }}>
                            <img src="./blank-profile.png" className="foto-perfil" id="fotoPerfil" onClick={cargarFotoPerfil} />
                            <Input type="hidden" name="MAX_FILE_SIZE" value="4" />
                            <Input type="file" id="cargarImagen" onChange={mostrarFotoPerfil} />
                        </Col>
                        <Col md="8">
                            <Row md="2">
                                <FormGroup>
                                    <Labels name="Nombre" />
                                    <Input className="input" />
                                </FormGroup>
                                <FormGroup>
                                    <Labels name="Apellido" />
                                    <Input className="input" />
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Labels name="Direccion" />
                                    <Input className="input" />
                                </FormGroup>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Labels name="Distrito" />
                                        <Input className="input" />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Labels name="Codigo Postal" />
                                        <Input className="input" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Labels name="Telefono" />
                                    <Input className="input" />
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Labels name="E-Mail" />
                                    <Input className="input" />
                                </FormGroup>
                            </Row>
                        </Col>
                    </Row>

                    <ViewAddCVData />
                    <Row className="separado">
                        <FormGroup>
                            <Button className="right" size="lg" color="primary">Guardar</Button>
                        </FormGroup>
                    </Row>
                </Row>
            </Form>


        </Container>
    )
}

const cargarFotoPerfil = () => {
    document.getElementById("cargarImagen").click();
}

const mostrarFotoPerfil = () => {
    var archivo = document.getElementById("cargarImagen").files[0];
    var reader = new FileReader();
    if (archivo) {
        reader.readAsDataURL(archivo);
        reader.onloadend = function () {
            document.getElementById("fotoPerfil").src = reader.result;
        }
    }
}

const guardarCambios = (event) => {
    event.preventDefault();
}