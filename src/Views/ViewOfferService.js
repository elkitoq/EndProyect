import { useCookies } from "react-cookie";






export const ViewOfferService = () => {
    const [user] = useCookies(['selectUser']);
    return (
        <h1>Aca mostraria el formulario para ofrecer un servicio</h1>
    );
}