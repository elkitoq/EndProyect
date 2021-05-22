import React, { useState } from 'react';

import { Collapse, List, FormGroup, Input,Button } from 'reactstrap'



export const ViewAddCVData = () => {

    const [lista,setLista] = useState([]);

    const [activo, setActivo] = useState();
    const updater = useState(false);

    const update = () => updater[1](!updater[0]);

    const addExperience=()=>{
        lista.push({title:""});
        setLista(lista);
        setActivo(lista.length-1);

    }

    const onChange = (index,e) =>{
            lista[index].title = e.target.value;
            setLista(lista);
            update();
    }

    return (
        <List className="separado">

            {lista.map((elemento, index) => {
                const toggle = () => {
                    setActivo(index)
                }

                return (
                    <div key={`element${index}`}>
                        <Button href="#" onClick={toggle} className={`list-group-item list-group-item-action ${index === activo ? "active" : ""}`}>{elemento.title}</Button>
                        <Collapse isOpen={index === activo}>
                            <FormGroup className='list-group-item list-group-item-action'>
                                <Input onChange={onChange.bind(undefined,index)} defaultValue={elemento.title} placeholder="Agrege un titulo"/>
                                <Input type="textarea" placeholder="Agrege más detalles"/>
                            </FormGroup>
                        </Collapse>
                    </div>
                );
            })
            }
            <Button onClick={addExperience} className='list-group-item list-group-item-action'>Click para agregar experiencia</Button>
        </List>

    )
}


