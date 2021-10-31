import { Row } from "reactstrap"
import { PostulacionesCards } from '../Components/PostulacionesCards'

export const PostulacionesProfile = ({ info = [] }) => {
    return (
        <Row className="container-postulaciones">
            {info.map((data, index) => < PostulacionesCards className="postulaciones-cards" key={"das" + index} postulacion={data} />)}
        </Row>
    )
}