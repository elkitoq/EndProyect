import { Container } from "reactstrap"
import { SectionCurriculum } from "./SectionCurriculum"

export const CurriculumProfile = () => {
    return (
        <Container className="curriculum-container">
            <div className="title">
                <h3>Curriculum Vitae</h3>
            </div>
            <div className="body">
                <SectionCurriculum sectionName="section-academy" title="Informacion Academica" content="fanlñskfnalskfbalksfba{sfbaskf{jba{sjfbaf asbdkljasbd asjdbalskjdba asjdbañslkdjba asj bdalskjdbañd"></SectionCurriculum>
                <SectionCurriculum sectionName="section-academy" title="Experiencia Laboral" content="loremadawkfakwfhjoaiwhf awldihawoidhaowd"></SectionCurriculum>
                <SectionCurriculum sectionName="section-academy" title="Trabajos Realizados" content="loremadawkfakwfhjoaiwhf awldihawoidhaowd"></SectionCurriculum>
                <SectionCurriculum sectionName="section-academy" title="Objetivos" content="loremadawkfakwfhjoaiwhf awldihawoidhaowd"></SectionCurriculum>

            </div>
        </Container>
    )
}