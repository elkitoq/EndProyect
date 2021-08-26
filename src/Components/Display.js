import { useEffect, useState } from "react";
import { Row, DropdownToggle, DropdownMenu, DropdownItem, Navbar, Nav, UncontrolledDropdown, Modal, ModalBody, ModalFooter, Button, ButtonGroup } from "reactstrap";
import '../Assets/Css/cardWorker.css'
import { CardsDisplay, CardCustom } from "./CardsDisplay";
import { TableDisplay } from "./TableDisplay";
import { Pagination } from "./Pagination";
import API, { APIComponent } from "../Tools/API";
import { useContext } from "react";
import { Status } from "../Tools/Status";

export const Display = ({children, api=API.getApiComponent(children,APIComponent.mode.ARRAY), get }) => {
    const paginas = [1, 10, 50, 100];

    const status = useContext(Status.Context)

    if (status.get("apiConsumer") === undefined) {
        get.results = get.results || 10;
        status.set("apiConsumer",{ pages: paginas.findIndex((e) => e === get.results), type: 0 })
    } else if (get.results === undefined)
        get.results = paginas[status.get("apiConsumer").pages]

    const [type, setType] = useState(status.get("apiConsumer").type);

    useEffect(() => {
        getNewData();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getNewData = () => {
        api.get(get).then((r) => {
            status.get("apiConsumer").pages = paginas.findIndex((e) => e === get.results)
            status.save("apiConsumer");
            console.log(api.getHookData());

        });
    }

    

    const [modal, setModal] = useState(false);
    const [modalContents, setModalContents] = useState("");
    const toggle = () => setModal(!modal);

    const [selectMode, setSelectMode] = useState(false)

    const onClick = (id) => {
        if (!selectMode) {
            setModalContents(CardCustom(api.getHookData()[id], children, false, false))
            toggle();
        }
        else{
            api.getHookData()[id].selected=!api.getHookData()[id].selected;
            api.refresh()
        }
    }
    
    const togleSelectMode = () => {
        if (selectMode)
            selectAll(false)
        setSelectMode(!selectMode);
    }
    
    const selectAll=(select)=>{
        for (var elemento of api.getHookData())
            if (select===undefined)
                elemento.selected=!elemento.selected;
            else
                elemento.selected=select
        api.refresh()
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



    return (
        <>

            <Navbar >
                <Nav>
                    <Selector items={["Tarjetas", "Tabla"]} select={type} onChange={(n) => { setType(n); status.get("apiConsumer").type = n; status.save("apiConsumer") }} />
                    <Selector items={paginas} select={status.get("apiConsumer").pages} onChange={(n) => { status.get("apiConsumer").pages = n;  status.save("apiConsumer"); get.results = paginas[n]; getNewData(); }} />
                    <Pagination pages={api.getHookInfo().pages} />
                    <Button outline={!selectMode} color="primary" onClick={togleSelectMode}>Seleccionar</Button>
                    <ButtonGroup hidden={!selectMode}>
                        <Button color="primary" onClick={() => selectAll(true)}>Todos</Button>
                        <Button color="primary" onClick={() => selectAll(false)}>Ninguno</Button>
                        <Button color="primary" onClick={() => selectAll()}>invertir</Button>
                    </ButtonGroup>
                </Nav>
            </Navbar>
            <ModalCard />
            <Row>
                {api.getHookData().length > 0 ?
                    type === 0 ?
                        <CardsDisplay api={api} children={children} onClick={onClick} /> :
                        <TableDisplay api={api} children={children} onClick={onClick} /> :
                    ""}
            </Row>
        </>
    );
}


const Selector = ({ onChange = () => { }, items, select }) => {

    const [dropdownSelect, setDropdownSelect] = useState(0);

    return (
        <UncontrolledDropdown >
            <DropdownToggle caret color="primary" outline >
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