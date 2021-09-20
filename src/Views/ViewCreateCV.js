import { FormGroup, Container, Row, Col, Card, CardText, ButtonGroup } from 'reactstrap'
import { Button } from 'reactstrap'
import { Input } from 'reactstrap'
import { ViewAddCVData } from './ViewAddCVData'
import '../Assets/Css/cargarCV.css';
import { FormItem } from '../Components/FormItem'
import noPhoto from '../Assets/image/blank-profile.png'
import { useContext, useEffect, useState } from 'react';
import API, { APIComponent } from '../Tools/API.js';
import { Form } from '../Components/Form';

// import { PDF } from '../Server/tools/PDF';
import { ViewCV } from './ViewCV';
import { Status } from '../Tools/Status';

import { LoadRoles } from '../Components/role';
import RutaTutorial from '../Components/tutorial';
import { Señalador } from '../Components//Señalador';


let displayChargePhoto, setDisplayChargePhoto;

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

    const status = useContext(Status.Context)
    const [selectUser,] = status.use('selectUser');
    const [selectRole,setRole] = status.use('selectRole');

    const [ready,setReady]=useState(false)
    //const [role,setRole]=useState(-1)

    const dataDefault = {
        "role":
            (selectUser && selectUser[selectRole] && aspirante(selectUser[selectRole])) ?
                selectRole :
                Array.isArray(selectUser) ?
                    selectUser.findIndex(aspirante).toString()
                    : 0
    }

    // useEffect(() => {
    //     api.get();

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    class APICV extends API {

        didMount = ()=>{
            this.get(dataDefault);
        }
        changeInfo =(info)=>{
            if (info.error)
                    alert(info.error);               
            if (info.role !== undefined){
                setRole(info.role);
                status.set("CreateCV");
                setReady(true);
            }
        }

    }

    if (ready)
        return (<ViewCV role={selectRole}/>)

return (
    <Container>
        <LoadRoles />
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
                            <div style={{ display: displayChargePhoto, marginTop:"-30px" }}>Click en la imagen para cambiarla</div>
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
                
                <FormItem name="Puesto al que aspira" idInput="puesto"/>
                
                <h3> Historial Academico</h3>
                <ViewAddCVData idInput="academico">
                    <Input idInput="title" placeholder="Agrege un titulo" />
                    <Input idInput="year" placeholder="Agrege el año" />
                    <Input idInput="description" type="textarea" placeholder="Agrege más detalles" />
                </ViewAddCVData>

                <h3> Experiencia Laboral</h3>
                <ViewAddCVData idInput="laboral">
                    <Input idInput="title" placeholder="Agrege un puesto" />
                    <Input idInput="year" placeholder="Agrege el periodo" />
                    <Input idInput="empresa" placeholder="Agrege la empresa" />
                    <Input idInput="description" type="textarea" placeholder="Agrege más detalles" />
                </ViewAddCVData>

                <h3> Habilidades y Aptitudes</h3>
                <ViewAddCVData idInput="skill">
                    <Input idInput="title" placeholder="Agrege una habilidad" />
                    <Input idInput="nivel" type="select" placeholder="Seleccione el nivel" >
                    <option>Básico</option>
                    <option>Medio</option>
                    <option>Avanzado</option>
                    <option>Experto</option> 
                    </Input>
                </ViewAddCVData>

                <FormItem 
                    name="Agregue una breve descripción de quien es y que busca" 
                    idInput="description"
                    type="textarea"/>


                <FormGroup>
                    <Row md="2" className="separado">
                        {(Array.isArray(selectUser) && selectUser.length && selectUser.find(aspirante)) ?
                            <FormItem type="select" name="El CV se guardará en:" idInput="role" defaultValue={dataDefault.role}>
                                {(Array.isArray(selectUser)) ? selectUser.map(
                                    (element, index) => aspirante(element) ?
                                        <option key={`option-${index}`} value={index}>{element.profileName}</option> : ""
                                ) : ""}
                            </FormItem>
                            : <LocalNoLoginCard isLogin={status.get("Login")} />
                        }

{/* 
                        <Button size="sm"   /* onClick={window.print()} */ /*>
                            <PDF /* name={this.state.name} onClick={this.sunmitPost} */ /* />
                            Imprimir
                        </Button>
 */}

                        <Button className="right" size="lg" color="primary"
                            // href="/MostrarCV"
                        >Guardar</Button>
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


export const aspirante = (element) => element.profileType === 1;

const LocalNoLoginCard = ({ isLogin }) =>
    <Card color="primary" inverse>
        <CardText>Si creas un perfil de aspirante, podes guardar tu CV</CardText>
        <Col lg={{ size: 6, offset: 3 }}>
            <ButtonGroup>
                {isLogin !== "true" ?
                    <Button href="/login" color="secondary">        Login </Button> : ""}
                <Button href="/register" color="secondary">     Crear </Button>
            </ButtonGroup>
        </Col>
    </Card>

RutaTutorial.get("CreateCV")
    .setDescription(<>Puedes crear un Curriculum Vitae</>)
    .setRender(ViewCreateCV)
    .addRequisito("haveAspirante")
    .setMeta("Crear CV")
    .setInstrucciones(<>Has clic en <Señalador marca="CrearCV" text="Crear CV"/>, está en la esquina superior izquierda de la pagina</>);
