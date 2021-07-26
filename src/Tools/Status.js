import { List } from "./List";

//new Status(useCookies(["status"]),"status")

export class Status{

    static cookie;

    static key;

    static _setStatus=()=>{};

    static _waiting=[];


    constructor([cookie,setCookie],key="status"){
        this.key=key;
        this.cookie=cookie;
        this._setStatus=(newValue)=>setCookie(key, newValue, { path: '/' });
        this._setStatus(new List());
    }

    static set(k,value=true){
        this.cookie[this.key][k]=value;
        this._setStatus(Object.assign(new List(),this.cookie[this.key]))

        console.log(this.cookie[this.key]);

    }

    static check(array){

    }

    static get(k){
        return this.cookie[this.key][k] || false;
    }

}