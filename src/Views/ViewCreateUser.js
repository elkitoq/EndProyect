import { Button, Card, Container, Input} from "reactstrap";
import { FormRegister } from "../Components/FormRegister";
import { QAPI } from "../Tools/API";
import { Status } from "../Tools/Status";
import { useContext } from "react";

let selectUser,saveUser;

export const ViewCreateUser = () => {

    const status = useContext(Status.Context)
    const [login,] = status.use('Login');

    [selectUser,] = status.use('selectUser');
    saveUser=()=>status.save("user");

    return (
        !(login.isLogin === "true") ? <FormRegister /> : <div className="abs-center">{
            !(Array.isArray(selectUser) && selectUser.length) ? <CrearUsuario /> :
                !(selectUser[selectUser.length - 1].new === true) ? <CrearUsuario /> :
                    (selectUser[selectUser.length - 1].roleType === 0) ? <CrearEmpresa /> :
                        (selectUser[selectUser.length - 1].roleType === 1) ? <CrearAspirante /> :
                            (selectUser[selectUser.length - 1].roleType === 2) ? <CrearAutonomo /> :
                                <CrearAdmin />}</div>
    );
}

const ButtonCreate = ({ href }) =>
    <Button size="lg" color="primary" blocks="true" href={`${href}?user=${selectUser.length - 1}`}
        onClick={(e) => {
            selectUser[selectUser.length - 1].new = false;
            if (selectUser[selectUser.length - 1].roleName === "" || selectUser[selectUser.length - 1].roleName === undefined)
                selectUser[selectUser.length - 1].roleName = "N/N";
            saveUser()
            new QAPI('/role').send("put", selectUser[selectUser.length - 1]);
        }}>
        Crear</Button>

const CrearEmpresa = () => {
    return (
        <Container >
            Introduzca datos de la empresa:
            <Input defaultValue={selectUser[selectUser.length - 1].roleName}
                placeholder="Nombre"
                autoFocus
                onChange={(e) => {
                    selectUser[selectUser.length - 1].roleName = e.target.value;
                    saveUser()
                }
                }
            />
            <ButtonCreate href="/homeEmpresa" />
        </Container>
    )
}


const CrearUsuario = () => {


    const crear = (r, e) => {
        if (!Array.isArray(selectUser))
            selectUser = [];
        selectUser.push({ roleType: r, new: true });

        saveUser()

    }


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

    return (
        <>
            Introduzca sus datos
            <Input defaultValue={selectUser[selectUser.length - 1].roleName}
                placeholder="Nombre"
                autoFocus
                onChange={(e) => {
                    selectUser[selectUser.length - 1].roleName = e.target.value;
                    saveUser()
                }
                }
            />
            <ButtonCreate href="/homeAspirante" />
        </>


    )
}


const CrearAdmin = () => {
    selectUser[selectUser.length - 1].roleName = "Administrados";
    return (
        <>
            Introduzca los datos de su asociado
            <Input defaultValue={selectUser[selectUser.length - 1].subordinate[0].roleName}
                autoFocus
                onChange={(e) => {
                    selectUser[selectUser.length - 1].subordinate[0].roleName = e.target.value;
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
            <Input defaultValue={selectUser[selectUser.length - 1].roleName}
                placeholder="Nombre"
                autoFocus
                onChange={(e) => {
                    selectUser[selectUser.length - 1].roleName = e.target.value;
                    saveUser()
                }
                }
            />
            <ButtonCreate href="/homeAutonomo" />
        </Container>


    )
}