import axios from "axios";
import { Component } from "react";

export default class API {

    constructor(url, [data, setData] = [{}, null], responseKey = "response", [info, setInfo] = [{}, null], infoKey = "info") {

        if (url.substring(0, 4) !== "http") {
            this.withCredentials = true;
            this.url = window.location.protocol + "//" + window.location.host.replace(":3000", "") + ":4000" + url;
        }

        else this.url = url;

        this._data = data || {};
        this._setData = setData;
        this.responseKey = responseKey;


        this._info = info || {};
        this._setInfo = setInfo;
        this.infoKey = infoKey;
        this.changeInfo = () => { };

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

}