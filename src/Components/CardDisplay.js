import { useEffect, useState } from "react";
import { Card, CardText, CardBody, CardImg, Col, Row, DropdownToggle,  DropdownMenu, DropdownItem, Navbar, Nav, UncontrolledDropdown, Table } from "reactstrap";
import '../Assets/Css/cardWorker.css'

export const CardDisplay = ({ api, children, get }) => {
    const elementos = api.getHookData();

    const Cards = elementos.map((elemento, index) =>
        <Col xs="12" key={`card-${index}`} sm="12" md="6" lg="3">
            <div key={`card-${index}`}>
                <Card className="card-worker">
                    <CardBody className="card-body">
                        <Col md="12" lg={{ size: 8, offset: 2 }}>
                            {children.map((card, index) => {
                                const contenido =
                                    card.key ? elemento[card.key] :
                                        card.props.text ? card.props.text :
                                            card.props.func ? card.props.func(elemento) :
                                                ""
                                if (card.type.name === "CardText")
                                    return (
                                        <CardText className="text-truncate" key={`CardText-${index}`} data-toggle="tooltip" title={contenido}>
                                            {card.props.children}
                                            <b>{contenido}</b>
                                        </CardText>);
                                else if (card.type.name === "CardImg")
                                    return <Col className="col-img" xs={{ size: 7, offset: 3 }}><CardImg className="container-img" top src={`${contenido}`} alt="No se puede mostrar foto" /></Col>
                                return card;
                            })}
                        </Col>
                    </CardBody>
                </Card>
            </div>
        </Col>
    )

    const Tabla = <Table>
        <thead>
            <tr>
                {children.map((card, index) => {
                    if (card.type.name === "CardText")
                        return (
                            <th className="text-truncate" key={`th-${index}`}>
                                {card.props.children}
                            </th>);
                    return <th className="text-truncate" key={`th-${index}`}></th>
                })}
            </tr>
        </thead>
        <tbody>
            {elementos.map((elemento, i) =>
                <tr>
                    {children.map((card, index) => {
                        if (card.type.name === "CardText")
                            return (
                                <td className="text-truncate" key={`CardText-${index}`} data-toggle="tooltip" title="Disabled asdasd">
                                    {card.key ? elemento[card.key] :
                                        card.props.text ? card.props.text :
                                            card.props.func ? card.props.func(elemento) :
                                                ""}
                                </td>);
                        else if (card.type.name === "CardImg")
                            return <img className="container-img" height="50px" style={{ "border-radius": "100px" }} src={`${card.props.func(elemento)}`} alt="No se puede mostrar foto" />
                        return card;
                    })}
                </tr>
            )}
        </tbody>

    </Table>



    const paginas = [1, 10, 50, 100];
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(0);
    const [type, setType] = useState(0);


    useEffect(() => {
        api.get(get);
        console.log(api.getData());
        setPages(paginas.findIndex((e) => e === get.results))
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , []);

    return (
        <>

            <Navbar >
                <Nav>
                    <Selector items={["Tarjetas", "Tabla"]} onChange={(n) => { setType(n) }} />
                    <Selector items={paginas} select={pages} onChange={(n) => { get.results = paginas[n]; api.get(get); setPages(paginas.findIndex((e) => e === get.results)) }} />
                </Nav>
            </Navbar>
            <Row>
                {elementos.length > 0 ?
                    type === 0 ?
                        Cards :
                        Tabla :
                    ""}
            </Row>
        </>
    );
}


const Selector = ({ onChange = () => { }, items, select }) => {

    const [dropdownSelect, setDropdownSelect] = useState(0);

    return (
        <UncontrolledDropdown>
            <DropdownToggle caret>
                {items[select || dropdownSelect]}
            </DropdownToggle>
            <DropdownMenu>
                {items.map((elemento, index) =>
                    <DropdownItem key={`drop-${index}`} onClick={() => {
                        setDropdownSelect(index);
                        onChange(index)
                    }}>
                        {elemento}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </UncontrolledDropdown>
    );

}