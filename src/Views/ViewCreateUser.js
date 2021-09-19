import { Button, Card, Container, Input } from "reactstrap";
import { FormRegister } from "../Components/FormRegister";
import { QAPI } from "../Tools/API";
import { Status } from "../Tools/Status";
import { useContext, useEffect } from "react";
import RutaTutorial from "../Components/tutorial";
import { Señalador } from "../Components/Señalador";
import { useLocation } from "react-router-dom";
import { verificarRoles } from "../Components/role";

let selectUser, saveUser;

export const ViewCreateUser = ({ roleType }) => {

    const status = useContext(Status.Context)
    const [login,] = status.use('Login');

    [selectUser,] = status.use('selectUser');
    saveUser = () => status.set("selectUser", selectUser);

    return (
        !(login) ? <FormRegister /> : <div className="abs-center">
            {
            !(Array.isArray(selectUser) && selectUser.length) ? <CrearUsuario roleType={roleType}/> :
                !(selectUser[selectUser.length - 1].new === true) ? <CrearUsuario roleType={roleType}/> :
                    (selectUser[selectUser.length - 1].profileType === 0) ? <CrearEmpresa /> :
                        (selectUser[selectUser.length - 1].profileType === 1) ? <CrearAspirante /> :
                            (selectUser[selectUser.length - 1].profileType === 2) ? <CrearAutonomo /> :
                                <CrearAdmin />}</div>
    );
}

const ButtonCreate = ({ href }) => {
    const status = useContext(Status.Context)

    return <Button size="lg" color="primary" blocks="true" href={`${href}?user=${selectUser.length - 1}`}
        onClick={(e) => {
            selectUser[selectUser.length - 1].new = false;
            if (selectUser[selectUser.length - 1].profileName === "" || selectUser[selectUser.length - 1].profileName === undefined)
                selectUser[selectUser.length - 1].profileName = "N/N";
            verificarRoles(status,selectUser);
            saveUser();
            status.set("selectRole",""+(selectUser.length - 1))
            new QAPI('/profile').send("put", selectUser[selectUser.length - 1]);
            
        }}>
        Crear</Button>
}


const CrearEmpresa = () => {
    return (
        <Container >
            Introduzca datos de la empresa:
            <Input defaultValue={selectUser[selectUser.length - 1].profileName}
                placeholder="Nombre"
                autoFocus
                onChange={(e) => {
                    selectUser[selectUser.length - 1].profileName = e.target.value;
                    saveUser()
                }
                }
            />
            <ButtonCreate href="/homeEmpresa" />
        </Container>
    )
}


const CrearUsuario = ({ roleType }) => {


    const crear = (r) => {
        if (!Array.isArray(selectUser))
            selectUser = [];
        selectUser.push({ profileType: r, new: true });
        console.log("///////////////////////////");
        console.log(selectUser);
        saveUser()

    }

    useEffect(() => {

        if (roleType !== undefined)
            crear(roleType)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <>
            <div className="text-center">
                <h3>¿Por donde querés empezar?</h3>
                <Container>
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
    const { pathname } = useLocation();
    return (
        <>
            Introduzca sus datos
            <Input defaultValue={selectUser[selectUser.length - 1].profileName}
                placeholder="Nombre"
                autoFocus
                onChange={(e) => {
                    selectUser[selectUser.length - 1].profileName = e.target.value;
                    saveUser()
                }
                }
            />
            <ButtonCreate href={(pathname === "/Register/") ? "/homeAspirante" : "#"} />
        </>


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

    return (
        <Container>
            Introduzca los datos de su emprendimiento
            <Input defaultValue={selectUser[selectUser.length - 1].profileName}
                placeholder="Nombre"
                autoFocus
                onChange={(e) => {
                    selectUser[selectUser.length - 1].profileName = e.target.value;
                    saveUser()
                }
                }
            />
            <ButtonCreate href="/homeAutonomo" />
        </Container>


    )
}

const AddAspirante = () => ViewCreateUser({ roleType: 1 })

RutaTutorial.get("haveAspirante")
    .setDescription(<>Te dará acceso a toda las herramientas para aspirantes</>)
    .addRequisito("Login")
    .setRender(AddAspirante)
    .setMeta("Crear Perfil de Aspirante")
    .setInstrucciones(<>Has clic en <Señalador marca="CrearRol" text="Crear Perfil" />, en el menu de <Señalador marca="Roles" text="Roles" /></>);

RutaTutorial.get("haveEmpresa")
    .setDescription(<>Te dará acceso a toda las herramientas para Empresa</>)
    .addRequisito("Login")
    .setRender(AddAspirante)
    .setMeta("Crear Perfil de Empresa")
    .setInstrucciones(<>Has clic en <Señalador marca="CrearRol" text="Crear Perfil" />, en el menu de <Señalador marca="Roles" text="Roles" /></>);