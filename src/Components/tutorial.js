import { Container } from "reactstrap";
import { List } from "../Tools/List";

export default class RutaTutorial {
    static get = new List();

    constructor(meta) {
        this.meta = meta;
        this.requisitos = [];
        this.isShow = true;
        this.isDone = false;
        RutaTutorial.get[meta] = this;
        this.render = () => <></>;
    }

    toString() {
        return (this.meta.toString())
    }

    getRequisitos() {
        const r = [];
        RutaTutorial.listRequisitosSorted(r, this.requisitos)

        return r;
    }

    static listRequisitosSorted(r, requisitos) {
        for (let req of requisitos) {

            let index = r.indexOf(req);
            if (index > -1) {
                r.splice(index, 1);
            }

            r.unshift(req);
            RutaTutorial.listRequisitosSorted(r, req.requisitos)
        }

    }

    addRequisito(req) {
        if (req instanceof RutaTutorial)
            this.requisitos.push(req);
        return this;
    }

    setInstrucciones(instrucciones) { this.instrucciones = instrucciones; return this };

    setDescription(description) { this.description = description; return this };

    setRender(render) { this.render = render; return this }

    static Render(page) {
        let ruta = this.get[page]
        return (props) => <>
            <ProgressBar ruta={ruta} />
            <Container className="abs-center" fluid={true}>
                {ruta.render(props)}
            </Container>
        </>
    }
}

String.prototype.RutaTutorial = RutaTutorial;


export const Mapa = () => {



    return <ul>
        {RutaTutorial.get.map((ruta) =>
            (ruta instanceof RutaTutorial) ?
                <li key={ruta.toString()} >{ruta.toString()}:
                    <br />{ruta.description}
                    <br />
                    <Ruta ruta={ruta} />

                </li> : "")}
    </ul>
}

export const Ruta = ({ ruta }) => <ul>
    {ruta.getRequisitos().map(
        (req) =>
            <li key={req.toString()} style={{ color: (req.isDone) ? "GREEN" : "RED" }}>
                {req.meta}:{req.instrucciones}
            </li>
    )}
    <li>{ruta.instrucciones}
    </li>
</ul>

export const ProgressBar = ({ ruta }) => <ul>
    {ruta.getRequisitos().map(
        (req) =>
            <li key={req.toString()} style={{ color: (req.isDone) ? "GREEN" : "RED" }}>
                {req.meta}:{req.instrucciones}
            </li>
    )}
    <li>{ruta.instrucciones}
    </li>
</ul>