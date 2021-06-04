import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Row, DropdownToggle, DropdownMenu, DropdownItem, Navbar, Nav, UncontrolledDropdown, Modal, ModalBody, ModalFooter, Button, ButtonGroup } from "reactstrap";
import '../Assets/Css/cardWorker.css'
import { CardsDisplay, CardCustom } from "./CardsDisplay";
import { TableDisplay } from "./TableDisplay";
import { Pagination } from "./Pagination";

export const Display = ({ api, children, get }) => {
    const paginas = [1, 10, 50, 100];
    const [cookie, setCookie] = useCookies(["apiConsumer"])

    if (cookie.apiConsumer === undefined) {
        get.results = get.results || 10;
        cookie.apiConsumer = { pages: paginas.findIndex((e) => e === get.results), type: 0 }
        setCookie("apiConsumer", cookie.apiConsumer, { path: '/' })
    } else if (get.results === undefined)
        get.results = paginas[cookie.apiConsumer.pages]


    // const [pages, setPages] = useCookies("apiConsumer")
    const [type, setType] = useState(cookie.apiConsumer.type);

    const useComponentWillMount = (func) => {
        const willMount = useRef(true)
        if (willMount.current) func()
        willMount.current = false
    }


    const getNewData = () => {
        api.get(get).then((r) => {
            cookie.apiConsumer.pages = paginas.findIndex((e) => e === get.results)
            setCookie("apiConsumer", cookie.apiConsumer, { path: '/' });
            console.log(api.getHookData());
            // api.getHookData()[2].selected=!api.getHookData()[2].selected
        });
    }

    useComponentWillMount(getNewData);

    

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
                    <Selector items={["Tarjetas", "Tabla"]} select={type} onChange={(n) => { setType(n); cookie.apiConsumer.type = n; setCookie("apiConsumer", cookie.apiConsumer, { path: '/' }) }} />
                    <Selector items={paginas} select={cookie.apiConsumer.pages} onChange={(n) => { cookie.apiConsumer.pages = n; get.results = paginas[n]; getNewData(); }} />
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