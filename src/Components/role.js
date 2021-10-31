import API, { APIComponent, QAPI } from "../Tools/API";
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown
} from 'reactstrap'
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Status } from "../Tools/Status";
import { Señalado } from "./Señalador";
import RutaTutorial from "./tutorial";


export const LoadRoles = ({ select, add}) => {

    const status = useContext(Status.Context)
    // const [, setUser] = status.use('selectUser');
    const [load, setLoad] = useState(false)

    console.log("SELECT " + select);
    
    useEffect(() => {
        if (status.get('Login')) {
            if (!load)
                new QAPI('/profile').send("get", {}).then((res) => {
                    status.set("selectUser", (res.data.response), true)
                    if (res && res.data && res.data.response)
                        verificarRoles(status, res.data.response)
                    const user = status.get("selectUser")[status.get("selectRole")]
                    if (!user || (select !== undefined && user.profileType !== select)) {
                        status.set("selectRole", res.data.response.findIndex((element) => element.profileType === select))
                        // alert (res.data.response.findIndex((element) => element.profileType === select))
                        // alert (status.get("selectRole"))
                        API.call(API.events.FINISHLOAD)
                    }
                    if (add !== undefined && add !== null  && (status.get("selectRole") < 0 || select === undefined)) {
                        res.data.response.push(add)
                        status.set("selectRole", "" + res.data.response.indexOf(add))
                    }
                    status.save();
                    status.set('cargarPerfiles')
                    setLoad(true)
                    console.log("listo");
                });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <></>

    // API.on(API.events.MOUNT,
    //     (api) => {
    //         if (api.id === "loadRoles") {
    //             // if (!load)
    //             api.send().then((res) => {
    //                 status.set("selectUser", (res.data.response), true)
    //                 if (res && res.data && res.data.response)
    //                     verificarRoles(status, res.data.response)
    //                 const user = status.get("selectUser")[status.get("selectRole")]
    //                 if (!user || (select !== undefined && user.profileType !== select)) {
    //                     status.set("selectRole", res.data.response.findIndex((element) => element.profileType === select))
    //                     // alert (res.data.response.findIndex((element) => element.profileType === select))
    //                     // alert (status.get("selectRole"))
    //                     //API.call(API.events.FINISHLOAD)
    //                 }
    //                 if (add !== undefined && (status.get("selectRole") < 0 || select === undefined)) {
    //                     res.data.response.push( )
    //                     status.set("selectRole", "" + res.data.response.indexOf(add))
    //                 }

    //                 status.save();
    //                 // setLoad(true)
    //                 console.log("listo");

    //             })
    //         }

    //     },
    //     'LoadRoles')

    // return (<APILoad>
    //     <APIComponent url="/profile" id="loadRoles" />as
    // </APILoad>)
}

const APILoad = ({ children, api = API.getApiComponent(children) }) => {


    return <></>
}




export const DropdownRol = () => {

    const status = useContext(Status.Context)
    const [user,] = status.use('selectUser');
    const [selectRole,] = status.use('selectRole');

    const [dropdownOpen, setDropdownOpen] = useState(false);


    const toggle = () => {
        setDropdownOpen(prevState => !prevState);
    }

    const selectRol = (index, e) => {
        // setCookie("selectRole", index, { path: '/' })
        status.set("selectRole", "" + index)
    }

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} nav inNavbar>
            <DropdownToggle nav caret>
                <span id="Roles"> {(Array.isArray(user) && user[selectRole] && user[selectRole].profileName) ? user[selectRole].profileName : "Perfiles"}</span>
            </DropdownToggle>
            <Señalado marca="Roles" title="Roles" text="Selecciona como quien quieres usar la app (Empresa, Aspirante o Autónomo) para que elijamos el conjunto de herramientas que necesitas" />

            <DropdownMenu right>
                {dropdownOpen ? <LoadRoles /> : ""}
                {
                    Array.isArray(user) ? user.map(
                        (element, index) =>
                            <DropdownItem key={`droprole-${index}`}
                                href={
                                    `${element.profileType === 0 ? "/homeEmpresa" :
                                        element.profileType === 1 ? "/homeAspirante" :
                                            element.profileType === 2 ? "/homeAutonomo" :
                                                "/homeAdmin"
                                    }?user=${index}`
                                }
                                onClick={selectRol.bind(this, index)}
                            >
                                {element.profileName}
                            </DropdownItem>
                    ) : ""
                }
                <DropdownItem divider />
                <DropdownItem href="/Register/">
                    <span id="CrearRol2">Crear Roles</span>
                </DropdownItem>
                <Señalado marca="CrearRol2" title="Crear Rol" text="Crea un nuevo perfil con el Rol que prefieras" />
            </DropdownMenu>
        </Dropdown>);
}


export const aspirante = (element) => element.profileType === 1;

export const verificarRoles = (status, users) => {
    status.set("haveAspirante", users.find((element) => element.profileType === 1) !== undefined, true)
    status.set("haveEmpresa", users.find((element) => element.profileType === 0) !== undefined, true)
    status.set("haveAutonomo", users.find((element) => element.profileType === 2) !== undefined, true)
}



RutaTutorial.get("cargarPerfiles")
    .setDescription(<></>)
    .addRequisito("Login")
    .setRender(LoadRoles)
    .setMeta("")
    .setInstrucciones(<></>);
