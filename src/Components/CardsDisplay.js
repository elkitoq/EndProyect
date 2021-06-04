import { useState } from "react";
import { Button, Card, CardBody, CardImg, CardText, Col, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


export const CardsDisplay = ({ api, children }) => {

    const [modal, setModal] = useState(false);
    const [modalContents, setModalContents] = useState("");

    const toggle = () => setModal(!modal);

    const onClick = (id) => {
        setModalContents(CardCustom(api.getHookData()[id], false))
        toggle();
    }

    const ModalCard = () =>
        <Modal isOpen={modal} toggle={toggle} >
            <ModalBody children={modalContents}>

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>

    const CardCustom = (elemento,hideData=true) =>

        <Card className="card-worker">

            <CardBody className="card-body">
                <Col md="12" lg={{ size: 8, offset: 2 }}>
                    {children.map((card, index) => {
                        const contenido =
                            card.key ? elemento[card.key] :
                                card.props.text ? card.props.text :
                                    card.props.func ? card.props.func(elemento) :
                                        ""
                        if (card.type.name === "CardText"){
                            if (card.props.hideData!==hideData)
                            return (
                                <CardText className="text-truncate" key={`CardText-${index}`} data-toggle="tooltip" title={contenido}>
                                    {card.props.children}
                                    <b>{contenido}</b>
                                </CardText>);
                            else return "";
                        }
                        else if (card.type.name === "CardImg")
                            return <Col key={`CardImg-${index}`} className="col-img" xs={{ size: 4, offset: 4 }} md={{ size: 6, offset: 3 }}><CardImg className="container-img" style={{ borderRadius: "2000px" }} top src={`${contenido}`} alt="No se puede mostrar foto" /></Col>
                        return card;
                    })}
                </Col>
            </CardBody>
        </Card>

    return (
        <>
            <ModalCard />
            {api.getHookData().map((elemento, index) =>
                <Col key={`Card-${index}`} xs="12" sm="12" md="6" lg="3" onClick={onClick.bind(this, index)}>
                    {CardCustom(elemento)}
                </Col>
            )
            }
        </>)



}

