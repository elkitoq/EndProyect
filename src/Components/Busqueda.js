
import { useState } from "react";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";


export const Busqueda = ({href="#",text="Buscar",param="b",placeholder="Busqueda"}) => {

    const [buscado,setBuscado] = useState("")

    return(
        <InputGroup>
            <Input 
                autoFocus  
                placeholder={placeholder}
                onChange={(e)=>setBuscado(e.target.value)}
                />
            <InputGroupAddon addonType="append">
                <Button color="secondary" href={`${href}?${param}=${buscado}`}>{text}</Button>
            </InputGroupAddon>
        </InputGroup>
    );
} 