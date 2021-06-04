import { useLocation } from "react-router";
import { Pagination as PaginationB, PaginationItem, PaginationLink } from "reactstrap";




export const Pagination = ({ pages = 1}) => {
    const { pathname, search } = useLocation();
    const busqueda = new URLSearchParams(search)
    const actual = parseInt(busqueda.get("page")) || 1

    const paginas = []
    for (var i = 1; i <= pages; i++) {
        busqueda.set("page", i);
        paginas.push(`${pathname}?${busqueda.toString()}`)
    }


    return (<PaginationB aria-label="Page navigation example">
        {(actual > 1) ? <First paginas={paginas} actual={actual}/> :""}

        {paginas.map((pagina, i) =>
            <PaginationItem key = {pagina} active={actual-1===i}>
                <PaginationLink href={pagina}>
                    {i + 1}
                </PaginationLink>
            </PaginationItem>
        )}

        {(actual < paginas.length) ? <Last paginas={paginas} actual={actual}/> :""}
    </PaginationB>);
}


const First = ({paginas,actual}) => <>
    <PaginationItem>
        <PaginationLink href={paginas[0]}>{"<<"}</PaginationLink>
    </PaginationItem>
    <PaginationItem>
        <PaginationLink href={paginas[actual - 2]}>{"<"}</PaginationLink>
    </PaginationItem></>

const Last = ({paginas,actual}) => <>
    <PaginationItem>
        <PaginationLink href={paginas[actual]} >{">"}</PaginationLink>
    </PaginationItem>
    <PaginationItem>
        <PaginationLink href={paginas[paginas.length - 1]} >{">>"}</PaginationLink>
    </PaginationItem>
</>


