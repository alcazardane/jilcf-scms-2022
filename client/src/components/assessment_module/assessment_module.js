import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import AssessmentModuleSection from "./assessment_module_section"
// import images
import search_icon from "../../images/search_FILL0_wght400_GRAD0_opsz48.png"
import abm_image from "../../images/abm_strand_image.jpg"
import tvl_image from "../../images/tvl_strand_image.jpg"
import stem_image from "../../images/stem_strand_image.jpg"
import humms_image from "../../images/humms_strand_image.jpg"

const AssessmentModule = ({ user, idNumber, setClassID, setClassSection, setSubjectID }) => {

    var root = document.querySelector(":root");

    const openAssessmentSection = () => {
        root.style.setProperty('--windowAssessment-display', "none")
        root.style.setProperty('--windowAssessmentSection-display', "block")
    }

    // For L2
    const [classData, setClassData] = useState([]);
    useEffect(() => {
        const fetchClassData = async () => {
        const response = await fetch(`/api/subject/teacher/${idNumber}`);
        const data = await response.json();
        setClassData(data);
        };
        fetchClassData();
    }, [idNumber]);

    const getImage = (sectionStrand) => {
        if (sectionStrand === "STEM"){
            return stem_image
        }
        else if (sectionStrand === "HUMMS"){
            return humms_image
        }
        else if (sectionStrand === "ABM"){
            return abm_image
        }
        else {
            return tvl_image
        }
    }

    // For L3
    const [subjectData, setSubjectData] = useState([]);
    useEffect(() => {
        const fetchClassData = async () => {
        const response = await fetch(`/api/class-sections/subjects/${idNumber}`);
        const data = await response.json();
        setSubjectData(data);
        };
        fetchClassData();
    }, [idNumber]);


    const getSubjImage = (subjID) => {
        if (subjID === "GM-001"){
            return stem_image
        }
        else {
            return humms_image
        }
    }

    let subject_cards;
    if (user.level === '2'){
        subject_cards =
            <>
                <div className="assessment_module_subjcards_wrap">
                    {classData && classData.map(classdata => (
                        <div 
                            key={classdata.class_id+classdata.subject_id} 
                            className="assessment_module_subjcards"
                            onClick={() => {
                                openAssessmentSection();
                                setClassID(classdata.class_id);
                                setSubjectID(classdata.subject_id);
                                setClassSection(classdata.class_glvl + " " + classdata.class_strand + " " + classdata.class_section)
                            }}>
                            <div className="assessment_module_subjcards_cover"></div>
                            <img className="assessment_module_subjcards_img" src={getImage(classdata.class_strand)} alt="course_image" />
                                <div className="assessment_module_subjcards_text_wrap">
                                    <span className="assessment_module_subjcards_text_a">
                                        {
                                            classdata.class_glvl + " " + classdata.class_strand + " " + classdata.class_section
                                        }
                                    </span>
                                    <span className="assessment_module_subjcards_text_b">{classdata.subject_name}</span>
                                </div>
                        </div>
                    ))}
                </div>
            </>
    }
    else if (user.level === '3'){
        subject_cards =
            <>
                <div className="assessment_module_subjcards_wrap">
                    {subjectData && subjectData.map(subjdata => (
                        <div 
                            key={subjdata.subject_id}
                            className="assessment_module_subjcards"
                            onClick={() => {
                                openAssessmentSection();
                                setClassSection(subjdata.subject_name);
                                setSubjectID(subjdata.subject_id)
                            }}>
                            <div className="assessment_module_subjcards_cover"></div>
                            <img className="assessment_module_subjcards_img" src={getSubjImage(subjdata.subject_id)} alt="course_image" />
                                <div className="assessment_module_subjcards_text_wrap">
                                    <span className="assessment_module_subjcards_text_a">{subjdata.subject_name}</span>
                                    <span className="assessment_module_subjcards_text_b">
                                        {"Teacher: " + subjdata.teacher_fname +  " " + subjdata.teacher_lname}
                                    </span>
                                </div>
                        </div>
                    ))}
                </div>
            </>

    }
    else {
        <div>{"INVALID USER!"}</div>
    }
    

  return (
    <>
        <div className="assessment_module_main_wrap">
            <div className="assessment_module_topwrap">
                <div className="assessment_module_topwrap_text">
                    ASSESSMENT
                </div>
                <div className="assessment_module_search_wrap">
                    <img src={search_icon} alt="search" className="assessment_module_search_icon"/>
                    <input 
                        type="text" 
                        className="assessment_module_search_input"
                        placeholder="Search Class and Section"
                    />
                </div>
            </div>

            {subject_cards}
        </div>
    </>
  )
}

export default AssessmentModule