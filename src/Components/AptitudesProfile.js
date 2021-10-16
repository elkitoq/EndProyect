import { AptitudesCards } from "./AptitudesCards"
import { Row } from 'reactstrap'

export const AptitudesProfile = ({ info }) => {

    console.log(info)
    return (
        <Row className="container-aptitudes">
            {/* {info.map((data, index) => { < AptitudesCards key={index} skill={data} /> })} */}
            <AptitudesCards className="cards-skill" skill="javascript" />
            <AptitudesCards className="cards-skill" skill="javascript" />
            <AptitudesCards className="cards-skill" skill="javascript" />
            <AptitudesCards className="cards-skill" skill="javascript" />
        </Row>

    )
}