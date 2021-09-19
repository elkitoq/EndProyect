
import { Col, Progress } from "reactstrap"
import "../Assets/Css/progressBar.scss"


export const ProgressBarStep = ({ steps, toDo }) => {

    const currentStep = steps[toDo];
    console.log(toDo);
    console.log(steps.length);
    console.log((1 + toDo) * (100 / (1 + steps.length)));

    const stepClasses = (index) => {
        let result = `progress__step progress__step--${index + 1} `
        if ((currentStep && currentStep.meta === 'complete') ||
            index < toDo) {
            return result += 'progress__step--complete'
        }
        if (index === toDo) {
            return result += 'progress__step--active'
        }
        return result
    }

    return <Col style={{ position: "absolute" }}>
        <Progress className="progress__bg" striped animated color="success" value={(1 + toDo) * (100 / (1 + steps.length))} />
        {
            steps.map((step, index) =>

                <div className={stepClasses(index)} style={{ left: `calc(${(1 + index) * (99 / (1 + steps.length))}vw - 10px)` }}>
                    <div className="progress__indicator">
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="progress__label">
                        {step.meta}
                    </div>
                </div>)

        }
    </Col >
}