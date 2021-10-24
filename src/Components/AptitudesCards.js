import { useEffect, useState } from 'react'
import { iconData } from "../Assets/dataIcon"

export const AptitudesCards = ({ skill }) => {
    const [url, setUrl] = useState('')

    useEffect(() => {
        iconData.forEach(findUrl)

        function findUrl(item) {
            let name = skill.title.toLowerCase()
            if (item.name == name) {
                setUrl(item.iconUrl)
            }
        }
    }, [])

    console.log(url)

    return (
        <div className="card-skill">
            <div className="icon-skill">
                <img src={url} width="29px" height="29px" />
            </div>
            <div className="skill">
                <p className="skill-name"><b>
                    {skill.title}
                </b>
                </p>
                <p className="skill-level">
                    {skill.nivel}
                </p>
            </div>
        </div>
    )
}