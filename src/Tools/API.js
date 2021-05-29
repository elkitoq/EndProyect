
export default class API{
      
    constructor(url){
        this.url=url;
        
    }
    
    get(json){
        var getUrl = new URL(this.url)
        for (var key in json)
            getUrl.searchParams.append(key,json[key]);
        return fetch(getUrl.toString())
            .then((response) =>  response.json())
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