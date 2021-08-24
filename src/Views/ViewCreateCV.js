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
<<<<<<< HEAD
import { PDF } from '../Server/tools/PDF';
import userSchema from '../Server/models/User';
=======
import RutaTutorial from '../Components/tutorial';
import { Señalador } from '../Components/Señalador';
>>>>>>> 4ffcae79af0169d2cc3702d5db81a97e9c0f8968

let displayChargePhoto, setDisplayChargePhoto;


const tutorial =
    new RutaTutorial("CV")
    .setDescription(<>Puedes crear un Curriculum Vitae</>)
    .setInstrucciones(<>Has clic en <Señalador marca="CrearCV" text="Crear CV"/>, está en la esquina superior izquierda de la pagina</>);


export const ViewCreateCV = () => {
/*
    const state = {
        name: '',
        lastname: '',
        address: '',
        city: '',
        cp: '',
        age: '',
        phone: '',
        email: '',
        postSubmitted: false
    } 

    const onChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
    }

    const sunmitPost = (e) => {

        if (!this.state.name || !this.state.lastname) {
            alert('All fields are required!');
            e.preventDefault();
        } else {
            this.setState({
                postSubmitted: true
            });
        }
    }
*/
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


<<<<<<< HEAD
    useEffect(() => {
        api.get();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
=======
>>>>>>> 4ffcae79af0169d2cc3702d5db81a97e9c0f8968

    // useEffect(() => {
    //     api.get();

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    class APICV extends API {

        didMount = ()=>{
            this.get();
        }

    }


<<<<<<< HEAD
    return (

        
            <Container>
                    <Form api={api} method="put">
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
                                            <FormItem name="Nombre" idInput="name"  /* onChange={this.onChange('name')} */ />
                                            <FormItem name="Apellido" idInput="lastName" /* onChange={this.onChange('lastname')} */ />
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
                                        <br />
                                        <Button size="sm"   /* onClick={window.print()} */>
                                            <PDF /* name={this.state.name} onClick={this.sunmitPost} */ />
                                            Imprimir
                                        </Button>

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
        
                                       
    );
    
=======
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
>>>>>>> 4ffcae79af0169d2cc3702d5db81a97e9c0f8968
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
<<<<<<< HEAD
                <Button href="/register" color="secondary">     Crear </Button>
=======
                <Button href="/Register/" color="secondary">     Crear </Button>
>>>>>>> 4ffcae79af0169d2cc3702d5db81a97e9c0f8968
            </ButtonGroup>
        </Col>
    </Card>


