const AnalyticsDetails = () => {

    return (
        <>
            <div className="dashboard_L1_Upcoming_label">
                <span>ANALYTICS</span>
                {/* <span className="view_calendar_L1" id="view_calendar_L1" >View Analytics &#10095;</span> */}
                <span className="view_calendar_L1" id="view_calendar_L1" ></span>
            </div>

            <div className="dashboard_L1_Analytics_side_wrap">
                <div className="dashboard_L1_Analytics_small">
                    <div className="dashboard_L1_Analytics_label">Accounts Created</div>

                    <div className="dashboard_L1_Analytics_inside_wrap">
                        <div className="dashboard_L1_Analytics_title">
                            Today: <span className="dashboard_L1_Analytics_data blue">30</span>
                        </div>

                        <div className="dashboard_L1_Analytics_title">
                            Average: <span className="dashboard_L1_Analytics_data yellow">25 <span className="green"> +5</span> </span>
                        </div>

                        <div className="dashboard_L1_Analytics_title">
                            Total No. of Accounts: <span className="dashboard_L1_Analytics_data red">1652</span>
                        </div>                       
                    </div>
                </div>

                <div className="dashboard_L1_Analytics_small">
                    <div className="dashboard_L1_Analytics_label">SMS Notification Sents</div>

                    <div className="dashboard_L1_Analytics_inside_wrap">
                        <div className="dashboard_L1_Analytics_title">
                            Today:
                            <div className="dashboard_L1_Analytics_bar sms-today">
                                12
                            </div>
                        </div>

                        <div className="dashboard_L1_Analytics_title">
                            Average:
                            <div className="dashboard_L1_Analytics_bar sms-average">
                                23
                            </div>
                        </div>                     
                    </div>
                </div>
            </div>

            <div className="dashboard_L1_Analytics_big">
                <div className="dashboard_L1_Analytics_label">Teachers' Attendance</div>

                <div className="dashboard_L1_Analytics_inside_wrap-b">
                    <div className="accounts_pie_wrap">
                        <div className="pie animate no-round" style={{"--p": "96.6", "--c": "#3DB5F9", "--b": "10px"}}>
                            <div className="pie_number_wrap">
                                <span>96.6%</span>
                                <span className="pie_number">145/150</span>
                            </div>
                        </div>
                        <span className="pie_label">Today</span>
                    </div>

                    <div className="accounts_pie_wrap_outside-b">
                        <div className="accounts_pie_wrap">
                            <div className="pie animate no-round" style={{"--p": "98.6", "--c": "#84DF3C", "--b": "10px"}}>
                                <div className="pie_number_wrap">
                                    <span>98.6%</span>
                                    <span className="pie_number">148/150</span>
                                </div>
                            </div>
                            <span className="pie_label">Monthly Average</span>
                        </div> 

                        <div className="accounts_pie_wrap">
                            <div className="pie animate no-round" style={{"--p": "98", "--c": "#F14668", "--b": "10px"}}>
                                <div className="pie_number_wrap">
                                    <span>98%</span>
                                    <span className="pie_number">147/150</span>
                                </div>
                            </div>
                            <span className="pie_label">Yearly Average</span>
                        </div> 
                    </div>                   
                </div>
            </div> 

            <div className="dashboard_L1_Analytics_big">
                <div className="dashboard_L1_Analytics_label">Students' Attendance</div>

                <div className="dashboard_L1_Analytics_inside_wrap-b">
                    <div className="accounts_pie_wrap">
                        <div className="pie animate no-round" style={{"--p": "89.8", "--c": "#3DB5F9", "--b": "10px"}}>
                            <div className="pie_number_wrap">
                                <span>89.8%</span>
                                <span className="pie_number">1347/1500</span>
                            </div>
                        </div>
                        <span className="pie_label">Today</span>
                    </div>

                    <div className="accounts_pie_wrap_outside-b">
                        <div className="accounts_pie_wrap">
                            <div className="pie animate no-round" style={{"--p": "92.9", "--c": "#84DF3C", "--b": "10px"}}>
                                <div className="pie_number_wrap">
                                    <span>92.9%</span>
                                    <span className="pie_number">1394/1500</span>
                                </div>
                            </div>
                            <span className="pie_label">Monthly Average</span>
                        </div> 

                        <div className="accounts_pie_wrap">
                            <div className="pie animate no-round" style={{"--p": "93.5", "--c": "#F14668", "--b": "10px"}}>
                                <div className="pie_number_wrap">
                                    <span>93.5%</span>
                                    <span className="pie_number">1402/1500</span>
                                </div>
                            </div>
                            <span className="pie_label">Yearly Average</span>
                        </div> 
                    </div>                   
                </div>
            </div>             
        </>
    )
}

export default AnalyticsDetails