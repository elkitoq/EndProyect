import { FormGroup, Input, Label } from "reactstrap";


export const FormItem = ({name,idInput=name,type}) =>
    <FormGroup>
        <Label for={idInput}>
            {name}
            </Label>
        <Input className="input" type={type}/>
    </FormGroup>