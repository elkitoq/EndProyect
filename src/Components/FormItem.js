import { FormGroup, Input, Label } from "reactstrap";


export const FormItem = ({ name, idInput = name, type, autoComplete, className = "", reference = { values: {}, onChange: () => { } }, children, minLength
}) =>
    <FormGroup>
        <Label for={idInput}>
            {name}
        </Label>
        <Input
            minLength={minLength}
            defaultValue={reference.values[reference.id]}
            className={className}
            type={type}
            onChange={load.bind(this, reference)}
            autoComplete={type === "password" ? "off" : autoComplete}
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