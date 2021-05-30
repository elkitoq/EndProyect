import { FormGroup, Input, Label } from "reactstrap";


export const FormItem = ({ name, idInput = name, type,autoComplete , reference = { values: {}, onChange: () => { } }
}) =>
    <FormGroup>
        <Label for={idInput}>
            {name}
        </Label>
        <Input
            defaultValue={reference.values[reference.id]}
            className="input"
            type={type}
            onChange={(e) => {
                if (reference.id !== undefined || reference.id !== null)
                    reference.values[reference.id] = e.target.value;
                if (typeof reference.onChange === "function")
                    reference.onChange(e);
            }} 

            autoComplete={type==="password"?"off":autoComplete}
            
            />
    </FormGroup>
