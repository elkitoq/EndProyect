import axios from "axios";

export default class API {

    constructor(url, [data, setData] = [{}, null], responseKey = "response", [info, setInfo] = [{}, null], infoKey = "info") {
        if (url.substring(0, 4) !== "http")
            this.url = window.location.protocol + "//" + window.location.host.replace(":3000", "") + ":4000" + url
        else this.url = url;

        this._data = data || {};
        this._setData = setData;
        this.responseKey = responseKey;


        this._info = info || {};
        this._setInfo = setInfo;
        this.infoKey = infoKey;

    }

    getData() {
        if (Array.isArray(this._data)){
            const r=[];
            Array.prototype.push.apply(r,this._data);
            return r;
        }
            
        else
            return Object.assign({}, this._data);
    }

    getHookData() {
        return this._data;
    }

    getHookInfo() {
        return this._info;
    }

    send(method = "post", data = this._data) {
        var result;
        switch (method) {
            case "put": result = axios.put(this.url, data);
                break;
            case "delete": result = axios.delete(this.url, data);
                break;
            case "get": result = axios.get(this.url, { params: data })
                break;
            default: result = axios.post(this.url, data);
        }
        result.then((res) => {
            if (res.data[this.responseKey] !== undefined)
                this.setData(res.data[this.responseKey])
            if (res.data[this.infoKey] !== undefined) {
                Object.assign(res.data[this.infoKey], { pages: 6 })
                this._setInfo(res.data[this.infoKey])
            }
        })
        return result;
    }

    get(data = this._data) {
        return this.send("get", data);

    }

    post(data = this._data) {
        return this.send("post", data);
    }

    put(data) {
        return this.send("put", data)
    }

    delete(data = this._data) {
        return this.delete("delete", data);
    }

    refresh() {
        this.setData(this.getData());
    }

    setData(data) {
        if (typeof this._setData === "function") {
            this._setData(data);
        }
    }



    static getSearchParam(search) {
        const params = {}
        let url = new URLSearchParams(search);

        for (var key of url.keys())
            params[key] = url.get(key)
        return params;
    }

}