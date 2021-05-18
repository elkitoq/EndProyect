import { useCookies } from "react-cookie";
import { Button, Card, Col, Container, Input, Row } from "reactstrap";
import { ViewRegister } from "./ViewRegister";



export const ViewCreateUser = () => {

    const [login] = useCookies(['isLogin']);
    const [user,setUser] = useCookies(['selectUser']);
    return (
        <Container className="abs-center">
            {
                !(login.isLogin === "true") ? <ViewRegister /> : 
                (!Array.isArray(user.selectUser)) ? <CrearUsuario user={user} setUser={setUser}/>:
                !(user.selectUser[user.selectUser.length-1].new === true)   ? <CrearUsuario user={user} setUser={setUser}/>:
                (user.selectUser[user.selectUser.length-1].type === 0)      ? <CrearEmpresa user={user} setUser={setUser}/>:
                (user.selectUser[user.selectUser.length-1].type === 1)      ? <CrearAspirante user={user} setUser={setUser}/>:     
                <CrearAdmin user={user} setUser={setUser}/>      
            }
        </Container>
    );
}

const CrearUsuario = ({setUser,user}) =>{


    const crear = (r,e)=>{
        if(!Array.isArray(user.selectUser))
            user.selectUser=[];
        user.selectUser.push({type:r, new:true});
        setUser("selectUser",user.selectUser,{ path: '/' });

    } 


    return(
        <Container className="abs-center">
            <div className="text-center">
                <h3>¿Por donde queres empezar?</h3>
                <Row>
                    <Card inverse color="primary" className="tarjetasQBuscas" onClick={crear.bind(this,0)}>
                        Tengo una empresa, Quiero esclavos
                    </Card>
                    <Card inverse color="primary" className="tarjetasQBuscas" onClick={crear.bind(this,1)}>
                        Soy pobre, Quiero Trabajo
                    </Card>
                    <Card inverse color="primary" className="tarjetasQBuscas" onClick={crear.bind(this,2)}>
                        Tengo un amigo que me pidio le cargara una cuenta
                    </Card>
                </Row>
            </div>
            
        </Container>
    );

}

const CrearEmpresa = ({setUser,user}) =>{



    return(
        <Container className="abs-center">
            Introduzca datos de la empresa
            <Input defaultValue={user.selectUser[user.selectUser.length-1].name} 
                onChange={(e)=>{
                    user.selectUser[user.selectUser.length-1].name=e.target.value;
                    setUser("selectUser",user.selectUser,{ path: '/' })
                }
            }
            />
            <Button size="lg" color="primary" blocks="true" href="/homeEmpresa"
                onClick={(e)=>{
                    user.selectUser[user.selectUser.length-1].new=false;
                    setUser("selectUser",user.selectUser,{ path: '/' })
                }
            }
            >
            Crear</Button>
        </Container>
    )
}

const CrearAspirante = ({setUser,user}) =>{

    return(
        <Container className="abs-center">
        Introduzca sus datos
        <Input defaultValue={user.selectUser[user.selectUser.length-1].name} 
            onChange={(e)=>{
                user.selectUser[user.selectUser.length-1].name=e.target.value;
                setUser("selectUser",user.selectUser,{ path: '/' })
            }
        }
        />
        <Button size="lg" color="primary" blocks="true" href="/homeEmpresa"
            onClick={(e)=>{
                user.selectUser[user.selectUser.length-1].new=false;
                setUser("selectUser",user.selectUser,{ path: '/' })
            }
        }
        >
        Crear</Button>
    </Container>
            

    )
}


const CrearAdmin = ({setUser,user}) =>{

    return(
        <Container className="abs-center">
        Introduzca los datos de su asociado
        <Input defaultValue={user.selectUser[user.selectUser.length-1].name} 
            onChange={(e)=>{
                user.selectUser[user.selectUser.length-1].name=e.target.value;
                setUser("selectUser",user.selectUser,{ path: '/' })
            }
        }
        />
        <Button size="lg" color="primary" blocks="true" href="/homeEmpresa"
            onClick={(e)=>{
                user.selectUser[user.selectUser.length-1].new=false;
                setUser("selectUser",user.selectUser,{ path: '/' })
            }
        }
        >
        Crear</Button>
    </Container>
            

    )
}

