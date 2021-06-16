import { CardText } from "reactstrap";


export const OptionMenu = ({href,children,fontSize='3vh'}) => {
    
   
    return (
        <a href={href}
            color="primary" style= {{ textDecoration: "none" }} className="card bg-primary text-white text-wrap tarjetasQBuscas alinearVertical">
            <CardText
                tag="h5"
                style={{ "fontSize": fontSize }}>
                {children}
                </CardText>
        </a>
    );

}
