import { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { CardText, Container, Row } from "reactstrap";
import { Busqueda } from "../Components/Busqueda";
import { Display } from "../Components/Display";
import RutaTutorial, { NextButton } from "../Components/tutorial";
import { ApplicationContrato } from "../Server/models/AplicationContrato";
import API, { APIComponent, QAPI } from "../Tools/API";
import { Status } from "../Tools/Status";
import { aspirante } from "./ViewCreateCV";




export const ViewFindJob = () => {
    let { search } = useLocation();
    let busqueda = new URLSearchParams(search)

    const status = useContext(Status.Context)
    const [user,] = status.use('selectUser');
    const [selectRole,] = status.use('selectRole');

    useEffect(() => {

        if (busqueda.get("postulate")) {
            if (status.get("haveAspirante"))
                new QAPI('/postulate').send("post", {
                    role:
                        (user && user[selectRole] && aspirante(user[selectRole])) ?
                            selectRole :
                            Array.isArray(user) ?
                                user.findIndex(aspirante).toString()
                                : 0
                    , id: busqueda.get("postulate")
                })
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

return (<>
    <Container className="abs-center separado">
        <Row>
            <Busqueda text="Buscar Empleo" href="/findJob" defaultValue={busqueda.get("b")} />
            <h1>Estos son las busquedas laborales que responden a "{busqueda.get("b")}" </h1>
            <Display
                get={busqueda}
                link={{
                    onClick: (element) => {
                        const b = new URLSearchParams(search)
                        b.set("postulate", element._id)
                        return `/postulateJob?${b}`
                    }, text: "Postularse"
                }}
            >
                <APIComponent url='/jobs' />
                <CardText key="name">Puesto:</CardText>
                <CardText className="text-wrap" key="description">Descripción:</CardText>
                <CardText key="req" hideData>Requerimientos:</CardText>
                <CardText key="zona" hideData>Zona:</CardText>

                <CardText hideData func={(elemento)=>{
                        const type = ApplicationContrato.find((type)=>type.code===elemento.tipoContrato)
                        return (type?type.title:"")
                        }}>Tipo de Contrato:</CardText>

                <CardText key="tipoJornada" hideData>Tipo de Jornada:</CardText>

                <CardText key="match">Coincidencias:</CardText>
            </Display>
        </Row>
    </Container>
</>
);
}


RutaTutorial.get("FindJob")
    .setMeta("Lista de Puestos")
    .setRender(ViewFindJob)

RutaTutorial.get("PostulateJob")
    .setMeta("Postularse a una Busqueda")
    .setRender(ViewFindJob)
    .addRequisito("haveAspirante")