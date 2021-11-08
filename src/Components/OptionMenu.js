import { CardText } from "reactstrap";


export const OptionMenu = ({ href, children, fontSize = '2vh' ,...props}) => {


    return (
        <a href={href}
            color="primary" style={{ textDecoration: "none" }} className="card bg-primary text-white text-wrap tarjetasQBuscas alinearVertical">
            <CardText
                {...props}
                tag="h5"
                style={{ "fontSize": fontSize }}>
                {children}
            </CardText>
        </a>
    );

}
