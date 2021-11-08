import { Card, CardBody, CardImg, CardText, Col, Row } from "reactstrap";


export const CardsDisplay = ({ api, children, onClick }) =>
    <Row className="display-overflow">
        {api.getHookData().map((elemento, index) =>
            <Col key={`Card-${index}`} xs="12" sm="12" md="6" lg="3" onClick={onClick.bind(this, index)}>
                {CardCustom(elemento, children, elemento.selected)}
            </Col>
        )
        }
    </Row>


export const CardCustom = (elemento, template, selected = false, hideData = true) =>

    <Card className="card-worker" inverse={selected} color={selected ? "primary" : ""} >

        <CardBody className="card-body">
            <Col md="12" lg={{ size: 8, offset: 2 }}>
                {template.map((card, index) => {
                    const contenido =
                        (card.key && elemento[card.key]) ? elemento[card.key] :
                            card.props.text ? card.props.text :
                                card.props.func ? card.props.func(elemento) || "" :
                                    ""
                    if (card.type.name === "CardText") {
                        if (card.props.hideData !== hideData)
                            return (
                                <CardText
                                    className={card.props.className || "text-truncate"}
                                    key={`CardText-${index}`}
                                    data-toggle="tooltip"
                                    title={contenido}>
                                    {card.props.children}
                                    <b>{
                                    typeof contenido === 'string'?
                                    contenido
                                        .split('\n')
                                        .map((e,i) => <span key={i}>{e}<br /></span>)
                                    :contenido}
                                    </b>
                                </CardText>);
                        else return "";
                    }
                    else if (card.type.name === "CardImg")
                        return <Col key={`CardImg-${index}`} className="col-img" xs={{ size: 4, offset: 4 }} md={{ size: 6, offset: 3 }}>{contenido?<CardImg className="container-img" style={{ borderRadius: "2000px" }} top src={`${contenido}`} alt="No se puede mostrar foto" />:""}</Col>
                    return card;
                })}
            </Col>
        </CardBody>
    </Card>

