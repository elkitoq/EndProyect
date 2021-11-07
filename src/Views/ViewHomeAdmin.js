import RutaTutorial, { NextButton } from "../Components/tutorial";



export const ViewHomeAdmin = () => {
    return (
        <h1>Pagina de inicio para Administradores</h1>
    );
}



RutaTutorial.get("homeAdmin").setLink('/homeAdmin')
    .setMeta("Inicio para Admins")
    .setRender(ViewHomeAdmin);
