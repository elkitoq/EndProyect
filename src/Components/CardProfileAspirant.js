import logo from '../Assets/image/logo_nabvar.png'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap'

export const CardProfileAspirant = ({ nameUser, profession, aboutme, imgUser }) => {
    return (
        <Card className="card-content-about-me">
            <div className="container">
                <div className="header-card">
                    <CardImg className="avatar-profile-image" top src="https://scontent.fmdz4-1.fna.fbcdn.net/v/t1.6435-9/95606563_105272384519820_7588751322728366080_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=LWZNb4NnjDMAX9WEmz9&_nc_ht=scontent.fmdz4-1.fna&oh=2b4d3c2f1dc316766db99e3c8566e313&oe=61525BFC" alt="avatar" />
                    <CardTitle tag="h4">
                        {nameUser}
                    </CardTitle>
                    <CardSubtitle tag="h6">
                        {profession}
                    </CardSubtitle>
                </div>
                <CardBody>
                    <CardTitle tag="h5">
                        Sobre Mi
                    </CardTitle>
                    <CardText>
                        {aboutme}
                    </CardText>
                </CardBody>
            </div>
        </Card>
    )
}