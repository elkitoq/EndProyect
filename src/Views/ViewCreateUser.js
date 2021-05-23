import { useCookies } from "react-cookie";
import { Button, Card, Container, Input, Row } from "reactstrap";
import { ViewRegister } from "./ViewRegister";

let user, setUser;

export const ViewCreateUser = () => {

    const [login] = useCookies(['isLogin']);
    [user, setUser] = useCookies(['selectUser']);


    return (
        <Container className="abs-center">
            {
                !(login.isLogin === "true") ? <ViewRegister /> :
                    (!Array.isArray(user.selectUser)) ? <CrearUsuario user={user} setUser={setUser} /> :
                        !(user.selectUser[user.selectUser.length - 1].new === true) ? <CrearUsuario /> :
                            (user.selectUser[user.selectUser.length - 1].type === 0) ? <CrearEmpresa /> :
                                (user.selectUser[user.selectUser.length - 1].type === 1) ? <CrearAspirante /> :
                                    <CrearAdmin />
            }
        </Container>
    );
}

const ButtonCreate = ({ href }) =>
    <Button size="lg" color="primary" blocks="true" href={`${href}?user=${user.selectUser.length - 1}`}
        onClick={(e) => {
            user.selectUser[user.selectUser.length - 1].new = false;
            if (user.selectUser[user.selectUser.length - 1].name==="" || user.selectUser[user.selectUser.length - 1].name===undefined)
                user.selectUser[user.selectUser.length - 1].name="N/N";
            setUser("selectUser", user.selectUser, { path: '/' })
        }}>
        Crear</Button>

const CrearEmpresa = () => {
    return (
        <Container >
            Introduzca datos de la empresa:
            <Input defaultValue={user.selectUser[user.selectUser.length - 1].name}
                placeholder="Nombre"
                onChange={(e) => {
                    user.selectUser[user.selectUser.length - 1].name = e.target.value;
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
        user.selectUser.push({ type: r, new: true });
        setUser("selectUser", user.selectUser, { path: '/' });

    }


    return (
        <Container className="abs-center">
            <div className="text-center">
                <h3>¿Por donde queres empezar?</h3>
                <Row>
                    <Card inverse color="primary" className="tarjetasQBuscas" onClick={crear.bind(this, 0)}>
                        Tengo una empresa, Quiero esclavos
                        </Card>
                    <Card inverse color="primary" className="tarjetasQBuscas" onClick={crear.bind(this, 1)}>
                        Soy pobre, Quiero Trabajo
                        </Card>
                    {/* <Card inverse color="primary" className="tarjetasQBuscas" onClick={crear.bind(this, 2)}>
                        Tengo un amigo que me pidio le cargara una cuenta
                        </Card> */}
                </Row>
            </div>

        </Container>
    );

}



const CrearAspirante = () => {

    return (
        <Container>
            Introduzca sus datos
            <Input defaultValue={user.selectUser[user.selectUser.length - 1].name}
                placeholder="Nombre"
                onChange={(e) => {
                    user.selectUser[user.selectUser.length - 1].name = e.target.value;
                    setUser("selectUser", user.selectUser, { path: '/' })
                }
                }
            />
            <ButtonCreate href="/homeAspirante" />
        </Container>


    )
}


const CrearAdmin = () => {
    user.selectUser[user.selectUser.length - 1].name = "Administrados";
    return (
        <Container>
            Introduzca los datos de su asociado
            <Input defaultValue={user.selectUser[user.selectUser.length - 1].subordinate[0].name}
                onChange={(e) => {
                    user.selectUser[user.selectUser.length - 1].subordinate[0].name = e.target.value;
                    setUser("selectUser", user.selectUser, { path: '/' })
                }
                }
            />
            <ButtonCreate href="/homeEmpresa" />
        </Container>


    )
}

