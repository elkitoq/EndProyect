
import { useState } from "react";
import { Button, Form, Input, InputGroup, InputGroupAddon } from "reactstrap";


export const Busqueda = ({ href = "#", text = "Buscar", othersButtons, param = "b", placeholder = "Busqueda", style, className, defaultValue, ...props}) => {

    const [buscado, setBuscado] = useState("")

    return (
        <Form action={href} className="form-busqueda">
            <InputGroup style={style} className={className}>
                <Input
                    {...props}
                    name={param}
                    autoFocus
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={(e) => setBuscado(e.target.value)}
                    style={{ height: "2.4em" }}
                />
                <InputGroupAddon addonType="append">
                    <Button >{text}</Button>
                    {Array.isArray(othersButtons) ? othersButtons.map(
                        (element, index) =>
                            <Button key={`SearchButton${index}`} href={`${element.href}?${element.param || param}=${buscado}`}>{element.text}</Button>
                    ) : ""}
                </InputGroupAddon>
            </InputGroup>
        </Form>

    );
}