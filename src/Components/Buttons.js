import { Button } from 'reactstrap'

export const Buttons = ({ name, color, size }) => {
    return (
        <Button color={color} size={size}>{name}</Button>
    )
}