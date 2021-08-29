import { Container } from "reactstrap"
import { SectionCurriculum } from "./SectionCurriculum"
import target from '../Assets/icons/Icon feather-target.svg'
import maletin from '../Assets/icons/Icon metro-suitcase.svg'
import school from '../Assets/icons/Icon material-school.svg'
import hammer from '../Assets/icons/Icon awesome-hammer.svg'

let info = {
    content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure quidem obcaecati aliquid assumenda dolor totam impedit sunt! Nihil nemo ab quam vero inventore dolore, error deleniti?"
}

export const CurriculumProfile = () => {
    return (
        <Container className="curriculum-container">
            <div className="body">
                <div className="bodyInner">
                    <SectionCurriculum icon={school} sectionName="section-cv" title="Informacion Academica" content={info.content}></SectionCurriculum>
                    <SectionCurriculum icon={maletin} sectionName="section-cv" title="Experiencia Laboral" content={info.content}></SectionCurriculum>
                    <SectionCurriculum icon={hammer} sectionName="section-cv" title="Trabajos Realizados" content={info.content}></SectionCurriculum>
                    <SectionCurriculum icon={target} sectionName="section-cv" title="Objetivos" content={info.content}></SectionCurriculum>
                </div>
            </div>
        </Container>
    )
}