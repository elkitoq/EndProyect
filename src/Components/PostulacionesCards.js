export const PostulacionesCards = ({ postulacion }) => {
    return (
        <div className="card-postulaciones animate__animated animate__fadeIn">
            <div className="content-postulacion">
                <p className="name-company">
                    Compañia: Coca Cola
                </p>
                <p className="puesto-solicitado">
                    Puesto solicitado: {postulacion.name}
                </p>
                <p className="estado-busqueda">
                    Estado Búsqueda: {postulacion.status === 1 ? "Abierta" : postulacion.status === 2 ? "En Proceso" : postulacion.status === 10 ? "Cerrada" : postulacion.status === 99 ? "anulada" : "provisoria"}
                </p>
            </div>
        </div>
    )
}