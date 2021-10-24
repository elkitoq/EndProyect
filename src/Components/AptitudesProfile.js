import { AptitudesCards } from "./AptitudesCards"
import { Row } from 'reactstrap'

export const AptitudesProfile = ({ info=[] }) => {

    console.log(info.length)
    console.log(info)
    return (
        <Row className="container-aptitudes">
            {info.map((data, index) => < AptitudesCards className="cards-skill" key={"asd"+index} skill={data} /> )}
        </Row>

    )
}