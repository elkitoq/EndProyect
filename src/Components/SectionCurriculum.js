import { Row } from "reactstrap"

export const SectionCurriculum = ({ sectionName, title, content, icon }) => {
    return (
        <Row className={sectionName}>
            <div className="head_section">
                <div className="icon">
                    <img src={icon} alt="" />
                </div>
                <div className="title">
                    <h5>{title}</h5>
                </div>
            </div>
            <div className="content">
                <p>{content}</p>
            </div>
        </Row>
    )
}