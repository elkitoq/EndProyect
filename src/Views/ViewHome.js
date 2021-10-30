import { Container, Row, Button } from "reactstrap";
import { OptionMenu } from "../Components/OptionMenu";

import '../Assets/Css/home.css';
import RutaTutorial from "../Components/tutorial";
import { Señalador } from "../Components/Señalador";







import { Form } from '../Components/Form';
import API, { APIComponent } from "../Tools/API";
import { FormItem } from "../Components/FormItem";
import { useState } from "react";
import { APIConsumer } from "../Tools/ApiConsumer";
import { useContext } from "react";




export const ViewHome = () => <Container className="abs-center container-home no-scroll">
    <div className="text-center">
        <div className="title-center">
            <h1>Bienvenido</h1>
            <h2>¿Que estas buscando hoy?</h2>
        </div>
        <Row className="menu-home">
            <OptionMenu href="/lookforJob/">Busco Empleo</OptionMenu>
            <OptionMenu href="/createService/" fontSize="2vh">Ofrecer mis servicios</OptionMenu>
            <OptionMenu href="/lookforWorker/" fontSize="2vh">Busco empleados</OptionMenu>
        </Row>
        <TestApi/>
    </div>
</Container>


RutaTutorial.get("Home")
    .setDescription(<>Puedes ver la pagina inicial</>)
    .setInstrucciones(<>Has clic en nuestro <Señalador marca="logo" />, está en la esquina superior izquierda de la pagina</>)
    .setRender(ViewHome)
    ;


export const TestApi = () =>{
    
    const [ok,setOk] = useState(0)
    
    const add = () => setOk(ok+1)

    const get = () => API.get('/api').get()


    //const apis = useContext(APIConsumer.apis)
    const [api,setApi] = useState({toString:()=>"asd"})
    APIConsumer.get('/api',setApi)

    console.log({api});

    return <>{ok}
    <Form method='post'>
        <APIComponent url='/api'>
            {API.get('/api')?API.get('/api').toString():""}
        </APIComponent>
        <FormItem name="Pull" idInput="pull" />
        <FormItem name="View" idInput="view" />
        <FormItem name="Hola" idInput="hola" />
        <Button>Go</Button>
    </Form>

    <Button
        onClick = {get}
    >Get</Button>
    <Button
        onClick = {add}
    >Add</Button>

    {api.toString()}
    <APIConsumer url='/api'>
        {api.toString()}
    </APIConsumer>

</>}