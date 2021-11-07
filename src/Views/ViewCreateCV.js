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
import RutaTutorial, { Ayuda } from "../Components/tutorial";
import { Señalador } from '../Components//Señalador';



import agregarFoto from '../Assets/HelpGif/agregarFoto.gif'
import agregarHabilidad from '../Assets/HelpGif/agregarHabilidad.gif'
import agregaritemAcademico from '../Assets/HelpGif/agregaritemAcademico.gif'
import eliminaritemAcademico from '../Assets/HelpGif/eliminaritemAcademico.gif'
import guardarCV from '../Assets/HelpGif/guardarCV.gif'
import rellenarDatosCV from '../Assets/HelpGif/rellenarDatosCV.GIF'


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
    const [selectRole, setRole] = status.use('selectRole');


    const [update,updater]=useState(1);
    API.updater('/cv',updater)

    useEffect(() => {
        setTimeout(() => {
            updater(Math.random())
        }, 300)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const dataDefault = {
        "role":
            (selectUser && selectUser[selectRole] && perfilConCV(selectUser[selectRole])) ?
                selectRole :
                Array.isArray(selectUser) ?
                    selectUser.findIndex(perfilConCV).toString()
                    : 0
    }

    //API.apis=[]

    API.on(API.events.MOUNT,
        (api) => {
            console.log("MONTADO");
            console.log(api);
            api.get(dataDefault)
        },
        'CreateCV')


    API.on(API.events.CHANGEINFO, (api) => {
        if (api.getHookInfo().role !== undefined) {
            setRole(api.getHookInfo().role);
            if (api.getHookInfo().readyCV)
                status.set("CreateCV");
        }
    }, 'CreateCV')

    API.on(API.events.CHANGEDATA, (api) => {
        if (!status.get("CreateCV") && api.getHookData() && api.getHookData().photo && document.getElementById("fotoPerfil")) {
            document.getElementById("fotoPerfil").src = api.getHookData().photo
        }
    }, 'CreateCV')

    if (API.get('/cv')){
        const api = API.get('/cv')
        if (api.getHookData().photo && document.getElementById("fotoPerfil") && document.getElementById("fotoPerfil").src === noPhoto)
        document.getElementById("fotoPerfil").src = api.getHookData().photo
    }

    return (<>{status.get("CreateCV") ? <ViewCV role={selectRole} /> :
        <Container>
            <LoadRoles />
            <Form method="put">
                <APIComponent url='/cv' />
                <Row className="separado">
                    <FormGroup>
                        <Row>
                            <Col xs="4" sm="4" md="4" lg={{ size: 3, offset: 1 }}>
                                <img src={noPhoto} className="foto-perfil" id="fotoPerfil" onClick={cargarFotoPerfil} alt="Cargar de perfil" style={{ cursor: 'pointer' }} />
                                <div style={{ display: displayChargePhoto, marginTop: "-30px" }}>Click en la imagen para cambiarla</div>
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

                    <FormItem name="Puesto al que aspira" idInput="puesto" />

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
                        type="textarea" />


                    <FormGroup>
                        <Row md="2" className="separado">
                            {(Array.isArray(selectUser) && selectUser.length && selectUser.find(perfilConCV)) ?
                                <FormItem type="select" name="El CV se guardará en:" idInput="role" defaultValue={dataDefault.role}>
                                    {(Array.isArray(selectUser)) ? selectUser.map(
                                        (element, index) => perfilConCV(element) ?
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

                            <Button className="right button-save-cv" size="lg" color="primary"
                            // href="/MostrarCV"
                            >Guardar</Button>
                        </Row></FormGroup>

                </Row>
            </Form>

            <Ayuda ruta={RutaTutorial.get('CreateCV')}/>
        </Container>}</>
    )
}

const cargarFotoPerfil = () => {
    document.getElementById("cargarImagen").click();
}

//Comprime la foto 
const resizeBase64Img = (base64, newWidth, newHeight) => {
    return new Promise((resolve, reject) => {
        var canvas = document.createElement("canvas");

        canvas.width = newWidth;
        canvas.height = newHeight;

        canvas.style.width = newWidth.toString() + "px";
        canvas.style.height = newHeight.toString() + "px";

        let context = canvas.getContext("2d");
        let img = document.createElement("img");
        // img.width=330;
        // img.height=250;
        img.src = base64;
        img.onload = function () {
            context.scale(newWidth / img.width, newHeight / img.height);
            context.drawImage(img, 0, 0);
            resolve(canvas.toDataURL());
        }
    });
}

const mostrarFotoPerfil = () => {
    var archivo = document.getElementById("cargarImagen").files[0];
    var reader = new FileReader();
    if (archivo) {
        reader.readAsDataURL(archivo);
        reader.onloadend = function () {
            const marco = document.getElementById("fotoPerfil");
            resizeBase64Img(reader.result, 130, 130).then((img) => {
                // resizeBase64Img(reader.result,300,150).then((img)=>{
                marco.src = img;
                console.log(img);
                const api = API.get('/cv')
                //API.on(API.events.SENDING, (api) => {
                    api.getHookData().photo = img
                    api.refresh()
                //}, 'uploadImageCV')
                setDisplayChargePhoto("none");
            });
        }
    }
}


const perfilConCV = (element) => element.profileType === 1 || element.profileType === 2;


const LocalNoLoginCard = ({ isLogin }) =>
    <Card color="primary" inverse>
        <CardText>Si creas un perfil de aspirante, podes guardar tu CV</CardText>
        <Col lg={{ size: 6, offset: 3 }}>
            <ButtonGroup>
                {isLogin !== "true" ?
                    <Button href="/login" color="secondary">    Login </Button> : ""}
                <Button href="/register" color="secondary">     Crear </Button>
            </ButtonGroup>
        </Col>
    </Card>

RutaTutorial.get("CreateCV").setLink('/CVCreate')
    .setDescription(<>Puedes crear un Curriculum Vitae</>)
    .setRender(ViewCreateCV)
    .addRequisito("haveAspirante")
    .setMeta("Crear CV")
    .setInstrucciones(<>Has clic en <Señalador marca="CrearCV" texto="Crear CV" />, está en la esquina superior izquierda de la pagina</>)
    .addPaso(<>Rellena con tus datos 
        <br/><img className="gif-ayuda" alt="Tu navegador no te permite ver la imagen" src={rellenarDatosCV}/></>)
    .addPaso(<>Carga una foto, haciendo click en la imagen actual
        <br/><img className="gif-ayuda" alt="Tu navegador no te permite ver la imagen" src={agregarFoto}/></>)
    .addPaso(<>Agrega Items a tu historial academico y tu experiencia 
        <br/><img className="gif-ayuda" alt="Tu navegador no te permite ver la imagen" src={agregaritemAcademico}/></>)
    .addPaso(<>Puedes borrar el item que estes editando, o alguno ya terminado, desde la cruz de la derecha
        <br/><img className="gif-ayuda" alt="Tu navegador no te permite ver la imagen" src={eliminaritemAcademico}/></>)
    .addPaso(<>Puedes incluir habilidades como idiomas, programas informaticos que manejes, trabajo en equipo, etc. Todo suma
        <br/><img className="gif-ayuda" alt="Tu navegador no te permite ver la imagen" src={agregarHabilidad}/></>)
    .addPaso(<>Por ultimo Guarda tu CV para ver como ha quedado, Si tienes más perfiles puedes guardarlo en cualquiera de ellos para hacer copias
        <br/><img className="gif-ayuda" alt="Tu navegador no te permite ver la imagen" src={guardarCV}/></>)


RutaTutorial.get("CreateCVautonomo").setLink('/CVCreate2')
    .setDescription(<>Crea y anexa un Curriculum Vitae a tu perfil</>)
    .setRender(ViewCreateCV)
    .addRequisito("haveAutonomo")
    .setMeta("Crear CV (Para Autonomo)")
    .setInstrucciones(<>Has clic en <Señalador marca="CrearCV" texto="Crear CV" />, está en la esquina superior izquierda de la pagina</>)
