import { Table } from "reactstrap";

export const TableDisplay = ({ api, children }) => <Table striped>
    <thead>
        <tr>
            {children.map((card, index) => {
                if (card.type.name === "CardText"){
                    if (card.props.hideData!==true)
                    return (
                        <th className="text-truncate" key={`th-${index}`}>
                            {card.props.children}
                        </th>);
                    return "";}
                return <th className="text-truncate" key={`th-${index}`}></th>
            })}
        </tr>
    </thead>
    <tbody>
        {api.getHookData().map((elemento, i) =>
            <tr key={`Card-${i}`}>
                {children.map((card, index) => {
                    if (card.type.name === "CardText"){
                        if (card.props.hideData!==true)
                        return (
                            <td className="text-truncate" key={`CardText-${index}`} data-toggle="tooltip" title="Disabled asdasd">
                                {card.key ? elemento[card.key] :
                                    card.props.text ? card.props.text :
                                        card.props.func ? card.props.func(elemento) :
                                            ""}
                            </td>);
                        return "";}
                    else if (card.type.name === "CardImg")
                        return <td key={`CardImg-${index}`}><img className="container-img" height="30px" style={{ borderRadius: "15px" }} src={`${card.props.func(elemento)}`} alt="No se puede mostrar foto" /></td>
                    return card;
                })}
            </tr>
        )}
    </tbody>

</Table>