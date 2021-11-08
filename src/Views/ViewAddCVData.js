import React, { useState } from 'react';

import { Collapse, List, FormGroup, Input, Button, Row, ButtonGroup } from 'reactstrap'



export const ViewAddCVData = ({reference = { values: {}, onChange: () => { } }, children}) => {

    // const [lista, setLista] = useState([]);

    const [activo, setActivo] = useState(-1);
    const updater = useState(false);

    const update = () => updater[1](!updater[0]);


    // const send=()=>{
    //     if (reference.id !== undefined || reference.id !== null){
    //         reference.values[reference.id]=lista
    //         reference.onChange()
    //     }
    // }

    const addExperience = () => {
        // lista.push({ title: "" });
        console.log(reference.values);
        if (!Array.isArray(reference.values[reference.id]))
            reference.values[reference.id]=[]
            reference.values[reference.id].push({ title: ""})
        // setLista(lista);
            reference.onChange()
        // setActivo(lista.length - 1);
        setActivo(reference.values[reference.id].length - 1)
        
        // send();
        

    }

    const onChange = (index, e) => {
        // lista[index].title = e.target.value;
        reference.values[reference.id][index][e.target.getAttribute("idinput")] = e.target.value;
        // setLista(lista);
        // update();
        reference.onChange()
        // send();
        console.log(reference.values);
    }

    const remove=(index)=>{
        console.log('Borrando '+index);
        reference.values[reference.id].splice(index,1);
        reference.onChange()
        setActivo(-1);
    }

    return (
        <List className="separado">

            {(Array.isArray(reference.values[reference.id]))?
            reference.values[reference.id].map((elemento, index) => {
                const toggle = () => {
                    if (activo !== index)
                    setActivo(index)
                    else
                    setActivo(-1)
                }

                return (
                    <div key={`element${index}`}>
                        <Row>
                        <ButtonGroup>
                        <Button href="#" onClick={toggle} className={`list-group-item list-group-item-action ${index === activo ? "active" : ""}`}>{elemento.title}</Button>
                        <Button href="#" onClick={()=>{remove(index)}}>X</Button>
                        </ButtonGroup>
                        </Row>
                        <Collapse isOpen={index === activo}>
                            <FormGroup className='list-group-item list-group-item-action'>
                                {children.map((child,i)=>
                                <Input 
                                    idInput={child.props.idInput}
                                    type={child.props.type} 
                                    onChange={onChange.bind(undefined, index)} 
                                    defaultValue={elemento[child.props.idInput]} 
                                    placeholder={child.props.placeholder} 
                                    children={child.props.children}/>
                                )}
                            </FormGroup>
                        </Collapse>
                    </div>
                );
            })
            :""}
            <Button onClick={addExperience} className={`list-group-item list-group-item-action ${activo===-1 ? "active" : ""}`}>Click para agregar</Button>
        </List>

    )
}


