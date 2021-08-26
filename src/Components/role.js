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


export const LoadRoles = () => {

    const status = useContext(Status.Context)
    const [,setUser] = status.use('selectUser');


    useEffect(() => {
        new QAPI('/role').send("get", {}).then((res) => {
            setUser( res.data.response)
        });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])



    return (<></>)
}



export const DropdownRol = () => {

    const status = useContext(Status.Context)
    const [user,] = status.use('selectUser');

    const [dropdownOpen, setDropdownOpen] = useState(false);


    const toggle = () => {
        setDropdownOpen(prevState => !prevState);
    }

    const selectRol= (index,e)=>{
        // setCookie("selectRole", index, { path: '/' })
        status.set("selectRole", index)
    }

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} nav inNavbar>
            <DropdownToggle nav caret>
                Roles
      </DropdownToggle>
            <DropdownMenu right>
                {dropdownOpen?<LoadRoles/>:""}
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
                            onClick={selectRol.bind(this,index)}
                            >
                                {element.roleName}
                            </DropdownItem>
                    ) : ""
                }
                <DropdownItem divider />
                <DropdownItem href="/Register/">
                    Crear Roles
        </DropdownItem>

            </DropdownMenu>
        </Dropdown>);
}