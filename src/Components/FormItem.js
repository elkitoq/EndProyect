import { FormGroup, Input, Label } from "reactstrap";


export const FormItem = ({ name, idInput = name, type, reference={value:"",onChange:()=>{}}
}) => 
        <FormGroup>
            <Label for={idInput}>
                {name}
            </Label>
            <Input
                defaultValue={reference.value}
                className="input"
                type={type}
                onChange={(e) => {
                    reference.value = e.target.value;
                    reference.onChange();
                }
                } />
        </FormGroup>
