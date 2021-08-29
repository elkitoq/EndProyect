import { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Button} from "reactstrap"
import "../Assets/Css/CV.css"
import RutaTutorial from '../Components/tutorial';
import { QAPI } from '../Tools/API';
import { Status } from "../Tools/Status";

export const ViewCV = ({ role }) => {

    const [cv, setCV] = useState({})

    const status = useContext(Status.Context)
    const [selectRole,] = status.use('selectRole');

    console.log(role);
    console.log(selectRole);
    console.log(role || selectRole);
    useEffect(() => {
        new QAPI('/cv').send("get", { role: role || selectRole }).then((res) => {
            if (res && res.data && res.data.response)
                setCV(res.data.response)
            console.log(res.data.response);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return <><Container id="cvImprimible" style={{ fontFamily: "Homer Simpson UI" }}>
        <Row>
            <Col className="principalCV" xs="9">
                <Row>{cv.description}</Row>
                <Row className="separadorCV" style={{}}>Educación</Row>
                <Row className="itemsCV" style={{}}>
                    {cv.academico ?
                        cv.academico.map((item) => <>
                            <Col xs="3">{item.year}</Col>
                            <Col xs="9"><b>{item.title}</b><br />
                                {item.description}</Col>
                        </>
                        )
                        : ""}
                </Row>
                <Row className="separadorCV" style={{}}>Experiencia Laboral</Row>

                <Row className="itemsCV" style={{}}>
                    {cv.laboral ?
                        cv.laboral.map((item) => <>
                            <Col xs="3">{item.year}</Col>
                            <Col xs="9"><b>{item.title}</b><br />
                                {item.empresa}<br />
                                {item.description}</Col>
                        </>
                        )
                        : ""}
                </Row>
            </Col>
            <Col xs="3" className="lateralCV">
                <Row className="name" style={{ fontSize: "3rem", fontWeight: "bold" }}>{cv.name} {cv.lastName}</Row>
                <Row style={{ fontSize: "1.2rem" }}>{cv.puesto}</Row>
                <Row className="separadorCV" style={{}}>Perfil</Row>
                <Row style={{}}><b>Email</b>
                    {cv.email}<br />
                    <b>Teléfono</b>
                    {cv.phone}
                    <b>Dirección</b>
                    {cv.address} <br />
                    {cv.city} {cv.cp}
                </Row>
                <Row className="separadorCV" style={{}}>Habilidades</Row>
                <Row style={{}}>
                    {cv.skill ? cv.skill.map(
                        (item) => <>
                            <b>{item.title}</b>
                            {/* ({item.nivel}) */}
                            <br /></>
                    ) : ""}


                </Row>
            </Col>
        </Row>
    </Container>
    <Button>Imprimir</Button>
    <Button
        onClick={()=>{
            // var ficha = document.getElementById("cvImprimible");
            // var ventanaImpresion = window.open(' ', 'popUp');
            // // ventanaImpresion.document.write(`
            // // <!DOCTYPE html>
            // //     <html lang="en">
            // //     <head>
            // //         <meta charset="UTF-8">
            // //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
            // //         <meta name="viewport" content="width=device-width, initial-scale=1.0">

            // //         <script>
                    
            // //         </script>
            // //         <title>CV</title>
            // //     </head>
            // //     <body>
            // //     ${ficha.innerHTML}
            // //     </body>
            // // </html>`);

            


            // ventanaImpresion.document.close();
            // ventanaImpresion.print();
            // ventanaImpresion.close();


            var contenido= document.getElementById("cvImprimible").innerHTML;
            var contenidoOriginal= document.body.innerHTML;
       
            document.body.innerHTML = contenido;
       
            window.print();
       
            // document.body.innerHTML = contenidoOriginal;

        }}
    >Descargar</Button>
    <Button
        href="/CVCreate/"
    >Editar</Button>
</>
}


RutaTutorial.get("MostrarCV")
    .setDescription(<>Puedes imprimir o descargar tu Curriculum Vitae</>)
    .setRender(ViewCV)
    .addRequisito("CreateCV")
    .setMeta("Mostrar CV")
    .setInstrucciones(<>Guarda tu CV</>);