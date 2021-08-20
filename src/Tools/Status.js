import { List } from "./List";
import { useCookies } from 'react-cookie';
import { useState } from "react";
import React from "react";

export class Status {

    static Context = null;

    _setStatus = () => { };

    _waiting = [];


    useState = (value) => [value, () => { }]

    constructor([cookie, setCookie], key = "status") {
        if (Status.Context===null)
            Status.Context=React.createContext(this);
        document.status=this
        this.key = key;
        this.cookie = cookie;
        this._setStatus = (newValue) => setCookie(key, newValue, { path: '/' });
        if (cookie===undefined)
        this._setStatus(new List());
    }

    delete(k){
        this.cookie[this.key][k] = undefined;
        this._setStatus(Object.assign(new List(), this.cookie[this.key]));
    }

    set(k, value = true) {
        this.cookie[this.key][k] = value;
        // if (this.state[k] === undefined)
        //     this.state[k] = this.useState(value)
        // else
        //     this.state[k] = this.state[k][1](value)
        this._setStatus(Object.assign(new List(), this.cookie[this.key]));
    }

    list(){
        return this.cookie[this.key];
    }

    check(array) {
        return !(array.some((e)=>!this.cookie[this.key][e]))
    }

    use(key, defaultValue = false) {
        if (this.cookie[this.key][key] === undefined) this.set(key, defaultValue);
        return [this.get(key), ((value) => this.set(key, value))]
    }

    get(k) {
        return this.cookie[this.key][k] || false;
    }

}

export const StatusComponent = ({ name = "status", children }) => {

    const status = new Status(useCookies([name]), name);
    return <Status.Context.Provider value={status}>
        {children}
    </Status.Context.Provider>
}