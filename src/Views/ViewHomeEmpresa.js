import { useContext } from "react";
import { useLocation } from "react-router";
import { Col, Container, Row } from "reactstrap"
import { OptionMenu } from "../Components/OptionMenu";
import { LoadRoles } from "../Components/role";
import { Status } from "../Tools/Status";




export const ViewHomeEmpresa = () => {
    // return (
    //     <Container className="abs-center">
    //         <div className="divtext center">
    //             <h1>Pagina de inicio para empresas</h1>
    //             <Row className="">
    //                 <OptionMenu href="/createJob/">Crear puesto</OptionMenu>
    //                 <OptionMenu href="/offerJob/">Ver puestos</OptionMenu>
    //                 <OptionMenu href="/offerJob/">puestos</OptionMenu>
    //             </Row>
    //         </div>
    //     </Container>
    // );

    const { search } = useLocation();
    const userNumber = new URLSearchParams(search).get("user")

    const status = useContext(Status.Context)
    const [selectUser,] = status.use('selectUser');
    const [selectRole,setProfile] = status.use('selectRole');
    const user = selectUser[userNumber || selectRole];
    if (user && userNumber!==undefined && userNumber !== selectRole)
    setProfile(userNumber)
    document.user = user
    return (
        <Container className="abs-center">
            <LoadRoles/>
            <Col className="content-home">
                <div className="content-home-inner">
                    <div className="title">
                        <h1>Bienvenido {user?user.profileName:""}</h1>
                        <h2>¿Que estas buscando hoy?</h2>
                    </div>
                    <Row className="option-menu">
                        <OptionMenu href="/createJob/">Crear Búsqueda laboral</OptionMenu>
                        <OptionMenu href="/offerJob/">Ver Búsquedas en curso</OptionMenu>
                        {/* <OptionMenu href={`/perfilEmpresa?id=${user._id}`}   >Mi perfil</OptionMenu> */}
                        <OptionMenu href="#">Mi perfil</OptionMenu>
                        {/* <OptionMenu href="/message/"        >Ver mensajes</OptionMenu> */}
                    </Row>
                </div>
            </Col>
        </Container>

    );

}