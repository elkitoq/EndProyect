
import { Button } from 'reactstrap'

export const Buttons = ({ name, color, size, blocks }) => {
    return (
        <Button color={color} size={size} block>{name}</Button>
    )
}