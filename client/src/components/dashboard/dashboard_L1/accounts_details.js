const AccountDetails = () => {

    return (
        <>
            <div className="dashboard_L1_Upcoming_label">
                <span>ACCOUNTS</span>
                {/* <span className="view_calendar_L1" id="view_calendar_L1" >View Accounts &#10095;</span> */}
                <span className="view_calendar_L1" id="view_calendar_L1" ></span>
            </div>

            <div className="accounts_pie_wrap_outside">
                <div className="accounts_pie_wrap">
                    <div className="pie animate no-round" style={{"--p": "80", "--c": "#3DB5F9", "--b": "10px"}}>
                        <div className="pie_number_wrap">
                            <span>80%</span>
                            <span className="pie_number">1320/1652</span>
                        </div>
                    </div>
                    <span className="pie_label">Active Accounts</span>
                </div>
                <div className="accounts_pie_wrap">
                    <div className="pie animate no-round" style={{"--p": "20", "--c": "#F14668", "--b": "10px"}}>
                        <div className="pie_number_wrap">
                            <span>20%</span>
                            <span className="pie_number">330/1652</span>
                        </div>
                    </div>
                    <span className="pie_label">Inactive Accounts</span>
                </div>
            </div>

            <div className="accounts_pie_wrap_outside">
                <div className="accounts_pie_wrap">
                    <div className="pie animate no-round" style={{"--p": "9.1", "--c": "#FFD056", "--b": "10px"}}>
                        <div className="pie_number_wrap">
                            <span>9.1%</span>
                            <span className="pie_number">150/1650</span>
                        </div>
                    </div>
                    <span className="pie_label">Number of Teachers</span>
                </div>

                <div className="accounts_pie_wrap">
                    <div className="pie animate no-round" style={{"--p": "90.9", "--c": "#84DF3C", "--b": "10px"}}>
                        <div className="pie_number_wrap">
                            <span>90.9%</span>
                            <span className="pie_number">1500/1650</span>
                        </div>
                    </div>
                    <span className="pie_label">Number of Students</span>
                </div>
            </div>               
        </>
    )
}

export default AccountDetails