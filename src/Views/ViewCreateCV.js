import { Form, FormGroup, Container, Row, Col } from 'reactstrap'
import { Button } from 'reactstrap'
import { Input } from 'reactstrap'
import { ViewAddCVData } from './ViewAddCVData'
import '../Assets/Css/cargarCV.css';
import { FormItem } from '../Components/FormItem'
import noPhoto from '../Assets/image/blank-profile.png'
import { useState } from 'react';

let displayChargePhoto,setDisplayChargePhoto;

export const ViewCreateCV = () => {
    [displayChargePhoto,setDisplayChargePhoto] = useState("block");
    return (
        <Container>
            <Form onSubmit={guardarCambios}>
                <Row className="separado">
                    <Row>
                        <Col xs="4" sm="4" md="4" lg={{ size: 3, offset: 1 }}>
                            <img src={noPhoto} className="foto-perfil" id="fotoPerfil" onClick={cargarFotoPerfil} alt="Cargar de perfil" style={{cursor: 'pointer'}}/>
                            <div style={{display: displayChargePhoto}}>Clik en la imagen para cambiarla</div>
                            <Input type="file" id="cargarImagen" onChange={mostrarFotoPerfil} />
                        </Col>
                        <Col md="8">
                            <Row md="2">
                                <FormItem name="Nombre" />
                                <FormItem name="Apellido" />
                            </Row>
                            <Row>
                                <FormItem name="Direccion" />
                            </Row>
                            <Row  md="2">
                                <FormItem name="Distrito" />
                                <FormItem name="Codigo Postal" />
                            </Row>
                            <Row>
                                <FormItem name="Telefono" type="number"/>
                            </Row>
                            <Row>
                                <FormItem name="E-Mail" type="email"/>
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
            setDisplayChargePhoto("none");
        }
    }
}

const guardarCambios = (event) => {
    event.preventDefault();
}