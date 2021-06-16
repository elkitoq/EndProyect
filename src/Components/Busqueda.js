
import { useState } from "react";
import { Button, Form, Input, InputGroup, InputGroupAddon } from "reactstrap";


export const Busqueda = ({href="#",text="Buscar",othersButtons,param="b",placeholder="Busqueda",style,className}) => {

    const [buscado,setBuscado] = useState("")

    return(
        <Form action={href}>
            <InputGroup style = {style} className={className}>
            <Input 
                name={param}
                autoFocus  
                placeholder={placeholder}
                onChange={(e)=>setBuscado(e.target.value)}
                style={{height:"2.4em"}}
                />
            <InputGroupAddon addonType="append">
                <Button color="secondary">{text}</Button>
                {Array.isArray(othersButtons)?othersButtons.map(
                    (element,index)=>
                        <Button key={`SearchButton${index}`} color="secondary" href={`${element.href}?${param}=${buscado}`}>{element.text}</Button>
                ):""}
            </InputGroupAddon>
            </InputGroup>
        </Form>
        
    );
} 