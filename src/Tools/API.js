import axios from "axios";

export default class API{
      
    constructor(url){
        this.url=url;
        
    }
    
    get(data={}){
        // var getUrl = new URL(this.url)
        // for (var key in data)
        //     getUrl.searchParams.append(key,data[key]);
        // return axios(getUrl.toString(),{params:data})
        return axios.get(this.url,{params:data})
        
    }

    post(data={}){
        return axios.post(this.url,data)
    }

    


    static getSearchParam(search){
        const params={}
        let url = new URLSearchParams(search);
        console.log(url);
        console.log(search);
        
        for (var key of url.keys())
            params[key]=url.get(key)
        return params;
    }

}