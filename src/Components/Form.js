
import React from 'react';
import { Form as FormB } from 'reactstrap'

export const Form = ({ onSubmit, children, api }) => {

    const createClone = (element) => {
        console.log(element);
        if (element.type.name === "FormItem") {
            const id = element.props.idInput || element.props.name;
            return React.cloneElement(element, {
                key: id,
                reference: {
                    values: api.getHookData(),
                    id: id,
                    onChange: () => { api.refresh() }
                }
            });
        }
        else if (element.props.children !== undefined)
            return React.cloneElement(element, { children: cloneChildren(element.props.children) });
        else
            return element;
    }

    const cloneChildren = (children) => {
        var newChildren = [];
        if (Symbol.iterator in Object(children)) {
            if (typeof children === "string")                
                newChildren = children;
            else
                for (var i in children)
                    newChildren[i] = createClone(children[i]);
        }
        else
            newChildren = createClone(children);
        return newChildren;

    }

    return (
        <FormB onSubmit={(event) => {
            event.preventDefault();
            event.api = api;
            api.post();
            onSubmit(event);
        }}>
            {cloneChildren(children)}
        </FormB>);
}
