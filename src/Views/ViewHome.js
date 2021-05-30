import { Button, Container, Row } from "reactstrap";
import { OptionMenu } from "../Components/OptionMenu";

import '../Assets/Css/home.css';
import API from "../Tools/API";
import { useState } from "react";


export const ViewHome = () => {

    const api = new API('/api',useState("hola"));

    const post = () =>{
        api.post({pull:(api.getData().pull || 0)+1,ok:200});
    }


    return (
        <Container className="abs-center">
            <div className="text-center">
                <h1>Bienvenido</h1>
                <h2>¿Que estas buscando hoy?</h2>
                <Row className="">
                    <OptionMenu href="/lookforJob/"                     >Necesito Trabajo</OptionMenu>
                    <OptionMenu href="/offerService/"  fontSize="2vh"   >Quiero ofrecer mis humildes servicios</OptionMenu>
                    <OptionMenu href="/lookforWorker/" fontSize="2vh"   >Busco trabajadores para mi viña/pequeño emprendimiento lucrativo</OptionMenu>
                </Row>
                <div>{JSON.stringify(api.getHookData())}</div>
                <Button onClick={post}>post</Button>
            </div>
        </Container>
    );
}