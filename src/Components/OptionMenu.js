import { useHistory } from "react-router";
import { Card, CardText } from "reactstrap";


export const OptionMenu = ({href,children,fontSize='3vh'}) => {
    const history = useHistory();

    const routeChange = (path) => {
        history.push(path);
    }
    
    return (
        <Card onClick={routeChange.bind(this, href)}
            body inverse color="primary" className="text-wrap tarjetasQBuscas alinearVertical">
            <CardText
                tag="h5"
                style={{ "fontSize": fontSize }}>
                {children}
                </CardText>
        </Card>
    );

}
