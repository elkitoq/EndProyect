import { useEffect, useState } from "react";
import { Card, CardText, CardBody, CardImg, Col, Row, DropdownToggle, Dropdown, DropdownMenu, DropdownItem, Navbar, Nav } from "reactstrap";
import '../Assets/Css/cardWorker.css'

export const CardDisplay = ({ api, children, get }) => {
    const tarjeta = api.getHookData();


    const Cards = tarjeta.map((elemento, index) =>
        <Col xs="3" key={`card-${index}`}>
            <div key={`card-${index}`}>
                <Card className="card-worker">
                    <CardBody className="card-body">
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                            {children.map((card, index) => {
                                if (card.type.name==="CardText")
                                return (
                                    <CardText key={`CardText-${index}`}>
                                        {card.props.children}
                                        <b>{
                                            card.key ? elemento[card.key] :
                                                card.props.text ? card.props.text :
                                                    card.props.func ? card.props.func(elemento) :
                                                        ""}
                                        </b>
                                    </CardText>);
                                else if (card.type.name==="CardImg")
                                return <Col className="col-img" sm="12" md={{ size: 7, offset: 3 }}><CardImg className="container-img" top width="128px" height="170px" src={`${card.props.func(elemento)}`} alt="No se puede mostrar foto" /></Col>
                            })}
                        </Col>
                    </CardBody>
                </Card>
            </div>
        </Col>
    )

    // const Table = 



    const paginas = [1, 10, 50, 100];
    const [pages, setPages] = useState(0);

    useEffect(() => {
        api.get(get);
        console.log("Reimpreso");
        setPages(paginas.findIndex((e) => e === get.results))
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , []);

    return (
        <>

            <Navbar >
                <Nav>
                    <Selector items={["Tarjetas", "Tabla"]} />
                    <Selector items={paginas} select={pages} onChange={(n) => { get.results = paginas[n]; api.get(get); setPages(paginas.findIndex((e) => e === get.results)) }} />
                </Nav>
            </Navbar>
            <Row>
                {tarjeta.length > 0 ? Cards : ""}
            </Row>
        </>
    );
}


// export const CardWorker = (elemento, index) => {
//     return (
//         <div key={`cardWorker-${index}`}>
//             <Card>
//                 <Row className="no-gutters">

//                     <Col xs="8">
//                     <CardText>
//                         Nombre: <b>{` ${elemento.name.last}, ${elemento.name.first}`}</b>
//                     </CardText>
//                     <CardText>
//                         Email: <b>{`${elemento.email.replace(/(@)([a-z]*)/, "@trabajesparatodes")}`}</b>
//                     </CardText>
//                     <CardText>
//                         Telefono: <b>{`${elemento.cell}`}</b>
//                     </CardText>
//                     <CardText>
//                         Ocupacion: <b>{`${elemento.job}`}</b>
//                     </CardText>
//                     </Col>
//                     <Col xs="3">
//                         <img width="200px" height="200px" src={`${elemento.picture.large  }`} alt="No se puede mostrar foto de Perfil" />
//                     </Col>
//                 </Row>


//             </Card>
//         </div>
//     );
// }


const Selector = ({ onChange = () => { }, items, select }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownSelect, setDropdownSelect] = useState(0);

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
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
        </Dropdown>
    );

}