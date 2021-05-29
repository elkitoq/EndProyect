import { Button, Container, Row } from "reactstrap";
import { OptionMenu } from "../Components/OptionMenu";

import '../Assets/Css/home.css';
import API from "../Tools/API";
import { useState } from "react";


export const ViewHome = () => {

    const api = new API('http://localhost:4000/api');

    const [get,setGet] = useState("hola");

    const getf = async () =>{
        const {data} = await api.get();
        console.log(data);
        setGet(data);
    }

    const post = () =>{
        api.post({pull:(get.pull || 0)+1,ok:200});
        getf();
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
                <div>{JSON.stringify(get)}</div>
                <Button onClick={post}>post</Button>
            </div>
        </Container>
    );
}