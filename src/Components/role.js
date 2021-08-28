import { QAPI } from "../Tools/API";
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


export const LoadRoles = () => {

    const status = useContext(Status.Context)
    // const [, setUser] = status.use('selectUser');


    useEffect(() => {
        new QAPI('/role').send("get", {}).then((res) => {
            status.set("selectUser",(res.data.response),true)
            if (res && res.data && res.data.response)
                verificarRoles(status,res.data.response)
            status.save();
            
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (<></>)
}



export const DropdownRol = () => {

    const status = useContext(Status.Context)
    const [user,] = status.use('selectUser');

    const [dropdownOpen, setDropdownOpen] = useState(false);


    const toggle = () => {
        setDropdownOpen(prevState => !prevState);
    }

    const selectRol = (index, e) => {
        // setCookie("selectRole", index, { path: '/' })
        status.set("selectRole", index)
    }

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} nav inNavbar>
            <DropdownToggle nav caret>
            <span id="Roles"> Roles</span>
            </DropdownToggle>
            <Señalado marca="Roles" title="Roles" text="Selecciona como quien quieres usar la app (Empresa, Aspirante o Autónomo) para que elijamos el conjunto de herramientas que necesitas"/>
            
            <DropdownMenu right>
                {dropdownOpen ? <LoadRoles /> : ""}
                {
                    Array.isArray(user) ? user.map(
                        (element, index) =>
                            <DropdownItem key={`droprole-${index}`}
                                href={
                                    `${element.roleType === 0 ? "/homeEmpresa" :
                                        element.roleType === 1 ? "/homeAspirante" :
                                            element.roleType === 2 ? "/homeAutonomo" :
                                                "/homeAdmin"
                                    }?user=${index}`
                                }
                                onClick={selectRol.bind(this, index)}
                            >
                                {element.roleName}
                            </DropdownItem>
                    ) : ""
                }
                <DropdownItem divider />
                <DropdownItem href="/Register/">
                   <span id="CrearRol">Crear Roles</span>
                </DropdownItem>
                <Señalado marca="CrearRol" title="CrearRol" text="Crea un nuevo perfil con el Rol que prefieras"/>
            </DropdownMenu>
        </Dropdown>);
}



export const verificarRoles=(status,users)=>{
    status.set("haveAspirante", users.find((element) => element.roleType === 1)!==undefined,true)
}