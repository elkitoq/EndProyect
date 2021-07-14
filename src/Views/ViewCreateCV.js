import { FormGroup, Container, Row, Col, Card, CardText, ButtonGroup } from 'reactstrap'
import { Button } from 'reactstrap'
import { Input } from 'reactstrap'
import { ViewAddCVData } from './ViewAddCVData'
import '../Assets/Css/cargarCV.css';
import { FormItem } from '../Components/FormItem'
import noPhoto from '../Assets/image/blank-profile.png'
import { useEffect, useState } from 'react';
import API, { APIComponent } from '../Tools/API.js';
import { Form } from '../Components/Form';
import { useCookies } from 'react-cookie';

let displayChargePhoto, setDisplayChargePhoto;

export const ViewCreateCV = () => {
    [displayChargePhoto, setDisplayChargePhoto] = useState("block");

    const [user] = useCookies(['selectUser']);

    const dataDefault = {
        "role":
            (user.selectUser && user.selectUser[user.selectRole] && aspirante(user.selectUser[user.selectRole])) ?
                user.selectRole :
                Array.isArray(user.selectUser) ?
                    user.selectUser.findIndex(aspirante).toString()
                    : 0
    }



    // useEffect(() => {
    //     api.get();

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    class APICV extends API {

        didMount = ()=>{
            this.get();
        }

    }


return (
    <Container>
        <Form method="put">
            <APIComponent 
                url='/cv' 
                APIClass={APICV}
                events={{}}
            />
            <Row className="separado">
                <FormGroup>
                    <Row>
                        <Col xs="4" sm="4" md="4" lg={{ size: 3, offset: 1 }}>
                            <img src={noPhoto} className="foto-perfil" id="fotoPerfil" onClick={cargarFotoPerfil} alt="Cargar de perfil" style={{ cursor: 'pointer' }} />
                            <div style={{ display: displayChargePhoto }}>Click en la imagen para cambiarla</div>
                            <Input type="file" id="cargarImagen" onChange={mostrarFotoPerfil} />
                        </Col>

                        <Col md="8">
                            <Row md="2">
                                <FormItem name="Nombre" idInput="name" />
                                <FormItem name="Apellido" idInput="lastName" />
                            </Row>
                            <Row>
                                <FormItem name="Dirección" idInput="address" />
                            </Row>
                            <Row md="2">
                                <FormItem name="Ciudad / Distrito" idInput="city" />
                                <FormItem name="Código Postal" idInput="cp" />
                            </Row>
                            <Row md="2">
                                <FormItem name="Edad" idInput="age" />
                                <FormItem name="Teléfono" type="number" idInput="phone" />
                            </Row>
                            <Row>
                                <FormItem name="E-Mail" type="email" idInput="email" />
                            </Row>
                        </Col>
                    </Row></FormGroup>

                <ViewAddCVData />
                <FormGroup>
                    <Row md="2" className="separado">
                        {(Array.isArray(user.selectUser) && user.selectUser.length && user.selectUser.find(aspirante)) ?
                            <FormItem type="select" name="El CV se guardará en:" idInput="role" defaultValue={dataDefault.role}>
                                {(Array.isArray(user.selectUser)) ? user.selectUser.map(
                                    (element, index) => aspirante(element) ?
                                        <option key={`option-${index}`} value={index}>{element.roleName}</option> : ""
                                ) : ""}
                            </FormItem>
                            : <LocalNoLoginCard isLogin={user.isLogin} />
                        }
                        <Button className="right" size="lg" color="primary">Guardar</Button>
                    </Row></FormGroup>
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


const aspirante = (element) => element.roleType === 1;

const LocalNoLoginCard = ({ isLogin }) =>
    <Card color="primary" inverse>
        <CardText>Si creas un perfil de aspirante, podes guardar tu CV</CardText>
        <Col lg={{ size: 6, offset: 3 }}>
            <ButtonGroup>
                {isLogin !== "true" ?
                    <Button href="/login" color="secondary">        Login </Button> : ""}
                <Button href="/Register/" color="secondary">     Crear </Button>
            </ButtonGroup>
        </Col>
    </Card>

