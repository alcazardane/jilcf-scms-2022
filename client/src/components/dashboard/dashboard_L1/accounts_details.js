import { useState, useEffect } from "react";
const AccountDetails = () => {

    const [noOfAcc, setNoOfAcc] = useState([]);
    useEffect(() => {
        const fetchClassData = async () => {
        const response = await fetch("http://localhost:5000/api/user/number/accounts");
        const data = await response.json();
        setNoOfAcc(data);
        };
        fetchClassData();
    }, []);

    let total_percentage;
    const getTotalPercentage = (first, second) => {
        total_percentage = (first / second) * 100;
        total_percentage = total_percentage.toFixed(2);
        return total_percentage;
    }
    let teach_percentage;
    const getTeachPercentage = (first, second) => {
        teach_percentage = (first / second) * 100;
        teach_percentage = teach_percentage.toFixed(2);
        return teach_percentage;
    }
    let stud_percentage;
    const getStudPercentage = (first, second) => {
        stud_percentage = (first / second) * 100;
        stud_percentage = stud_percentage.toFixed(2);
        return stud_percentage;
    }

    return (
        <>
                    <div className="dashboard_L1_Upcoming_label">
                        <span>ACCOUNTS</span>
                        {/* <span className="view_calendar_L1" id="view_calendar_L1" >View Accounts &#10095;</span> */}
                        <span className="view_calendar_L1" id="view_calendar_L1" ></span>
                    </div>

                    <div className="accounts_pie_wrap_outside">
                        <div className="accounts_pie_wrap">
                            {/* <div className="pie animate no-round" style={{"--p": `${parseInt(total_percentage)}`, "--c": "#3DB5F9", "--b": "10px"}}> */}
                            <div className="pie animate no-round" style={{"--p": "100", "--c": "#3DB5F9", "--b": "10px"}}>
                                <div className="pie_number_wrap">
                                    <span>{getTotalPercentage(noOfAcc.total_accounts, noOfAcc.total_accounts)}</span>
                                    <span className="pie_number">{noOfAcc.total_accounts + "/" + noOfAcc.total_accounts}</span>
                                </div>
                            </div>
                            <span className="pie_label">Active Accounts</span>
                        </div>
                        <div className="accounts_pie_wrap">
                            <div className="pie animate no-round" style={{"--p": "0", "--c": "#F14668", "--b": "10px"}}>
                                <div className="pie_number_wrap">
                                    <span>0%</span>
                                    <span className="pie_number">{"0" + "/" + noOfAcc.total_accounts}</span>
                                </div>
                            </div>
                            <span className="pie_label">Inactive Accounts</span>
                        </div>
                    </div>

                    <div className="accounts_pie_wrap_outside">
                        <div className="accounts_pie_wrap">
                            {/* <div className="pie animate no-round" style={{"--p": `${parseInt(teach_percentage)}`, "--c": "#FFD056", "--b": "10px"}}> */}
                            <div className="pie animate no-round" style={{"--p": "5.88", "--c": "#FFD056", "--b": "10px"}}>
                                <div className="pie_number_wrap">
                                    <span>{getTeachPercentage(noOfAcc.teacher_accounts, noOfAcc.total_accounts)}</span>
                                    <span className="pie_number">{noOfAcc.teacher_accounts + "/" + noOfAcc.total_accounts}</span>
                                </div>
                            </div>
                            <span className="pie_label">Number of Teachers</span>
                        </div>

                        <div className="accounts_pie_wrap">
                            {/* <div className="pie animate no-round" style={{"--p": `${parseInt(stud_percentage)}`, "--c": "#84DF3C", "--b": "10px"}}> */}
                            <div className="pie animate no-round" style={{"--p": "91.18", "--c": "#84DF3C", "--b": "10px"}}>
                                <div className="pie_number_wrap">
                                    <span>{getStudPercentage(noOfAcc.students_accounts, noOfAcc.total_accounts)}</span>
                                    <span className="pie_number">{noOfAcc.students_accounts + "/" + noOfAcc.total_accounts}</span>
                                </div>
                            </div>
                            <span className="pie_label">Number of Students</span>
                        </div>
                    </div>          
        </>
    )
}

export default AccountDetails