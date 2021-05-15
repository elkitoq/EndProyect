import { Button, Col, Container } from "reactstrap";




export const ViewHomeAspirante = () => {
    return (
        <Container>
            <Col>
            
            <h1>Pagina de inicio para Aspirantes</h1>
            <Button href="/offerService/">ofrecer Servicio</Button>
            <Button href="/CVCreate/">CrearCV</Button>
            <Button href="/message/">Ver mensajes</Button>
            
            </Col>
            
        </Container>
        
        );
    }