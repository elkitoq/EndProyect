import { useHistory } from "react-router";
import { Card, CardText } from "reactstrap";


export const OptionMenu = ({href,children,fontSize='3vh'}) => {
    
    // const history = useHistory();

    const routeChange = (path) => {
        // history.push(path);

    }
    
    return (
        <a href={href}
            body inverse color="primary" style= {{ textDecoration: "none" }} className="card bg-primary text-white text-wrap tarjetasQBuscas alinearVertical">
            <CardText
                tag="h5"
                style={{ "fontSize": fontSize }}>
                {children}
                </CardText>
        </a>
    );

}
