import API from "../Tools/API";
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown
} from 'reactstrap'
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";


export const LoadRoles = () => {

    const [, setUser] = useCookies(['selectUser']);

    useEffect(() => {
        new API('/role').send("get", {}).then((res) => {
            setUser("selectUser", res.data, { path: '/' });
        });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])



    return (<></>)
}



export const DropdownRol = () => {


    const [user,setCookie] = useCookies(['selectUser']);

    const [dropdownOpen, setDropdownOpen] = useState(false);


    const toggle = () => {
        setDropdownOpen(prevState => !prevState);
    }

    const selectRol= (index,e)=>{
        setCookie("selectRole", index, { path: '/' })
    }

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} nav inNavbar>
            <DropdownToggle nav caret>
                Roles
      </DropdownToggle>
            <DropdownMenu right>
                {dropdownOpen?<LoadRoles/>:""}
                {
                    Array.isArray(user.selectUser) ? user.selectUser.map(
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