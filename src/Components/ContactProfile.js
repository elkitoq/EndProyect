import { Container } from 'reactstrap'
import emailImg from '../Assets/icons/noun_Email.png'
import phoneImg from '../Assets/icons/noun_Phone_2217151.png'

export const ContactProfile = ({ email, number }) => {
    return (
        <Container className="card-contact">
            <div className="title">
                <h5>Contacto</h5>
            </div>
            <div className="email">
                <span><img src={emailImg} width="20px" /> Email: </span>
                <p><a href={"mailto:" + email}>{email}</a></p>

            </div>
            <div className="phone">
                <span><img src={phoneImg} width="20px" /> Teléfono: </span>
                <p>{number}</p>

            </div>
        </Container>
    )
}



