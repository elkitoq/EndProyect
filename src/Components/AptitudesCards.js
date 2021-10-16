export const AptitudesCards = ({ skill }) => {
    return (
        <div className="card-skill">
            <div className="icon-skill">
                <img src="https://img.icons8.com/color/48/000000/vue-js.png" width="29px" height="29px" />
            </div>
            <div className="skill">
                <p className="skill-name"><b>
                    {skill}
                </b>
                </p>
                <p className="skill-level">
                    {skill}
                </p>
            </div>
        </div>
    )
}