import { Row } from "reactstrap"

export const SectionCurriculum = ({ sectionName, title, content, icon }) => {
    return (
        <Row className={sectionName}>
            <div className="head_section">
                <div className="icon">
                    <img src={icon} alt="" />
                </div>
                <div className="title">
                    {title}
                </div>
            </div>
            <div className="content">
                {content}
            </div>
        </Row>
    )
}