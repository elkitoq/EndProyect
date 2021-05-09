import { Label } from 'reactstrap'

export const Labels = ({ name, idInput }) => {
    return (
        <Label for={idInput}>{name}</Label>
    )
}