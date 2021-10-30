import axios from "axios";
import React, { Component, useState } from "react";

export default class API {

    constructor({ url, responseKey = "response", infoKey = "info", mode = APIComponent.mode.SINGLE,id }, qApi = false) {


        if (url.substring(0, 4) !== "http") {
            this.withCredentials = true;
            this.url = window.location.protocol + "//" + window.location.host.replace(":3000", "") + ":4000" + url;
        }

        else this.url = url;
        this.pathname=url
        this.id=id||url;

        if (qApi) {
            this._data = ( mode === APIComponent.mode.SINGLE ? {} : []);
            this._setData = (value) => { this._data = value };
            this._info = {};
            this._setInfo = (value) => { this._info = value };
        }
        else {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            [this._data, this._setData] = useState((mode === APIComponent.mode.SINGLE ? {} : []));
            // eslint-disable-next-line react-hooks/rules-of-hooks
            [this._info, this._setInfo] = useState({});
            // eslint-disable-next-line react-hooks/rules-of-hooks

        }

            
        this.responseKey = responseKey;

        this.infoKey = infoKey;

        document.API=API;
        document.api=this;
    }

    static get(id){
        return API.apis.find((e)=>e.id===id)
    }

    changeInfo = (info) => {
        this.call(API.events.CHANGEINFO)
        if (info.error)
            // this.onError(info.error)
            this.call(API.events.ERROR)
        this.finishLoad=(info.error===undefined);
        if (info.message)
            // this.onMessage(info.message)
            this.call(API.events.MESSAGE)
        if (info.eventCalls)
            for (const call of info.eventCalls)
                this.call(call.eventName,call)
        if (info.cookies)
            this.onCookie(info.cookies)
    }



    onCookie = (listCookie) => {
        if (this.setCookie !== undefined)
            for (let cookie of listCookie)
                this.setCookie(cookie.key, cookie.value, { path: '/' });
    }

    getData() {
        if (Array.isArray(this.getHookData())) {
            const r = [];
            Array.prototype.push.apply(r, this.getHookData());
            return r;
        }

        else
            return Object.assign({}, this.getHookData());
    }

    getHookData() {
        return this._data;
    }

    getHookInfo() {
        return this._info;
    }

    send(method = "post", data = this.getHookData()) {
        var result;
        this.call(API.events.SENDING)
        console.log(`send ${method} to ${this.url}`);
        switch (method) {
            case "put": result = axios.put(this.url, data, { withCredentials: this.withCredentials });
                break;
            case "delete": result = axios.delete(this.url, data, { withCredentials: this.withCredentials });
                break;
            case "get": result = axios.get(this.url, { params: data, withCredentials: this.withCredentials })
                break;
            default: result = axios.post(this.url, data, { withCredentials: this.withCredentials });
        }


        result.then((res) => {
            if (res.data[this.responseKey] !== undefined) {
                Object.assign(this.getHookData(), res.data[this.responseKey])
                this.refresh();
                this.call(API.events.CHANGEDATA)
            }
            if (res.data[this.infoKey] !== undefined) {
                Object.assign(res.data[this.infoKey], { pages: 6 })
                Object.assign(this.getHookInfo(), res.data[this.infoKey])
                this.setInfo(res.data[this.infoKey])
                this.changeInfo(res.data[this.infoKey]);
            }

        })
        return result;
    }

    get(data = this.getHookData()) {
        return this.send("get", data);

    }

    post(data = this.getHookData()) {
        return this.send("post", data);
    }

    put(data) {
        return this.send("put", data)
    }

    delete(data = this.getHookData()) {
        return this.send("delete", data);
    }

    refresh() {
        this.setData(this.getData());
        this.call(API.events.INPUTDATA)
    }

    async setData(data) {
        if (typeof this._setData === "function") {
            await this._setData(data);
        }
    }
    async setInfo(info) {
        if (typeof this._setInfo === "function") {
            await this._setInfo(info);
        }
    }

    toString() {
        return JSON.stringify(this.getHookData());
    }

    static getSearchParam(search) {
        const params = {}
        let url = new URLSearchParams(search);

        for (var key of url.keys())
            params[key] = url.get(key)
        return params;
    }

    static getApiComponent(children, mode = APIComponent.mode.SINGLE) {
        for (let child of children) {
            if (child.type === APIComponent) {
                var props = Object.assign({}, child.props);
                if (props.mode === undefined)
                    props.mode = mode
                const id = props.id||props.url
                var api=API.get(id);
                if(api===undefined)
                {
                if (props.APIClass === undefined)
                    api = new API(props);
                else
                    api = new props.APIClass(props);

                //if (api.didMount !== undefined && child.props.events !== undefined)
                //     child.props.events.didMount = () => api.didMount();
                //if(API.get(id)===undefined){
                API.apis.push(api)
                }
                

                if (child.ref !== undefined && child.ref !== null) child.ref.current = api;
                    return api;
            }
        }

    }
    id=null;
    static apis = []
    mount=false;
    finishLoad=false;

    static events = {
        ERROR:'Error',
        MESSAGE:'Message',
        COOKIE:'Cookie',
        CHANGEINFO:'changeInfo',
        MOUNT:'Mount',
        SENDING:'Sending',
        CHANGEDATA:'ChangeData',
        INPUTDATA:'InputData',
        FINISHLOAD:'FinishLoad'
    }

    static eventsList = {}

    static removeEvent(eventName,id){
        API.eventsList[eventName] = API.eventsList[eventName].filter((e)=>e.id!==id)
    }

    static on(eventName, func,id){
        if (API.eventsList[eventName]===undefined)
            API.eventsList[eventName]=[];
        if (API.eventsList[eventName].findIndex((e)=>e.id===id)<0)
            API.eventsList[eventName].push({func,id})

    }

    static call(eventName,...arg){
        for (const api of API.apis)
            api.call(eventName,...arg)
    }

    call(eventName,...arg){
        if (API.eventsList[eventName]!==undefined)
            for (const {func} of API.eventsList[eventName])
                func.call(this,this,...arg)
    }

}

export class APIComponent extends Component {
    static i=0

    constructor({ url, mode, responseKey, infoKey, APIClass,id /*, events*/ }) {
        super();
        // if (events !== undefined)
        //     this.componentDidMount = events.didMount || (() => { });      
        //var api = API.apis.shift()
        console.log("Construyendo");
        //if (api)
        //    this.componentDidMount = () => {}


    }
    componentDidMount() {
        console.log("Montando");
        for (const api of API.apis){
            if (!api.mount)
                api.call(API.events.MOUNT)
            api.mount=true  
        }
    }

    static mode = {
        SINGLE: "single",
        ARRAY: "array"
    }

    render() {
        return (<>{this.props.children}</>)
    }
}

export class QAPI extends API {
    constructor(url) {
        super({ url }, true)
    }
}
