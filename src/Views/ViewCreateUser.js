import { useCookies } from "react-cookie";
import { Button, Card, Container, Input} from "reactstrap";
import { FormRegister } from "../Components/FormRegister";
import API from "../Tools/API";

let user, setUser;

export const ViewCreateUser = () => {

    const [login] = useCookies(['isLogin']);
    [user, setUser] = useCookies(['selectUser']);

    console.log(user.selectUser);

    return (
        !(login.isLogin === "true") ? <FormRegister /> : <div className="abs-center">{
            !(Array.isArray(user.selectUser) && user.selectUser.length) ? <CrearUsuario user={user} setUser={setUser} /> :
                !(user.selectUser[user.selectUser.length - 1].new === true) ? <CrearUsuario /> :
                    (user.selectUser[user.selectUser.length - 1].roleType === 0) ? <CrearEmpresa /> :
                        (user.selectUser[user.selectUser.length - 1].roleType === 1) ? <CrearAspirante /> :
                            (user.selectUser[user.selectUser.length - 1].roleType === 2) ? <CrearAutonomo /> :
                                <CrearAdmin />}</div>
    );
}

const ButtonCreate = ({ href }) =>
    <Button size="lg" color="primary" blocks="true" href={`${href}?user=${user.selectUser.length - 1}`}
        onClick={(e) => {
            user.selectUser[user.selectUser.length - 1].new = false;
            if (user.selectUser[user.selectUser.length - 1].roleName === "" || user.selectUser[user.selectUser.length - 1].roleName === undefined)
                user.selectUser[user.selectUser.length - 1].roleName = "N/N";
            setUser("selectUser", user.selectUser, { path: '/' })
            new API('/role').send("put", user.selectUser[user.selectUser.length - 1]);
        }}>
        Crear</Button>

const CrearEmpresa = () => {
    return (
        <Container >
            Introduzca datos de la empresa:
            <Input defaultValue={user.selectUser[user.selectUser.length - 1].roleName}
                placeholder="Nombre"
                autoFocus
                onChange={(e) => {
                    user.selectUser[user.selectUser.length - 1].roleName = e.target.value;
                    setUser("selectUser", user.selectUser, { path: '/' });
                }
                }
            />
            <ButtonCreate href="/homeEmpresa" />
        </Container>
    )
}


const CrearUsuario = () => {


    const crear = (r, e) => {
        if (!Array.isArray(user.selectUser))
            user.selectUser = [];
        user.selectUser.push({ roleType: r, new: true });
        setUser("selectUser", user.selectUser, { path: '/' });

    }


    return (
        <>
            <div className="text-center">
                <h3>¿Por donde queres empezar?</h3>
                <Container>
                        <Card inverse color="primary" className="tarjetasVerticales" onClick={crear.bind(this, 0)}>
                            Tengo una empresa, Quiero esclavos
                        </Card>
                        <Card inverse color="primary" className="tarjetasVerticales " onClick={crear.bind(this, 1)}>
                            Soy pobre, Quiero Trabajo
                        </Card>
                        <Card inverse color="primary" className="tarjetasVerticales" onClick={crear.bind(this, 2)}>
                            Soy independiente, Quiero ofrecer mis servicios
                        </Card>
                        {/* <Card inverse color="primary" className="tarjetasQBuscas" onClick={crear.bind(this, 3)}>
                        Tengo un amigo que me pidio le cargara una cuenta
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
            <Input defaultValue={user.selectUser[user.selectUser.length - 1].roleName}
                placeholder="Nombre"
                autoFocus
                onChange={(e) => {
                    user.selectUser[user.selectUser.length - 1].roleName = e.target.value;
                    setUser("selectUser", user.selectUser, { path: '/' })
                }
                }
            />
            <ButtonCreate href="/homeAspirante" />
        </>


    )
}


const CrearAdmin = () => {
    user.selectUser[user.selectUser.length - 1].roleName = "Administrados";
    return (
        <>
            Introduzca los datos de su asociado
            <Input defaultValue={user.selectUser[user.selectUser.length - 1].subordinate[0].roleName}
                autoFocus
                onChange={(e) => {
                    user.selectUser[user.selectUser.length - 1].subordinate[0].roleName = e.target.value;
                    setUser("selectUser", user.selectUser, { path: '/' })
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
            <Input defaultValue={user.selectUser[user.selectUser.length - 1].roleName}
                placeholder="Nombre"
                autoFocus
                onChange={(e) => {
                    user.selectUser[user.selectUser.length - 1].roleName = e.target.value;
                    setUser("selectUser", user.selectUser, { path: '/' })
                }
                }
            />
            <ButtonCreate href="/homeAutonomo" />
        </Container>


    )
}