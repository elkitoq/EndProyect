import React from "react";
import { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Button } from "reactstrap"
import "../Assets/Css/CV.css"
import RutaTutorial from '../Components/tutorial';
import { QAPI } from '../Tools/API';
import { Status } from "../Tools/Status";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


export const ViewCV = ({ role }) => {

    const [cv, setCV] = useState({})

    const ref = React.createRef();

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




    return <>
        <Container id="cvImprimible" style={{ fontFamily: "Homer Simpson UI" }}>
            <Row className="cv-complete">
                <Col className="principalCV" xs="9">
                    <Row className="principalCV-inner">
                        <Row className="separadorCV" style={{}}>Quien Soy</Row>
                        <Row className="content-description"><p className="description-profile">{cv.description}</p></Row>
                        <Row className="separadorCV" style={{}}>Educación</Row>
                        <Row className="itemsCV" style={{}}>
                            {cv.academico ?
                                cv.academico.map((item) => <>
                                    <Col xs="4" className="column-year"><p className="years">{item.year}</p></Col>
                                    <Col xs="8" className="column-description-academy">
                                        <h5 className="academic-title"><b>{item.title}</b></h5>
                                        <p className="academic-description">{item.description}</p>
                                    </Col>
                                </>
                                )
                                : ""}
                        </Row>
                        <Row className="separadorCV" style={{}}>Experiencia Laboral</Row>

                        <Row className="itemsCV" style={{}}>
                            {cv.laboral ?
                                cv.laboral.map((item) => <>
                                    <Col xs="4" className="column-year">
                                        <h5 className="years">{item.year}</h5>
                                    </Col>
                                    <Col xs="8" className="column-description-lab">
                                        <h5 className="title-experience-lab"><b>{item.title}</b></h5>
                                        <p className="name-company">{item.empresa}</p>
                                        <p className="description">{item.description}</p>

                                    </Col>
                                </>
                                )
                                : ""}
                        </Row>
                    </Row>
                </Col>
                <Col xs="3" className="lateralCV">
                    <Row className="name" style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{cv.name} {cv.lastName}</Row>
                    <Row className="div-puesto" style={{ fontSize: "1.2rem" }}>
                        <h5 className="puesto">{cv.puesto}</h5>
                    </Row>
                    <Row className="separadorCV" style={{}}>Perfil</Row>
                    <Row className="div-perfil" style={{}}>
                        <div className="content-email">
                            <h6><b>Email</b></h6>
                            <p>{cv.email}</p>
                        </div>
                        <div className="content-phone">
                            <h6><b>Teléfono</b></h6>
                            <p>+{cv.phone}</p>
                        </div>
                        <div className="content-address">
                            <h6><b>Dirección</b></h6>
                            <p>{cv.address} {cv.city} {cv.cp}</p>
                        </div>


                    </Row>
                    <Row className="separadorCV" style={{}}>Habilidades</Row>
                    <Row className="habilidades" style={{}}>
                        {cv.skill ? cv.skill.map(
                            (item) => <p className="skill-name">
                                <b>- {item.title}</b>
                                {/* ({item.nivel}) */}
                            </p>
                        ) : ""}


                    </Row>
                </Col>
            </Row>

        </Container>
        <div className="row-button">
            <Button
                onClick={() => {

                    var contenido = document.getElementById("cvImprimible").outerHTML;
                    var contenidoOriginal = document.body.innerHTML;

                    document.body.innerHTML = contenido;

                    window.print();

                    document.body.innerHTML = contenidoOriginal;


                }}
            >Imprimir</Button>
            <Button
                onClick={() => {
                    var doc = new jsPDF({ orientation: 'p', format: [595, 842], unit: 'pt' });
                    // doc.html(document.getElementById('cvImprimible').outerHTML, 10, 10);


                    // doc.html(document.getElementById('cvImprimible').outerHTML, {
                    //     callback: function (doc) {
                    //     //   doc.save("a4.pdf");
                    //       doc.output("dataurlnewwindow");
                    //     }
                    //  });

                    // doc.fromHTML(document.getElementById('cvImprimible').outerHTML, 15, 15, {
                    //     'width': 700
                    // });
                    // doc.save('sample_file.pdf');


                    html2canvas(document.getElementById('cvImprimible')).then(canvas => {

                        //Returns the image data URL, parameter: image format and clarity (0-1)
                        var pageData = canvas.toDataURL('image/jpeg', 1.0);

                        //Default vertical direction, size ponits, format a4[595.28,841.89]
                        var pdf = new jsPDF('', 'pt', 'a4');

                        //Two parameters after addImage control the size of the added image, where the page height is compressed according to the width-height ratio column of a4 paper.
                        pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 841.89);

                        pdf.save(`${cv.lastName}.CV.pdf`);
                        // doc.output("dataurlnewwindow");

                    }).catch(error => console.log(error));

                }}
            >Descargar</Button>

            <Button
                href="/CVCreate/"
            >Editar</Button>
        </div>
    </>
}


RutaTutorial.get("MostrarCV")
    .setDescription(<>Puedes imprimir o descargar tu Curriculum Vitae</>)
    .setRender(ViewCV)
    .addRequisito("CreateCV")
    .setMeta("Mostrar CV")
    .setInstrucciones(<>Guarda tu CV</>);