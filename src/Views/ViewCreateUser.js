import { Button, Card, Container, Form, Input} from "reactstrap";
import { FormRegister } from "../Components/FormRegister";
import { QAPI } from "../Tools/API";
import { Status } from "../Tools/Status";
import { useContext, useEffect, useState } from "react";
import RutaTutorial from "../Components/tutorial";
import { Señalador } from "../Components/Señalador";
import { useLocation } from "react-router-dom";
import { LoadRoles, verificarRoles } from "../Components/role";
import { FormItem } from "../Components/FormItem";

let selectUser, saveUser;

let refresh=()=>{}

let isRegister;

export const ViewCreateUser = ({ roleType,showRegister }) => {
    const status = useContext(Status.Context)
    const [login,] = status.use('Login');
    const [r,setr]= useState("")

    refresh = (a)=>setr(a)

    isRegister=showRegister!==undefined

    useEffect(() => {
        return <LoadRoles select={roleType}/>

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    [selectUser,] = status.use('selectUser');
    saveUser = () => status.set("selectUser", selectUser);
    return (
        !(login) ? <FormRegister showRegister={showRegister}/> : <div className="abs-center">{r}
            {
                !(Array.isArray(selectUser) && selectUser.length) ? <CrearUsuario roleType={roleType} /> :
                    (!(selectUser[selectUser.length - 1].new === true) || (roleType!==undefined && roleType !== selectUser[selectUser.length - 1].profileType)) ? <CrearUsuario roleType={roleType} /> :
                        (selectUser[selectUser.length - 1].profileType === 0) ? <CrearEmpresa /> :
                            (selectUser[selectUser.length - 1].profileType === 1) ? <CrearAspirante /> :
                                (selectUser[selectUser.length - 1].profileType === 2) ? <CrearAutonomo /> :
                                    <CrearAdmin />}</div>
    );
}

const ButtonCreate = ({ href }) => {
    const status = useContext(Status.Context)

    return <Button size="lg" color="primary" blocks="true" type="submit" href={`${href}?user=${selectUser.length - 1}`}
        onClick={(e) => {
            const form = document.getElementsByClassName('formtovalidate')[0]
            if (form.checkValidity()){
            selectUser[selectUser.length - 1].new = false;
            if (selectUser[selectUser.length - 1].profileName === "" || selectUser[selectUser.length - 1].profileName === undefined)
                selectUser[selectUser.length - 1].profileName = "N/N";
            verificarRoles(status, selectUser);
            saveUser();
            status.set("selectRole", "" + (selectUser.length - 1))
            new QAPI('/profile').send("put", selectUser[selectUser.length - 1]);
            }
            else{
                form.requestSubmit()
            }
        }}>
        Crear</Button>
}

const CancelButton = ({ visibility }) => <Button style={{ width: "100%", visibility: visibility ? "visible " : "hidden" }}
    onClick={() => {
        if (selectUser[selectUser.length - 1].new)
            selectUser.pop();
        saveUser();
    }}
>Crear otro tipo de perfil</Button>

const CrearEmpresa = () => {

    const { pathname } = useLocation();

    const values = selectUser[selectUser.length - 1]
    if (values.data === undefined)
        values.data = {}

    const onChange = () => {
        values.data.razonSocial = values.profileName
        saveUser()
    }
    return (
        <Container>
            Creando Perfil para Empresa
            <CancelButton visibility={pathname === "/Register/" || isRegister} />
            <Form className='formtovalidate'>
            <FormItem required name="Razón Social" idInput="razonSocial" reference={{ values, onChange, id: "profileName" }} />
            <FormItem name="CUIT" type="number" idInput="CUIT" reference={{ values: values.data, onChange, id: "cuit" }} />
            <FormItem name="Direccion" idInput="address" reference={{ values: values.data, onChange, id: "address" }} />
            <FormItem name="Ciudad" idInput="city" reference={{ values: values.data, onChange, id: "city" }} />
            <FormItem name="Telefono" type="number" idInput="phone" reference={{ values: values.data, onChange, id: "phone" }} />
            <FormItem required name="Email" type="email" idInput="email" reference={{ values: values.data, onChange, id: "email" }} />
            <ButtonCreate href={(pathname === "/Register/" || isRegister) ? "/homeEmpresa" : "#"} />
            </Form>
        </Container>
    )
}


const CrearUsuario = ({ roleType }) => {
    
    const crear = (r) => {
        
        if (!Array.isArray(selectUser))
            selectUser = [];
        selectUser.push({ profileType: r, new: true });
        saveUser()
        refresh()
    }

    useEffect(() => {

        if (roleType !== undefined) {
            if (selectUser[selectUser.length - 1] && selectUser[selectUser.length - 1].new)
                selectUser.pop()
            crear(roleType)
            
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <>  
            <div className="text-center content">
                <h3>¿Por donde querés empezar?</h3>
                <Container className="container-options">
                    <Card inverse color="primary" className="tarjetasVerticales" onClick={crear.bind(this, 0)}>
                        Tengo una empresa. Busco trabajadores
                    </Card>
                    <Card inverse color="primary" className="tarjetasVerticales " onClick={crear.bind(this, 1)}>
                        Estoy buscando trabajo
                    </Card>
                    <Card inverse color="primary" className="tarjetasVerticales" onClick={crear.bind(this, 2)}>
                        Soy independiente. Quiero ofrecer mis servicios
                    </Card>
                    {/* <Card inverse color="primary" className="tarjetasQBuscas" onClick={crear.bind(this, 3)}>
                        Tengo un amigo que me pidió le cargara una cuenta
                        </Card> */}
                </Container>
            </div>

        </>
    );

}



const CrearAspirante = () => {

    //LoadRoles({select:1})

    const values = selectUser[selectUser.length - 1]
    if (values.cv === undefined)
        values.cv = {}

    const onChange = () => {
        values.profileName = `${values.cv.lastName}, ${values.cv.name}` 
        saveUser()
    }

    const { pathname } = useLocation();
    return (
        <Container>
            Creando Perfil para Aspirante
            <CancelButton visibility={pathname === "/Register/"|| isRegister} />
            <Form className='formtovalidate'>
            <FormItem required name="Nombre" idInput="name" reference={{ values: values.cv, onChange, id: "name" }} />
            <FormItem name="Apellido" idInput="lastName" reference={{ values: values.cv, onChange, id: "lastName" }} />
            <FormItem name="Direccion" idInput="address" reference={{ values: values.cv, onChange, id: "address" }} />
            <FormItem name="Ciudad" idInput="city" reference={{ values: values.cv, onChange, id: "city" }} />
            <FormItem name="Telefono" type="number" idInput="phone" reference={{ values: values.cv, onChange, id: "phone" }} />
            <FormItem required name="Email" type="email" idInput="email" reference={{ values: values.cv, onChange, id: "email" }} />
            <ButtonCreate href={(pathname === "/Register/"|| isRegister) ? "/homeAspirante" : "#"} />
            </Form>
        </Container>


    )
}


const CrearAdmin = () => {
    selectUser[selectUser.length - 1].profileName = "Administrados";
    return (
        <>
            Introduzca los datos de su asociado
            <Input defaultValue={selectUser[selectUser.length - 1].subordinate[0].profileName}
                autoFocus
                onChange={(e) => {
                    selectUser[selectUser.length - 1].subordinate[0].profileName = e.target.value;
                    saveUser();
                }
                }
            />
            <ButtonCreate href="/homeEmpresa" />
        </>


    )
}


const CrearAutonomo = () => {

    const values = selectUser[selectUser.length - 1]
    if (values.cv === undefined)
        values.cv = {}

    const onChange = () => {
        values.cv.name = values.profileName
        saveUser()
    }

    const { pathname } = useLocation();

    return (
        <Container>
            Creando Perfil para Autonomo
            <CancelButton visibility={pathname === "/Register/"|| isRegister} />
            <Form className='formtovalidate'>
            <FormItem required name="Razón Social" idInput="razonSocial" reference={{ values, onChange, id: "profileName" }} />
            <FormItem name="CUIT" type="number" idInput="CUIT" reference={{ values: values.cv, onChange, id: "cuit" }} />
            <FormItem name="Direccion" idInput="address" reference={{ values: values.cv, onChange, id: "address" }} />
            <FormItem name="Ciudad" idInput="city" reference={{ values: values.cv, onChange, id: "city" }} />
            <FormItem name="Telefono" type="number" idInput="phone" reference={{ values: values.cv, onChange, id: "phone" }} />
            <FormItem required name="Email" type="email" idInput="email" reference={{ values: values.cv, onChange, id: "email" }} />
            <ButtonCreate href={(pathname === "/Register/"|| isRegister) ? "/homeAutonomo" : "#"} />
            </Form>
        </Container>
    )
}


const AddAutonomo = () => ViewCreateUser({ roleType: 2 })

const AddAspirante = () => ViewCreateUser({ roleType: 1 })

const AddEmpresa = () => ViewCreateUser({ roleType: 0 })

RutaTutorial.get("haveAspirante")
    .setDescription(<>Te dará acceso a toda las herramientas para aspirantes</>)
    .addRequisito("cargarPerfiles")
    .setRender(AddAspirante)
    .setMeta("Crear Perfil de Aspirante")
    .setInstrucciones(<>Has clic en <Señalador marca="CrearPerfil" texto="Crear Perfil" />, en el menu de <Señalador marca="Roles" texto="Perfiles" /></>);

RutaTutorial.get("haveEmpresa")
    .setDescription(<>Te dará acceso a toda las herramientas para Empresa</>)
    .addRequisito("cargarPerfiles")
    .setRender(AddEmpresa)
    .setMeta("Crear Perfil de Empresa")
    .setInstrucciones(<>Has clic en <Señalador marca="CrearPerfil" texto="Crear Perfil" />, en el menu de <Señalador marca="Roles" texto="Perfiles" /></>);

RutaTutorial.get("haveAutonomo")
    .setDescription(<>Te dará acceso a toda las herramientas para autonomo</>)
    .addRequisito("cargarPerfiles")
    .setRender(AddAutonomo)
    .setMeta("Crear Perfil de Autonomo  ")
    .setInstrucciones(<>Has clic en <Señalador marca="CrearPerfil" texto="Crear Perfil" />, en el menu de <Señalador marca="Roles" texto="Perfiles" /></>);
