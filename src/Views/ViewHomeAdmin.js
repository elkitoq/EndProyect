import RutaTutorial, { NextButton } from "../Components/tutorial";



export const ViewHomeAdmin = () => {
    return (
        <h1>Pagina de inicio para Administradores<NextButton ruta="homeAdmin"/></h1>
    );
}



RutaTutorial.get("homeAdmin")
    .setMeta("Inicio para Admins")
    .setRender(ViewHomeAdmin);