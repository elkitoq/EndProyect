import axios from "axios";
import React, { Component, useState } from "react";

export default class API {

    constructor({ url, responseKey = "response", infoKey = "info", mode = APIComponent.mode.SINGLE }, qApi = false) {

        if (url.substring(0, 4) !== "http") {
            this.withCredentials = true;
            this.url = window.location.protocol + "//" + window.location.host.replace(":3000", "") + ":4000" + url;
        }

        else this.url = url;

        if (qApi) {
            this._data = mode === APIComponent.mode.SINGLE ? {} : [];
            this._setData = (value) => { this._info = value };
        }
        else
            // eslint-disable-next-line react-hooks/rules-of-hooks
            [this._data, this._setData] = useState(mode === APIComponent.mode.SINGLE ? {} : []);

        this.responseKey = responseKey;

        if (qApi) {
            this._info = {};
            this._setInfo = (value) => { this._info = value };
        }
        else
            // eslint-disable-next-line react-hooks/rules-of-hooks
            [this._info, this._setInfo] = useState({});
        this.infoKey = infoKey;

    }

    changeInfo = (info) => {
        if (info.error)
            this.onError(info.error)
        if (info.message)
            this.onMessage(info.message)
        if (info.cookies)
            this.onCookie(info.cookies)
    }

    onError = (error) => {
        alert(error);
    }
    onMessage = (message) => {
        alert(message);
    }

    onCookie = (listCookie) => {
        if (this.setCookie!==undefined)
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
            }
            if (res.data[this.infoKey] !== undefined) {
                Object.assign(res.data[this.infoKey], { pages: 6 })
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
                var api;
                if (props.APIClass === undefined)
                    api = new API(props);
                else
                    api = new props.APIClass(props);
                if (api.didMount !== undefined && child.props.events !== undefined)
                    child.props.events.didMount = () => api.didMount();
                return api;
            }
        }

    }

}

export class APIComponent extends Component {


    constructor({ url, mode, responseKey, infoKey, APIClass, events }) {
        super();

        if (events !== undefined)
            this.componentDidMount = events.didMount || (() => { });
    }

    static mode = {
        SINGLE: "single",
        ARRAY: "array"
    }

    render() {
        return (<></>)
    }
}

export class QAPI extends API {
    constructor(url) {
        super({ url }, true)
    }
}
