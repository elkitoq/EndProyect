import API from "../Tools/API";
import { Status } from "../Tools/Status";
import { LoadRoles } from "./role";
import { useContext } from "react";

export const Events = () => {

API.on(API.events.ERROR, async (api)=>{
        console.log(api.getHookInfo());
        alert("Error:"+api.getHookInfo().error);
    return ("OK")
},'Events')

API.on(API.events.MESSAGE, async (api)=>{
    alert(api.getHookInfo().message);
return ("OK")
},'Events')

// onMessage = (message) => {
//     alert(message);
// }


const status = useContext(Status.Context)



API.on("isLogin",()=>{
        // status.set('cargarPerfiles',false,true)
        status.set("Login");   
    return ("OK")     
},'Events')


API.on("isLogOut",()=>{
    status.clear(); 
    window.location.reload(false);
    return ("OK")
},'Events')


return <></>

}
