
import { useState } from "react";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";


export const Busqueda = ({href="#",text="Buscar",othersButtons,param="b",placeholder="Busqueda",style,className}) => {

    const [buscado,setBuscado] = useState("")

    return(
        <InputGroup style = {style} className={className}>
            <Input 
                autoFocus  
                placeholder={placeholder}
                onChange={(e)=>setBuscado(e.target.value)}
                style={{height:"2.4em"}}
                />
            <InputGroupAddon addonType="append">
                <Button color="secondary" href={`${href}?${param}=${buscado}`}>{text}</Button>
                {Array.isArray(othersButtons)?othersButtons.map(
                    (element,index)=>
                        <Button key={`SearchButton${index}`} color="secondary" href={`${element.href}?${param}=${buscado}`}>{element.text}</Button>
                ):""}
            </InputGroupAddon>
        </InputGroup>
    );
} 