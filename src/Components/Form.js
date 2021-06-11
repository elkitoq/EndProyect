
import React from 'react';
import { Form as FormB } from 'reactstrap'
import API from '../Tools/API';



export const Form =

    ({ onSubmit = () => { }, children, api, method = "post" }) => {
        let i = 0;
        const createClone = (element, data) => {

            if (element.props && element.props.defaultValue && (element.props.idInput || element.props.name)) {
                data[(element.props.idInput || element.props.name)] = element.props.defaultValue;
            }
            if (element.type && element.type.name === "FormItem") {
                const id = element.props.idInput || element.props.name;
                return React.cloneElement(element, {
                    key: id,
                    reference: {
                        values: data,
                        id: id,
                        onChange: () => { api.refresh() }
                    }
                });
            }
            else if (element.props && element.props.children !== undefined) {
                if (element.key !== undefined && element.key !== null)
                    if (typeof data[element.key] !== "object")
                        data[element.key] = {};
                return React.cloneElement(element, {
                    key: element.key || `subForm-${i++}`,
                    children: cloneChildren(element.props.children, data[element.key] || data)

                });
            }

            return element;
        }

        const cloneChildren = (children, data) => {
            var newChildren = [];
            if (Symbol.iterator in Object(children)) {
                if (typeof children === "string")
                    newChildren = children;
                else
                    for (var i in children)
                        newChildren[i] = createClone(children[i], data);
            }
            else
                newChildren = createClone(children, data);
            return newChildren;

        }

        return (
            <FormB onSubmit={(event) => {
                event.preventDefault();
                event.api = api;
                onSubmit(event);
                api.send(method);
            }}>
                {cloneChildren(children, api.getHookData())}
            </FormB>);
    }
