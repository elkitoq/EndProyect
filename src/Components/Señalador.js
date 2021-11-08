
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Popover, PopoverBody, PopoverHeader, Tooltip } from "reactstrap";

export const Señalador = ({ marca, texto = marca }) => <Link to={window.location} onClick={() => sign(marca)}>{texto}</Link>


const marcas = {};

export const Señalado2 = ({ marca, title, text }) => {

    const [popoverOpen, setPopoverOpen] = useState(false);

    if (marcas[marca] === undefined)
        marcas[marca] = {
            title,
            text
        }
    marcas[marca].toggle = () => setPopoverOpen(!popoverOpen);

    return (<>
        <div id={marca} style={{ backgroundColor: "#CCE01F", float: "right", zIndex: 10, marginRight: "-20px" }}>?</div>
        <Popover placement="bottom" isOpen={popoverOpen} target={marca} toggle={marcas[marca].toggle} >
            <PopoverHeader>{marcas[marca].title}</PopoverHeader>
            <PopoverBody>{marcas[marca].text}
                <Button size="sm" onClick={marcas[marca].toggle} style={{ float: "right" }}>OK</Button>
            </PopoverBody>
        </Popover></>)
}

export const Señalado = ({ marca, title, text }) => {

    const [popoverOpen, setPopoverOpen] = useState(false);

    if (marcas[marca] === undefined)
        marcas[marca] = {
            title,
            text
        }
    else marcas[marca].text=text
    marcas[marca].toggle = () => setPopoverOpen(!popoverOpen);

    return (<>
        {/* <div id={marca} style={{ backgroundColor: "#CCE01F",color:#565B2F, float: "right", zIndex: 10, marginRight: "-20px" }}>?</div> */}

        <Tooltip placement="bottom" isOpen={popoverOpen} target={marca} toggle={marcas[marca].toggle}>
            {(typeof marcas[marca].text==='function')?marcas[marca].text():marcas[marca].text}
        </Tooltip>
        </>)
}

const sign = (marca) => {
    if (marcas[marca] !== undefined)
        marcas[marca].toggle();
}