import { useContext } from "react";
import { Container, Button, Row } from "reactstrap";
import { List } from "../Tools/List";
import { Status } from "../Tools/Status";
import { ProgressBarStep } from "./ProgressBar";

export default class RutaTutorial {
    static #list = new List();

    constructor(meta) {
        this.meta = meta;
        this.requisitos = [];
        this.isShow = true;
        this.isDone = false;
        this.checkStatus = meta;
        RutaTutorial.#list[meta] = this;
        this.render = () => <></>;
    }

    setMeta(meta) {
        this.meta = meta;
        return this;
    }

    toString() {
        return (this.meta.toString())
    }

    static get(meta, create = true) {
        if (this.#list[meta] === undefined && create)
            new RutaTutorial(meta);
        return this.#list[meta];
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
        if (typeof req === "string")
            req = RutaTutorial.get(req);
        if (req instanceof RutaTutorial)
            this.requisitos.push(req);
        return this;
    }

    check(status) {
        if (status instanceof Status) {
            var unDone = this.getRequisitos();
            this.getRequisitos().forEach((req) => {
                req.isDone = status.get(req.checkStatus)
                if (req.isDone) {
                    let index = unDone.indexOf(req);
                    if (index > -1) {
                        unDone.splice(index, 1);
                    }
                }

            });
            this.isDone = status.get(this.checkStatus)
            return unDone;
        }
    }

    reset(status) {
        this.getRequisitos().forEach((req) => {
            status.delete(req.checkStatus);
        });
        status.delete(this.checkStatus);
    }

    done(status) {
        status.set(this.checkStatus)
    }

    setInstrucciones(instrucciones) { this.instrucciones = instrucciones; return this };

    setDescription(description) { this.description = description; return this };

    setRender(render) { this.render = render; return this }

    static map(m) { return this.#list.map(m) }
}

document.RutaTutorial = RutaTutorial;


export const RenderProgress = (page) => {
    let ruta = RutaTutorial.get(page, false);
    document.ruta = ruta;
    const unDone = ruta.check(useContext(Status.Context));
    const progress = ruta.getRequisitos();
    progress.push(ruta);
    unDone.push(ruta);
    var toDo = progress.findIndex((e) => !e.isDone);
    if (toDo < 0) toDo = progress.length;
    return (props) => <>

        {/* <ProgressBar ruta={ruta} /> */}

        {progress.length > 1 ? <ProgressBarStep steps={progress} toDo={toDo} /> : ""}

        <Container className="abs-center" fluid={true} style={{ marginTop: progress.length > 1 ? "100px" : "0px" }}>
            {unDone[0].render(props)}
        </Container>
    </>
}

export const Mapa = () => {
    return <ul>
        {RutaTutorial.map((ruta) =>
            (ruta instanceof RutaTutorial) ?
                <li key={ruta.toString()} >{ruta.toString()}:
                    <br />{ruta.description}
                    <br />
                    <Ruta ruta={ruta} />

                </li> : "")}
    </ul>
}

// export const ProgressBar = ({ ruta }) => {
//     const status = useContext(Status.Context)
//     return <ul>
//     {ruta.getRequisitos().map(
//         (req) =>
//             <li key={req.toString()} style={{ color: (req.isDone) ? "GREEN" : "RED" }}>
//                 {req.meta}:{req.instrucciones} <Button size="sm" onClick={()=>status.set(req.checkStatus,!status.get(req.checkStatus))}>toggle</Button>
//             </li>
//     )}
//     <li>{ruta.instrucciones}
//     </li>
// </ul>}

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

export const NextButton = ({ text, reset = false, ruta }) => {
    const status = useContext(Status.Context);

    reset = reset || RutaTutorial.get(ruta, false).isDone;

    if (reset)
        text = text || "<<<<<";
    else
        text = text || ">>>";

    return <button
        className="btn btn-primary"
        onClick={() => {
            if (reset)
                RutaTutorial.get(ruta, false).reset(status);
            else
                RutaTutorial.get(ruta, false).done(status);
        }}
        style={{
            position: "absolute",
            left: "calc(100vw - 150px)",
            top: "50vh"
        }}
    >{text}</button>
}