import { useLocation } from "react-router";
import { Container, Row } from "reactstrap";
import { OptionMenu } from "../Components/OptionMenu";
import { Status } from "../Tools/Status";
import { useContext } from "react";
import { LoadRoles } from "../Components/role";



export const ViewHomeAutonomo = () => {

    const { search } = useLocation();
    const userNumber = new URLSearchParams(search).get("user")

    const status = useContext(Status.Context)
    const [selectUser,] = status.use('selectUser');
    const [selectRole,setProfile] = status.use('selectRole');

    const user = selectUser[userNumber];
    if (user && userNumber!==undefined && userNumber !== selectRole)
    setProfile(userNumber)

    return (
        <Container className="abs-center">
            <LoadRoles/>
            <div className="text-center">
                <h1>Bienvenido {user?user.profileName:""}</h1>
                <h2>¿Que estas buscando hoy?</h2>
                <Row className="">
                    <OptionMenu href="/CVCreate/"       >Crear Curriculum</OptionMenu>
                    <OptionMenu href="/offerService/"   >Ofrecer Servicio</OptionMenu>
                    {/* <OptionMenu href="/message/"        >Ver mensajes</OptionMenu> */}
                </Row>
            </div>
        </Container>

    );
}