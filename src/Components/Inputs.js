import { Input } from 'reactstrap'

export const Inputs = ({ name, classname, type }) => {
    return (
        <Input type={type} className={classname} name={name} />
    )
}