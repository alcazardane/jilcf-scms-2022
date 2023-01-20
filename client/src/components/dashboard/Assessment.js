import { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
//Components
import AssessmentDetails from './dashboard_details/AssessmentDetails'
import useWindowDimensions from './hooks/useWindowDimensions'

const Assessment = () => {
  const [assessments, setAssessment] = useState(null)

    // Fetching the data from the collection "assessmet_record" in the database
    useEffect(() =>{
        const fetchAssessment = async () => {
            const response = await fetch('/assessment_record')
            const json = await response.json()

            if (response.ok){
                setAssessment(json)
            }
        }

        fetchAssessment()
    }, [])

    const { width } = useWindowDimensions();
    var scrollValue = 3.125 / 100;
    var rightScroll = (width * scrollValue) + 275;

    console.log(rightScroll);

    // For left and right slider
    const slideRight = () =>{
        var slider = document.getElementById("assessment_sub_container_wrap_out");
        slider.scrollLeft = slider.scrollLeft + rightScroll;
      }
    const slideLeft = () =>{
        var slider = document.getElementById("assessment_sub_container_wrap_out");
        slider.scrollLeft = slider.scrollLeft - rightScroll;
    }

    return (
        <div className="assessment_container">
        <div className="assessment_header">
            <div className="container_labels-b">ASSESSMENT RECORD</div>
            <span className="view_assessment"><Link className="link" to={"/assessment"}>View Assessment &#10095;</Link></span>
        </div>
            <div className="slide_buttons_wrap">
            <div className="slide_button_wrap_left">
                <span className="material-symbols-outlined" onClick={slideLeft}>arrow_circle_left</span>
            </div>
            <div className="slide_button_wrap_right">
                <span className="material-symbols-outlined" onClick={slideRight}>arrow_circle_right</span>
            </div>
            </div>
            <div className="assessment_sub_container_wrap_out" id="assessment_sub_container_wrap_out">
                {assessments && assessments.map((assessment) => (
                    <AssessmentDetails key={assessment._id} assessment={assessment} />
                ))}
            </div>
        </div>
    )
}

export default Assessment