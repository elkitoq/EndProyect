import { Col, Container } from "reactstrap"
import { SectionCurriculum } from "./SectionCurriculum"
import target from '../Assets/icons/Icon feather-target.svg'
import maletin from '../Assets/icons/Icon metro-suitcase.svg'
import school from '../Assets/icons/Icon material-school.svg'
import hammer from '../Assets/icons/Icon awesome-hammer.svg'

export const CurriculumProfile = ({info={}}) => {

    info.content = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure quidem obcaecati aliquid assumenda dolor totam impedit sunt! Nihil nemo ab quam vero inventore dolore, error deleniti?"
    return (
        <Container className="curriculum-container">
            <div className="body">
                <div className="bodyInner">
                    {info.academico ?<SectionCurriculum icon={school} sectionName="section-cv" title="Informacion Academica" content={   
                        info.academico.map((item) => <><b>{item.year}-{item.title}</b><br />{item.description}<br /></>)
                    }></SectionCurriculum>:""}
                    {info.laboral ?<SectionCurriculum icon={maletin} sectionName="section-cv" title="Experiencia Laboral" content={
                        info.laboral.map((item)=> <><b>{item.year} {item.title}</b> {item.empresa? `en ${item.empresa}`:""}<br />{item.description}<br /></>)
                    }></SectionCurriculum>:""}
                    {info.jobs ?<SectionCurriculum icon={hammer} sectionName="section-cv" title="Trabajos Realizados" content={
                        info.jobs
                    }></SectionCurriculum>:""}
                    {info.objetives ?<SectionCurriculum icon={target} sectionName="section-cv" title="Objetivos" content={
                        info.objetives
                    }></SectionCurriculum>:""}
                </div>
            </div>
        </Container>
    )
}

const toContent=()=>{


    return "hola"
}