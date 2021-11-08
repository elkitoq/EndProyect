import '../Assets/Css/profile.css';
import { useState, useEffect } from "react";
import { Container, Card, Button, CardTitle, CardText, Col, Input, Form, FormGroup } from "reactstrap";
import noPhoto from '../Assets/image/blank-profile.png';
import AlignItemsList from '../Components/AlignItemsList';
let displayChargePhoto, setDisplayChargePhoto;



export const ViewCompanyProfile = () => {

    [displayChargePhoto, setDisplayChargePhoto] = useState("block");

    return (
        <Container>
            <Form>
                <Card xs="4" sm="4" md="4" lg={{ size: 3, offset: 1 }} className="foto">

                
                    <FormGroup>
                        <Col xs="4" sm="4" md="4" lg={{ size: 5, offset: 3 }}>    
                        <Input type="file" id="cargarImagen" onChange={mostrarFotoPerfil} />
                        <img src={noPhoto} className="foto-perfil" id="fotoPerfil" onClick={cargarFotoPerfil} alt="Cargar de perfil" style={{ cursor: 'pointer'}}  />
                        <div style={{ display: displayChargePhoto }}>IMAGEN</div>
                        </Col>
                    </FormGroup>
                

                </Card>
            </Form>
            <div>
                <Card body className="text-center-2">
                    <CardTitle tag="h5">Acerca de</CardTitle>
                    <CardText><h6>Industria</h6></CardText>
                    <CardText><h6>Tipo</h6></CardText>
                </Card>
            </div>
            <div>
                <Card body className="text-center-2">
                    <CardTitle tag="h5">Descripción</CardTitle>
                    <CardText><h6></h6></CardText>
                </Card>
            </div>
            <div>
                <Card body className="text-center-2">
                    <CardTitle tag="h5">Relacionados</CardTitle>
                    <AlignItemsList />
                </Card>
            </div>
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
