
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap'

export const CardProfileAspirant = ({ nameUser, profession, aboutme, imgUser }) => {
    return (
        <Card className="card-content-about-me">
            <div className="container">
                <div className="header-card">
                    <CardImg className="avatar-profile-image" top src={imgUser||"https://randomuser.me/api/portraits/men/86.jpg"} alt="avatar" />
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