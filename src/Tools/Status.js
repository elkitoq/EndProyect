import { List } from "./List";
import { useCookies } from 'react-cookie';
import React from "react";

export class Status {

    static Context = null;

    static instance;

    _setStatus = () => { };

    _waiting = [];

    saving=new List();

    static instancias=0;

    useState = (value) => [value, () => { }]

    // static getInstance(c,k){
    //     return Status.instance || (Status.instance=new Status(c,k))
    // }

    constructor([cookie, setCookie], key = "status") {
        if (Status.Context===null)
            Status.Context=React.createContext(this);
        document.status=this
        this.key = key;
        this.cookie = cookie;
        this._setStatus = (newValue) => setCookie(key, newValue, { path: '/' });
        if (cookie[this.key]===undefined)
        this._setStatus(new List());
        Status.instancias++;
        this.instancias=Status.instancias
    }

    delete(k){
        this.cookie[this.key][k] = undefined;
        this._setStatus(Object.assign(this.saving, this.cookie[this.key]));
    }

    set(k, value = true,noSave=false) {
        this.cookie[this.key][k] = value;
        this.saving[k]=value;
        // if (this.state[k] === undefined)
        //     this.state[k] = this.useState(value)
        // else
        //     this.state[k] = this.state[k][1](value)
        console.log(`save: ${JSON.stringify(this.cookie[this.key][k])} en ${k}`);
        if(!noSave)
            this.save()
    }

    save(){
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
        return (this.cookie[this.key][k]===undefined)?false:this.cookie[this.key][k];
    }

    clear(){
        this._setStatus(new List())
    }

}

export const StatusComponent = ({ name = "status", children }) => {

    const status = new Status(useCookies([name]), name);
    return <Status.Context.Provider value={status}>
        {children}
    </Status.Context.Provider>
}