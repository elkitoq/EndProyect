import axios from "axios";

export default class API {

    constructor(url, [data, setData]=[{},null]) {
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

    get(data = this._data) {
        // var getUrl = new URL(this.url)
        // for (var key in data)
        //     getUrl.searchParams.append(key,data[key]);
        // return axios(getUrl.toString(),{params:data})
        return axios.get(this.url, { params: data })

    }

    post(data = this._data) {
        return axios.post(this.url, data)
    }

    put(data = this._data) {
        return axios.put(this.url, data)
    }

    delete(data = this._data) {
        return axios.delete(this.url, data)
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