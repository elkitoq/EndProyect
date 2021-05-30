import axios from "axios";

export default class API {

    constructor(url, [data, setData] = [{}, null]) {
        this.url = window.location.protocol + "//" + window.location.host.replace(":3000", "") + ":4000" + url
        this._data = data || {};
        this._setData = setData;
    }

    getData() {
        return Object.assign({}, this._data);
    }

    getHookData() {
        return this._data;
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
        if (method === "get")
            result.then((res) => {
                this._setData(res.data)
            })
        else
            result.then((res) => {
                if (res.data.response !== undefined)
                    this._setData(res.data.response)
            })
        return result;
    }

    get(data = this._data) {
        return this.send("get",data);

    }

    post(data = this._data) {
        return this.send("post",data);
    }

    put(data) {
        return this.send("put", data)
    }

    delete(data = this._data) {
        return this.delete("delete",data);
    }

    refresh() {
        if (typeof this._setData === "function") {
            this._setData(this.getData());
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