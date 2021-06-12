import { FormGroup, Input, Label } from "reactstrap";


export const FormItem = ({ name, idInput = name, autoComplete, reference = { values: {}, onChange: () => { } }, children, ...props
}) =>
    <FormGroup>
        <Label for={idInput}>
            {name}
        </Label>
        <Input
            
            defaultValue={reference.values[reference.id]}
            {...props}
            onChange={load.bind(this, reference)}
            autoComplete={props.type === "password" ? "off" : autoComplete}
        >
            {children}
        </Input>
    </FormGroup>

const load = (reference, e) => {
    if (reference.id !== undefined || reference.id !== null)
        reference.values[reference.id] = e.target.value;
    if (typeof reference.onChange === "function")
        reference.onChange(e);
}